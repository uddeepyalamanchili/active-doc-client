/**
 * Created by saharmehrpour on 9/5/17.
 */

import Utilities from "./utilities";
import {nsResolver} from "./coreConstants";
import {fileFolderConstraints, processFileFolder, queryType, relatives, ruleProperties} from "./ruleExecutorConstants";

/**
 * verify the rules for all xml files
 * @param xmlFiles {{filePath, xml}[]}
 * @param ruleTable {{index:number, title:string, description:string, tags:[], grammar:string, 
 * checkForFilesFolders:[string], checkForFilesFoldersConstraints:"INCLUDE"|"EXCLUDE"|"NONE", processFilesFolders:"WITHIN", 
 * quantifierXPathQuery:[], constraintXPathQuery:[], quantifierQueryType:string, constraintQueryType:string, 
 * rulePanelState:{editMode:boolean, title:string, description:string, ruleTags:[], folderConstraint:string, filesFolders:[], 
 * constraintXPath:string, quantifierXPath:string, autoCompleteArray:[], 
 * graphicalEditorState:{guiTree:{},  guiElements:{},  ruleType:string}}, 
 * xPathQueryResult:[{
 * data:{quantifierResult:[{filePath:string,  snippet:string,  xml:{fileName:string,  xml:string}}], 
 * satisfied:number, satisfiedResult:[], violated:number, violatedResult:[]}, 
 * filePath:string
 * }]}[]
 * |{index, checkForFilesFoldersConstraints, checkForFilesFolders, processFilesFolders:"WITHIN", quantifierXPathQuery, constraintXPathQuery}[]
 * }
 * retrieved from ruleJson.txt
 */
export const checkRulesForAll = (xmlFiles, ruleTable) => {
    for (let i = 0; i < ruleTable.length; i++) {
        if(!isValidXPathQueries(ruleTable[i])) {
            ruleTable[i].xPathQueryResult = [];
            ruleTable[i].description += " <XPATH query is not valid. Check out the XPATH in ruleJson.txt>";
        }
        else
            ruleTable[i] = runRulesByTypes(xmlFiles, ruleTable[i]);
    }
    return ruleTable;
};

/**
 * re-run the xpath queries and detect changes for one file.
 * @param xmlFiles {{filePath, xml}[]}
 * @param ruleTable {{index:number, title:string, description:string, tags:[], grammar:string, 
 * checkForFilesFolders:[string], checkForFilesFoldersConstraints:"INCLUDE"|"EXCLUDE"|"NONE", processFilesFolders:"WITHIN", 
 * quantifierXPathQuery:[], constraintXPathQuery:[], quantifierQueryType:string, constraintQueryType:string, 
 * rulePanelState:{editMode:boolean, title:string, description:string, ruleTags:[], folderConstraint:string, filesFolders:[], 
 * constraintXPath:string, quantifierXPath:string, autoCompleteArray:[], 
 * graphicalEditorState:{guiTree:{},  guiElements:{},  ruleType:string}}, 
 * xPathQueryResult:[{
 * data:{quantifierResult:[{filePath:string,  snippet:string,  xml:{fileName:string,  xml:string}}], 
 * satisfied:number, satisfiedResult:[], violated:number, violatedResult:[]}, 
 * filePath:string
 * }]}[]}
 * @param filePath
 */
export const checkRulesForFile = (xmlFiles, ruleTable, filePath) => {
    let targetXml = xmlFiles.filter((d) => {
        return d.filePath === filePath
    });
    for (let i = 0; i < ruleTable.length; i++) {
        if (ruleTable[i].xPathQueryResult.filter((d) => {
                return d.filePath === filePath || d.filePath === processFileFolder.mixed;
            }).length === 0)
            continue;

        let ruleResultI = ruleTable[i].xPathQueryResult.filter((d) => {
            return d.filePath === filePath || d.filePath === processFileFolder.mixed;
        })[0].data;

        let prevQuantifierResult = ruleResultI.quantifierResult.slice(0);
        let prevSatisfiedResult = ruleResultI.satisfiedResult.slice(0);
        let prevSatisfied = ruleResultI.satisfied;
        let prevViolated = ruleResultI.violated;

        ruleTable[i] = runRulesByTypes(ruleTable[i].xPathQueryResult[0].filePath === processFileFolder.mixed
            ? xmlFiles : targetXml, ruleTable[i]);

        ruleResultI = ruleTable[i].xPathQueryResult.filter((d) => {
            return d.filePath === filePath || d.filePath === processFileFolder.mixed;
        })[0].data;

        ruleResultI.changed = (!Utilities.ResultArraysEqual(prevQuantifierResult, ruleResultI.quantifierResult) ||
            !Utilities.ResultArraysEqual(prevSatisfiedResult, ruleResultI.satisfiedResult) ||
            prevSatisfied !== ruleResultI.satisfied ||
            prevViolated !== ruleResultI.violated);

        ruleResultI.violatedChanged = (prevViolated < ruleResultI.violated ? relatives.greater :
            prevViolated > ruleResultI.violated ? relatives.smaller : relatives.none);
        ruleResultI.satisfiedChanged = (prevSatisfied < ruleResultI.satisfied ? relatives.greater :
            prevSatisfied > ruleResultI.satisfied ? relatives.smaller : relatives.none);
        ruleResultI.allChanged = ((prevSatisfied + prevViolated) < (ruleResultI.violated + ruleResultI.satisfied) ? 
            relatives.greater :
            (prevSatisfied + prevViolated) > (ruleResultI.violated + ruleResultI.satisfied) ? 
                relatives.smaller : relatives.none);
    }
    return ruleTable;
};


/**
 * find relevant xml files based on the rule "checkFor" property
 * and call respective methods based on "processFilesFolders" property of the rule.
 * @param xmlFiles {{filePath, xml}[]}
 * @param ruleI {{index:number, title:string, description:string, tags:[], grammar:string, 
 * checkForFilesFolders:[string], checkForFilesFoldersConstraints:"INCLUDE"|"EXCLUDE"|"NONE", processFilesFolders:"WITHIN", 
 * quantifierXPathQuery:[], constraintXPathQuery:[], quantifierQueryType:string, constraintQueryType:string, 
 * rulePanelState:{editMode:boolean, title:string, description:string, ruleTags:[], folderConstraint:string, filesFolders:[], 
 * constraintXPath:string, quantifierXPath:string, autoCompleteArray:[], 
 * graphicalEditorState:{guiTree:{},  guiElements:{},  ruleType:string}}, 
 * xPathQueryResult:[{
 * data:{quantifierResult:[{filePath:string,  snippet:string,  xml:{fileName:string,  xml:string}}], 
 * satisfied:number, satisfiedResult:[], violated:number, violatedResult:[]}, 
 * filePath:string
 * }]}}
 * @returns {{index:number, title:string, description:string, tags:[], grammar:string, 
 * checkForFilesFolders:[string], checkForFilesFoldersConstraints:"INCLUDE"|"EXCLUDE"|"NONE", processFilesFolders:"WITHIN", 
 * quantifierXPathQuery:[], constraintXPathQuery:[], quantifierQueryType:string, constraintQueryType:string, 
 * rulePanelState:{editMode:boolean, title:string, description:string, ruleTags:[], folderConstraint:string, filesFolders:[], 
 * constraintXPath:string, quantifierXPath:string, autoCompleteArray:[], 
 * graphicalEditorState:{guiTree:{},  guiElements:{},  ruleType:string}}, 
 * xPathQueryResult:[{
 * data:{quantifierResult:[{filePath:string,  snippet:string,  xml:{fileName:string,  xml:string}}], 
 * satisfied:number, satisfiedResult:[], violated:number, violatedResult:[]}, 
 * filePath:string
 * }]}}
 */
export const runRulesByTypes = (xmlFiles, ruleI) => {

    let xmlFilesToVerify = [];
    let checkForFilesFolders = ruleI.checkForFilesFolders.slice(0); // deep copy

    switch (ruleI.checkForFilesFoldersConstraints) {
        case fileFolderConstraints.none:
            xmlFilesToVerify = xmlFiles.slice(0); // deep copy
            break;

        case fileFolderConstraints.include:
            for (let j = 0; j < checkForFilesFolders.length; j++)
                // Warning
                // This can lead to error if the target folder is X 
                // in ruleJson.txt and there exists also a folder Xy
                xmlFilesToVerify = xmlFilesToVerify
                    .concat(xmlFiles.filter((d) => 
                        d.filePath.indexOf(checkForFilesFolders[j]) !== -1));
            break;

        case fileFolderConstraints.exclude:
            xmlFilesToVerify = xmlFilesToVerify.filter((d) => {
                for (let j = 0; j < checkForFilesFolders.length; j++)
                    // Warning
                    // This can lead to error if fileName is saved as X.java 
                    // in ruleJson.txt and there exists also aX.java
                    if (d.filePath.endsWith(checkForFilesFolders[j]))
                        return false;
                return true;
            });
            break;

        default:
            console.log("error in XML: ruleTable[index=" + ruleI.index + "]['constraint']");
            return ruleI;
    }

    if (ruleI.processFilesFolders === processFileFolder.within) {
        for (let j = 0; j < xmlFilesToVerify.length; j++)
            ruleI = runXPathQueryWithin(xmlFilesToVerify[j], ruleI);
    }
    else if (ruleI.processFilesFolders === processFileFolder.between) {
        ruleI = runXpathQueryBetween(xmlFilesToVerify, ruleI);
    }
    else if (ruleI.processFilesFolders === processFileFolder.mixed) {
        ruleI = runXpathQueryMixed(xmlFilesToVerify, ruleI);
    }
    // if the file and folders are not valid, this property is not created
    if (!ruleI.xPathQueryResult) ruleI.xPathQueryResult = [];
    return ruleI;
};

/**
 * run xPath queries for rules that hold for each file independently
 * @param xmlFile {{filePath, xml}}
 * @param ruleI {{index:number, title:string, description:string, tags:[], grammar:string, 
 * checkForFilesFolders:[string], checkForFilesFoldersConstraints:"INCLUDE"|"EXCLUDE"|"NONE", processFilesFolders:"WITHIN", 
 * quantifierXPathQuery:[], constraintXPathQuery:[], quantifierQueryType:string, constraintQueryType:string, 
 * rulePanelState:{editMode:boolean, title:string, description:string, ruleTags:[], folderConstraint:string, filesFolders:[], 
 * constraintXPath:string, quantifierXPath:string, autoCompleteArray:[], 
 * graphicalEditorState:{guiTree:{},  guiElements:{},  ruleType:string}}, 
 * xPathQueryResult:[{
 * data:{quantifierResult:[{filePath:string,  snippet:string,  xml:{fileName:string,  xml:string}}], 
 * satisfied:number, satisfiedResult:[], violated:number, violatedResult:[]}, 
 * filePath:string
 * }]}}
 * @returns  {{index:number, title:string, description:string, tags:[], grammar:string, 
 * checkForFilesFolders:[string], checkForFilesFoldersConstraints:"INCLUDE"|"EXCLUDE"|"NONE", processFilesFolders:"WITHIN", 
 * quantifierXPathQuery:[], constraintXPathQuery:[], quantifierQueryType:string, constraintQueryType:string, 
 * rulePanelState:{editMode:boolean, title:string, description:string, ruleTags:[], folderConstraint:string, filesFolders:[], 
 * constraintXPath:string, quantifierXPath:string, autoCompleteArray:[], 
 * graphicalEditorState:{guiTree:{},  guiElements:{},  ruleType:string}}, 
 * xPathQueryResult:[{
 * data:{quantifierResult:[{filePath:string,  snippet:string,  xml:{fileName:string,  xml:string}}], 
 * satisfied:number, satisfiedResult:[], violated:number, violatedResult:[]}, 
 * filePath:string
 * }]}}
 */
const runXPathQueryWithin = (xmlFile, ruleI) => {
    let quantifierResult = runXPathQuery(xmlFile, ruleI.quantifierXPathQuery[0]);
    let satisfiedResult = runXPathQuery(xmlFile, ruleI.constraintXPathQuery[0]);
    // compare results
    let violatedResult = violatedResults(quantifierResult, satisfiedResult);
    let resultData = {
        quantifierResult: quantifierResult,
        satisfiedResult: satisfiedResult,
        violatedResult: violatedResult,
        satisfied: quantifierResult.length - violatedResult.length,
        violated: violatedResult.length
    };
    if (!ruleI.hasOwnProperty(ruleProperties.xPathQueryResult))
        ruleI.xPathQueryResult = [];
    let resultArray = ruleI.xPathQueryResult.filter((d) => {
        return d.filePath === xmlFile.filePath
    });
    if (resultArray.length === 0)
        ruleI.xPathQueryResult.push({filePath: xmlFile.filePath, data: resultData});
    else {
        if (ruleI.xPathQueryResult.filter((d) => {
                return d.filePath === xmlFile.filePath
            }).length > 0)
            ruleI.xPathQueryResult.filter((d) => {
                return d.filePath === xmlFile.filePath
            })[0].data = resultData;
    }
    return ruleI;
};

/**
 * << NOT tested yet >>
 * run xPath queries for rules that depends on several files
 * @param xmlFiles {{filePath, xml}[]}
 * @param ruleI {{index:number, title:string, description:string, tags:[], grammar:string, 
 * checkForFilesFolders:[string], checkForFilesFoldersConstraints:"INCLUDE"|"EXCLUDE"|"NONE", processFilesFolders:"WITHIN", 
 * quantifierXPathQuery:[], constraintXPathQuery:[], quantifierQueryType:string, constraintQueryType:string, 
 * rulePanelState:{editMode:boolean, title:string, description:string, ruleTags:[], folderConstraint:string, filesFolders:[], 
 * constraintXPath:string, quantifierXPath:string, autoCompleteArray:[], 
 * graphicalEditorState:{guiTree:{},  guiElements:{},  ruleType:string}}, 
 * xPathQueryResult:[{
 * data:{quantifierResult:[{filePath:string,  snippet:string,  xml:{fileName:string,  xml:string}}], 
 * satisfied:number, satisfiedResult:[], violated:number, violatedResult:[]}, 
 * filePath:string
 * }]}}
 * @returns  {{index:number, title:string, description:string, tags:[], grammar:string, 
 * checkForFilesFolders:[string], checkForFilesFoldersConstraints:"INCLUDE"|"EXCLUDE"|"NONE", processFilesFolders:"WITHIN", 
 * quantifierXPathQuery:[], constraintXPathQuery:[], quantifierQueryType:string, constraintQueryType:string, 
 * rulePanelState:{editMode:boolean, title:string, description:string, ruleTags:[], folderConstraint:string, filesFolders:[], 
 * constraintXPath:string, quantifierXPath:string, autoCompleteArray:[], 
 * graphicalEditorState:{guiTree:{},  guiElements:{},  ruleType:string}}, 
 * xPathQueryResult:[{
 * data:{quantifierResult:[{filePath:string,  snippet:string,  xml:{fileName:string,  xml:string}}], 
 * satisfied:number, satisfiedResult:[], violated:number, violatedResult:[]}, 
 * filePath:string
 * }]}}
 */
const runXpathQueryBetween = (xmlFiles, ruleI) => {
    let quantifierResult = [];
    let constraintResult = [];
    for (let j = 0; j < xmlFiles.length; j++) {
        quantifierResult = quantifierResult.concat(runXPathQuery(xmlFiles[j], ruleI.quantifierXPathQuery[0]));
        constraintResult = constraintResult.concat(runXPathQuery(xmlFiles[j], ruleI.constraintXPathQuery[0]));
    }
    // compare results
    let violatedResult = violatedResults(quantifierResult, constraintResult);
    let resultData = {
        quantifierResult: quantifierResult,
        satisfiedResult: constraintResult,
        violatedResult: violatedResult,
        satisfied: quantifierResult.length - violatedResult.length,
        violated: violatedResult.length
    };
    if (!ruleI.hasOwnProperty(ruleProperties.xPathQueryResult))
        ruleI.xPathQueryResult = [];
    ruleI.xPathQueryResult = [{filePath: processFileFolder.between, data: resultData}];
    return ruleI;
};


/**
 * run Xpath query when a group has multiple XPath queries
 * @param xmlFiles {{filePath, xml}[]}
 * @param ruleI {{index:number, title:string, description:string, tags:[], grammar:string, 
 * checkForFilesFolders:[string], checkForFilesFoldersConstraints:"INCLUDE"|"EXCLUDE"|"NONE", processFilesFolders:"WITHIN", 
 * quantifierXPathQuery:[], constraintXPathQuery:[], quantifierQueryType:string, constraintQueryType:string, 
 * rulePanelState:{editMode:boolean, title:string, description:string, ruleTags:[], folderConstraint:string, filesFolders:[], 
 * constraintXPath:string, quantifierXPath:string, autoCompleteArray:[], 
 * graphicalEditorState:{guiTree:{},  guiElements:{},  ruleType:string}}, 
 * xPathQueryResult:[{
 * data:{quantifierResult:[{filePath:string,  snippet:string,  xml:{fileName:string,  xml:string}}], 
 * satisfied:number, satisfiedResult:[], violated:number, violatedResult:[]}, 
 * filePath:string
 * }]}}
 * @returns  {{index:number, title:string, description:string, tags:[], grammar:string, 
 * checkForFilesFolders:[string], checkForFilesFoldersConstraints:"INCLUDE"|"EXCLUDE"|"NONE", processFilesFolders:"WITHIN", 
 * quantifierXPathQuery:[], constraintXPathQuery:[], quantifierQueryType:string, constraintQueryType:string, 
 * rulePanelState:{editMode:boolean, title:string, description:string, ruleTags:[], folderConstraint:string, filesFolders:[], 
 * constraintXPath:string, quantifierXPath:string, autoCompleteArray:[], 
 * graphicalEditorState:{guiTree:{},  guiElements:{},  ruleType:string}}, 
 * xPathQueryResult:[{
 * data:{quantifierResult:[{filePath:string,  snippet:string,  xml:{fileName:string,  xml:string}}], 
 * satisfied:number, satisfiedResult:[], violated:number, violatedResult:[]}, 
 * filePath:string
 * }]}}
 */
const runXpathQueryMixed = (xmlFiles, ruleI) => {

    let quantifierResult = [];
    let constraintResult = [];

    if (ruleI.hasOwnProperty(ruleProperties.quantifierQueryType) && ruleI.quantifierQueryType === queryType.next_file)
        quantifierResult = findFromText(xmlFiles, ruleI.quantifierXPathQuery);
    else if (ruleI.hasOwnProperty(ruleProperties.quantifierQueryType) && ruleI.quantifierQueryType === queryType.first_file)
        quantifierResult = findAndReturnToBase(xmlFiles, ruleI.quantifierXPathQuery);
    else
        for (let j = 0; j < xmlFiles.length; j++)
            quantifierResult = quantifierResult.concat(runXPathQuery(xmlFiles[j], ruleI.quantifierXPathQuery[0]));

    if (ruleI.hasOwnProperty(ruleProperties.constraintQueryType) && ruleI.constraintQueryType === queryType.next_file)
        constraintResult = findFromText(xmlFiles, ruleI.constraintXPathQuery);
    else if (ruleI.hasOwnProperty(ruleProperties.constraintQueryType) && ruleI.constraintQueryType === queryType.first_file)
        constraintResult = findAndReturnToBase(xmlFiles, ruleI.constraintXPathQuery);
    else
        for (let j = 0; j < xmlFiles.length; j++)
            constraintResult = constraintResult.concat(runXPathQuery(xmlFiles[j], ruleI.constraintXPathQuery[0]));


    // compare results
    let violatedResult = containResults(constraintResult, quantifierResult);
    let resultData = {
        quantifierResult: quantifierResult,
        satisfiedResult: constraintResult,
        violatedResult: violatedResult,
        satisfied: quantifierResult.length - violatedResult.length,
        violated: violatedResult.length
    };

    if (!ruleI.hasOwnProperty(ruleProperties.xPathQueryResult))
        ruleI.xPathQueryResult = [];
    ruleI.xPathQueryResult = [{filePath: processFileFolder.mixed, data: resultData}];
    return ruleI;

};


/**
 * When a group consists of two XPath queries, the first query
 * @param xmlFiles {{filePath, xml}[]}
 * @param xpathQueries
 * @returns {Array}
 */
const findFromText = (xmlFiles, xpathQueries) => {
    let result1 = [], result2 = [];
    let xpathQuery = xpathQueries[0];
    for (let j = 0; j < xmlFiles.length; j++) {
        result1 = result1.concat(runXPathQuery(xmlFiles[j], xpathQuery));
    }
    for (let i = 0; i < result1.length; i++) {
        xpathQuery = xpathQueries[1].replace("<TEMP>", result1[i].snippet);
        for (let j = 0; j < xmlFiles.length; j++) {
            result2 = result2.concat(runXPathQuery(xmlFiles[j], xpathQuery));
        }
    }
    return result2;
};



/**
 * When a group consists of 3 queries, the first and last queries are executed on the same file
 * @param xmlFiles {{filePath, xml}[]}
 * @param xpathQueries
 * @returns {Array}
 */
const findAndReturnToBase = (xmlFiles, xpathQueries) => {
    let result1, result2, result3 = [];
    for (let base = 0; base < xmlFiles.length; base++) {
        let xpathQuery = xpathQueries[0];
        result1 = runXPathQuery(xmlFiles[base], xpathQuery);
        for (let i = 0; i < result1.length; i++) {
            for (let j = 0; j < xmlFiles.length; j++) {
                xpathQuery = xpathQueries[1].replace(new RegExp("<TEMP>", "g"), result1[i].snippet);
                result2 = runXPathQuery(xmlFiles[j], xpathQuery);

                for (let k = 0; k < result2.length; k++) {
                    xpathQuery = xpathQueries[2].replace("<TEMP>", result2[k].snippet);
                    result3 = result3.concat(runXPathQuery(xmlFiles[base], xpathQuery));
                }
            }
        }
    }
    return result3;
};


/**
 * runs the XPath query and compare results
 * @param xmlFile {{filePath, xml}}
 * @param xpathQuery {string}
 */
const runXPathQuery = (xmlFile, xpathQuery) => {
    let parser = new DOMParser();
    let result = [];
    // checks validity of the XML
    let xml = parser.parseFromString(xmlFile.xml, "text/xml");
    if (!xml.evaluate) {
        console.log("error in xml.evaluate");
        return;
    }

    // run xpath queries
    let foundNodes = xml.evaluate(xpathQuery, xml, nsResolver, XPathResult.ANY_TYPE, null);
    let node = foundNodes.iterateNext();
    let index = 0;
    while (node) {
        let xmlAndText = getXmlData(xml, xpathQuery, index);
        result.push({
            filePath: xmlFile.filePath,
            xml: xmlAndText.xmlJson,
            snippet: xmlAndText.snippet
        });
        node = foundNodes.iterateNext();
        index += 1;
    }
    return result;
};


/**
 * compare the quantifier and the result
 * @param quantifierResult
 * @param satisfiedResult
 */
const violatedResults = (quantifierResult, satisfiedResult) => {

    let mismatches = [];
    let sliceArr = satisfiedResult.slice(0);
    for (let i = 0; i < quantifierResult.length; i++) {
        let found = false;
        for (let j = 0; j < sliceArr.length; j++) {
            if (quantifierResult[i].snippet === sliceArr[j].snippet) {
                sliceArr.splice(j, 1);
                found = true;
                break;
            }
        }
        if (!found) {
            mismatches.push(quantifierResult[i]);
        }
    }
    return mismatches;
};


/**
 * check if all elements of a sample array exists in the container array
 * repetition is allowed
 * @param containerResult
 * @param sampleResult
 * @returns {Array}
 */
const containResults = (containerResult, sampleResult) => {
    let mismatches = [];

    for (let i = 0; i < sampleResult.length; i++) {
        let found = false;
        for (let j = 0; j < containerResult.length; j++) {
            if (sampleResult[i].snippet === containerResult[j].snippet) {
                found = true;
                break;
            }
        }
        if (!found) {
            mismatches.push(sampleResult[i]);
        }
    }
    return mismatches;
};


/**
 * remove the following nodes.The resulting xml is sent to the server to be processed by srcML
 * and find the line number.
 * @param mainXml
 * @param query
 * @param index
 */
const getXmlData = (mainXml, query, index) => {

    // passing the nodes and working with that changes the main XML
    // and produces error for next nodes in the same query.

    let xml = Utilities.cloneXML(mainXml);

    let nodes = xml.evaluate(query, xml, nsResolver, XPathResult.ANY_TYPE, null);
    let res = nodes.iterateNext();
    let i = 0;
    while (i < index) {
        res = nodes.iterateNext();
        i += 1;
    }

    // get the first two line
    let resTextArray = new XMLSerializer().serializeToString(res).split(/\r?\n/);
    let resText = resTextArray.length > 1 ? resTextArray[0] + "\n" + resTextArray[1] : resTextArray[0];


    /**
     * remove first node sib, sib, parent sib, grandparent sib, grand-grandparent sib, ... <- recursive
     * @param node
     * @returns {*}
     */
    function removeSib(node) {
        if (node.nodeName === "unit")
            return node;
        let sib = node.nextSibling;
        while (sib && sib.nodeType !== -1) {
            node.parentNode.removeChild(sib);
            sib = node.nextSibling;
        }
        return removeSib(node.parentNode);
    }


    let par = res, nameIndex, fileName = "";
    if (res.children) {
        for (nameIndex = 0; nameIndex < res.children.length; nameIndex++)
            if (res.children[nameIndex].tagName.toString() === "name") {
                break;
            }

        // remove the extra children
        if (res.firstChild && res.firstChild.nodeType !== -1 && nameIndex !== -1 && nameIndex !== res.children.length)
            par = removeSib(res.children[nameIndex]);

        // if there is no extra children, remove sibling
        else if (res.nextSibling)
            par = removeSib(res.nextSibling);
        else {
            par = res;
            // until we reach a sibling or the main ancestor, go up in the tree
            while (!par.nextSibling && par.nodeName !== "unit") {
                par = par.parentNode;
            }
            par = removeSib(res.parentNode);
        }
        fileName = par.getAttribute("filename");
    }

    let temp = new XMLSerializer().serializeToString(par);
    return {
        xmlJson: {
            fileName: fileName,
            xml: temp
        },
        xmlText: new XMLSerializer().serializeToString(par),
        snippet: resText
    };

};


/**
 * validate the xpath queries in ruleI
 * @param ruleI
 * @return {boolean}
 */
const isValidXPathQueries = (ruleI) => {
    let parser = new DOMParser();
    let xml = parser.parseFromString("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n" +
        "<unit xmlns=\"http://www.srcML.org/srcML/src\" revision=\"0.9.5\" language=\"Java\" filename=\"validate.java\"/>",
        "text/xml");

    try {
        for (let i=0; i< ruleI.quantifierXPathQuery.length; i++)
            xml.evaluate(ruleI.quantifierXPathQuery[i], xml, nsResolver, XPathResult.ANY_TYPE, null);

        for (let i=0; i< ruleI.constraintXPathQuery.length; i++)
            xml.evaluate(ruleI.constraintXPathQuery[i], xml, nsResolver, XPathResult.ANY_TYPE, null);

    } catch (XPathException) {
        return false;
    }
    return true;
};