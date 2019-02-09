export const initial_guiElements = {
    "0": {conditionName: "class_el", activeElement: false, selectedElement: false},
    "0.0.0": {conditionName: "annotation", activeElement: false, selectedElement: false},
    "0.1.0": {conditionName: "memory", activeElement: false, selectedElement: false},
    "0.2.0": {conditionName: "visibility", activeElement: false, selectedElement: false},
    "0.4.0": {conditionName: "class_name", activeElement: false, selectedElement: false},
    "0.5.0": {conditionName: "class_implements", activeElement: false, selectedElement: false},
    "0.6.0": {conditionName: "class_extends", activeElement: false, selectedElement: false},
    "0.7.0": {conditionName: "declaration_statement_el", activeElement: false, selectedElement: false},
    "0.7.0.0.0": {conditionName: "annotation", activeElement: false, selectedElement: false},
    "0.7.0.1.0": {conditionName: "memory", activeElement: false, selectedElement: false},
    "0.7.0.2.0": {conditionName: "visibility", activeElement: false, selectedElement: false},
    "0.7.0.3.0": {conditionName: "declaration_statement_name", activeElement: false, selectedElement: false},
    "0.7.0.4.0": {conditionName: "declaration_statement_initialization", activeElement: false, selectedElement: false},
    "0.7.1": {conditionName: "constructor_el", activeElement: false, selectedElement: false},
    "0.7.1.0.0": {conditionName: "annotation", activeElement: false, selectedElement: false},
    "0.7.1.2.0": {conditionName: "visibility", activeElement: false, selectedElement: false},
    "0.7.1.5.0": {conditionName: "parameter_el", activeElement: false, selectedElement: false},
    "0.7.1.5.0.1.0": {conditionName: "parameter_type", activeElement: false, selectedElement: false},
    "0.7.1.5.0.4.0": {conditionName: "parameter_name", activeElement: false, selectedElement: false},
    "0.7.1.7.0": {conditionName: "constructor_expression_statement", activeElement: false, selectedElement: false},
    "0.7.1.7.1": {conditionName: "declaration_statement_el", activeElement: false, selectedElement: false},
    "0.7.1.7.1.0.0": {conditionName: "annotation", activeElement: false, selectedElement: false},
    "0.7.1.7.1.1.0": {conditionName: "memory", activeElement: false, selectedElement: false},
    "0.7.1.7.1.2.0": {conditionName: "visibility", activeElement: false, selectedElement: false},
    "0.7.1.7.1.3.0": {conditionName: "declaration_statement_name", activeElement: false, selectedElement: false},
    "0.7.1.7.1.4.0": {
        conditionName: "declaration_statement_initialization",
        activeElement: false,
        selectedElement: false
    },
    "0.7.2": {conditionName: "function_el", activeElement: false, selectedElement: false},
    "0.7.2.0.0": {conditionName: "annotation", activeElement: false, selectedElement: false},
    "0.7.2.1.0": {conditionName: "memory", activeElement: false, selectedElement: false},
    "0.7.2.2.0": {conditionName: "visibility", activeElement: false, selectedElement: false},
    "0.7.2.3.0": {conditionName: "function_return_type", activeElement: false, selectedElement: false},
    "0.7.2.4.0": {conditionName: "function_name", activeElement: false, selectedElement: false},
    "0.7.2.5.0": {conditionName: "parameter_el", activeElement: false, selectedElement: false},
    "0.7.2.5.0.1.0": {conditionName: "parameter_type", activeElement: false, selectedElement: false},
    "0.7.2.5.0.4.0": {conditionName: "parameter_name", activeElement: false, selectedElement: false},
    "0.7.2.7.0": {conditionName: "declaration_statement_el", activeElement: false, selectedElement: false},
    "0.7.2.7.0.0.0": {conditionName: "annotation", activeElement: false, selectedElement: false},
    "0.7.2.7.0.1.0": {conditionName: "memory", activeElement: false, selectedElement: false},
    "0.7.2.7.0.2.0": {conditionName: "visibility", activeElement: false, selectedElement: false},
    "0.7.2.7.0.3.0": {conditionName: "declaration_statement_name", activeElement: false, selectedElement: false},
    "0.7.2.7.0.4.0": {
        conditionName: "declaration_statement_initialization",
        activeElement: false,
        selectedElement: false
    },
    "0.7.2.7.1": {conditionName: "function_expression_statement", activeElement: false, selectedElement: false},
    "0.7.2.7.2": {conditionName: "function_return_value", activeElement: false, selectedElement: false},
    "0.7.3": {conditionName: "abstract_function_el", activeElement: false, selectedElement: false},
    "0.7.3.0.0": {conditionName: "annotation", activeElement: false, selectedElement: false},
    "0.7.3.1.0": {conditionName: "memory", activeElement: false, selectedElement: false},
    "0.7.3.2.0": {conditionName: "visibility", activeElement: false, selectedElement: false},
    "0.7.3.3.0": {conditionName: "abstract_function_return_type", activeElement: false, selectedElement: false},
    "0.7.3.4.0": {conditionName: "abstract_function_name", activeElement: false, selectedElement: false},
    "0.7.3.5.0": {conditionName: "parameter_el", activeElement: false, selectedElement: false},
    "0.7.3.5.0.1.0": {conditionName: "parameter_type", activeElement: false, selectedElement: false},
    "0.7.3.5.0.4.0": {conditionName: "parameter_name", activeElement: false, selectedElement: false},
};

export const initial_elementTree = {
    selectedElementID: "",
    "0": {
        parentId: "",
        children: {
            top: ["0.0.0"],
            before_1: ["0.1.0"],
            before_2: ["0.2.0"],
            before_3: [],
            after_1: ["0.4.0"],
            after_2: ["0.5.0"],
            after_3: ["0.6.0"],
            body: [["0.7.0"], ["0.7.1"], ["0.7.2"], ["0.7.3"],]
        }
    },
    "0.0.0": {parentId: "0", children: {}},
    "0.1.0": {parentId: "0", children: {}},
    "0.2.0": {parentId: "0", children: {}},
    "0.4.0": {parentId: "0", children: {}},
    "0.5.0": {parentId: "0", children: {}},
    "0.6.0": {parentId: "0", children: {}},
    "0.7.0": {
        parentId: "0",
        children: {
            top: ["0.7.0.0.0"],
            before_1: ["0.7.0.1.0"],
            before_2: ["0.7.0.2.0"],
            before_3: ["0.7.0.3.0"],
            after_1: ["0.7.0.4.0"],
            after_2: [],
            after_3: [],
            body: []
        }
    },
    "0.7.0.0.0": {parentId: "0.7.0", children: {}},
    "0.7.0.1.0": {parentId: "0.7.0", children: {}},
    "0.7.0.2.0": {parentId: "0.7.0", children: {}},
    "0.7.0.3.0": {parentId: "0.7.0", children: {}},
    "0.7.0.4.0": {parentId: "0.7.0", children: {}},
    "0.7.1": {
        parentId: "0",
        children: {
            top: ["0.7.1.0.0"],
            before_1: [],
            before_2: ["0.7.1.2.0"],
            before_3: [],
            after_1: [],
            after_2: ["0.7.1.5.0"],
            after_3: [],
            body: [["0.7.1.7.0"], ["0.7.1.7.1"],]
        }
    },
    "0.7.1.0.0": {parentId: "0.7.1", children: {}},
    "0.7.1.2.0": {parentId: "0.7.1", children: {}},
    "0.7.1.5.0": {
        parentId: "0.7.1",
        children: {
            top: [],
            before_1: ["0.7.1.5.0.1.0"],
            before_2: [],
            before_3: [],
            after_1: ["0.7.1.5.0.4.0"],
            after_2: [],
            after_3: [],
            body: []
        }
    },
    "0.7.1.5.0.1.0": {parentId: "0.7.1.5.0", children: {}},
    "0.7.1.5.0.4.0": {parentId: "0.7.1.5.0", children: {}},
    "0.7.1.7.0": {parentId: "0.7.1", children: {}},
    "0.7.1.7.1": {
        parentId: "0.7.1",
        children: {
            top: ["0.7.1.7.1.0.0"],
            before_1: ["0.7.1.7.1.1.0"],
            before_2: ["0.7.1.7.1.2.0"],
            before_3: ["0.7.1.7.1.3.0"],
            after_1: ["0.7.1.7.1.4.0"],
            after_2: [],
            after_3: [],
            body: []
        }
    },
    "0.7.1.7.1.0.0": {parentId: "0.7.1.7.1", children: {}},
    "0.7.1.7.1.1.0": {parentId: "0.7.1.7.1", children: {}},
    "0.7.1.7.1.2.0": {parentId: "0.7.1.7.1", children: {}},
    "0.7.1.7.1.3.0": {parentId: "0.7.1.7.1", children: {}},
    "0.7.1.7.1.4.0": {parentId: "0.7.1.7.1", children: {}},
    "0.7.2": {
        parentId: "0",
        children: {
            top: ["0.7.2.0.0"],
            before_1: ["0.7.2.1.0"],
            before_2: ["0.7.2.2.0"],
            before_3: ["0.7.2.3.0"],
            after_1: ["0.7.2.4.0"],
            after_2: ["0.7.2.5.0"],
            after_3: [],
            body: [["0.7.2.7.0"], ["0.7.2.7.1"], ["0.7.2.7.2"],]
        }
    },
    "0.7.2.0.0": {parentId: "0.7.2", children: {}},
    "0.7.2.1.0": {parentId: "0.7.2", children: {}},
    "0.7.2.2.0": {parentId: "0.7.2", children: {}},
    "0.7.2.3.0": {parentId: "0.7.2", children: {}},
    "0.7.2.4.0": {parentId: "0.7.2", children: {}},
    "0.7.2.5.0": {
        parentId: "0.7.2",
        children: {
            top: [],
            before_1: ["0.7.2.5.0.1.0"],
            before_2: [],
            before_3: [],
            after_1: ["0.7.2.5.0.4.0"],
            after_2: [],
            after_3: [],
            body: []
        }
    },
    "0.7.2.5.0.1.0": {parentId: "0.7.2.5.0", children: {}},
    "0.7.2.5.0.4.0": {parentId: "0.7.2.5.0", children: {}},
    "0.7.2.7.0": {
        parentId: "0.7.2",
        children: {
            top: ["0.7.2.7.0.0.0"],
            before_1: ["0.7.2.7.0.1.0"],
            before_2: ["0.7.2.7.0.2.0"],
            before_3: ["0.7.2.7.0.3.0"],
            after_1: ["0.7.2.7.0.4.0"],
            after_2: [],
            after_3: [],
            body: []
        }
    },
    "0.7.2.7.0.0.0": {parentId: "0.7.2.7.0", children: {}},
    "0.7.2.7.0.1.0": {parentId: "0.7.2.7.0", children: {}},
    "0.7.2.7.0.2.0": {parentId: "0.7.2.7.0", children: {}},
    "0.7.2.7.0.3.0": {parentId: "0.7.2.7.0", children: {}},
    "0.7.2.7.0.4.0": {parentId: "0.7.2.7.0", children: {}},
    "0.7.2.7.1": {parentId: "0.7.2", children: {}},
    "0.7.2.7.2": {parentId: "0.7.2", children: {}},
    "0.7.3": {
        parentId: "0",
        children: {
            top: ["0.7.3.0.0"],
            before_1: ["0.7.3.1.0"],
            before_2: ["0.7.3.2.0"],
            before_3: ["0.7.3.3.0"],
            after_1: ["0.7.3.4.0"],
            after_2: ["0.7.3.5.0"],
            after_3: [],
            body: []
        }
    },
    "0.7.3.0.0": {parentId: "0.7.3", children: {}},
    "0.7.3.1.0": {parentId: "0.7.3", children: {}},
    "0.7.3.2.0": {parentId: "0.7.3", children: {}},
    "0.7.3.3.0": {parentId: "0.7.3", children: {}},
    "0.7.3.4.0": {parentId: "0.7.3", children: {}},
    "0.7.3.5.0": {
        parentId: "0.7.3",
        children: {
            top: [],
            before_1: ["0.7.3.5.0.1.0"],
            before_2: [],
            before_3: [],
            after_1: ["0.7.3.5.0.4.0"],
            after_2: [],
            after_3: [],
            body: []
        }
    },
    "0.7.3.5.0.1.0": {parentId: "0.7.3.5.0", children: {}},
    "0.7.3.5.0.4.0": {parentId: "0.7.3.5.0", children: {}},
};

export const initial_state = {
    ws: null,

    /*
    index: 1545798262
    title: ""
    description: ""
    tags: []
    grammar: ""
    ruleType: {constraint: "NONE", checkFor: [], type: "WITHIN"}
    quantifier: {detail: "", command: ""}
    constraint: {detail: "", command: ""}
    rulePanelState: {
        editMode: false
        title: ""
        description: ""
        ruleTags: []
        folderConstraint: ""
        filesFolders: []
        constraintXPath: ""
        quantifierXPath: ""
        autoCompleteText: ""
        activeTab: 0
        guiState: {activeTab: "quantifier", quantifier: {…}, constraint: {…}, ruleType: ""}
    }
    xPathQueryResult: []
     */
    ruleTable: [],
    tagTable: [],
    xml: [],
    hash: ["index"],
    ignoreFile: false,
    message: "init",
    filePath: "",
    hashManager: {
        history: ["#/index"],
        clicked: false,
        activeHash: 0,
        forwardDisable: "disabled",
        backDisable: "disabled"
    },
    // used for new rule form
    newOrEditRule: {
        isEditMode: false,
        title: "",
        description: "",
        ruleTags: [],
        folderConstraint: "",
        filesFolders: [],

        autoCompleteText: "",
        quantifierXPath: "", // only produced by autoComplete grammar
        constraintXPath: "", // only produced by autoComplete grammar
        sentMessages: [],
        receivedMessages: [],

        guiState: {
            activeTab: "quantifier",
            quantifier: {tree: {...initial_elementTree}, guiElements: {...initial_guiElements}},
            constraint: {tree: {...initial_elementTree}, guiElements: {...initial_guiElements}},
            ruleType: "" // "Must" or "MustBeEqualTo"
        }
    },
};

// used for editing existing rule
export const default_rulePanelState = {
    editMode: false, // default must be false unless a new rule is being generated: !!props["newRule"]

    title: "",
    description: "",
    ruleTags: [],
    folderConstraint: "",
    filesFolders: [],

    autoCompleteText: "",
    quantifierXPath: "", // only produced by autoComplete grammar
    constraintXPath: "", // only produced by autoComplete grammar

    guiState: {
        activeTab: "quantifier",
        quantifier: {tree: {...initial_elementTree}, guiElements: {...initial_guiElements}},
        constraint: {tree: {...initial_elementTree}, guiElements: {...initial_guiElements}},
        ruleType: "" // "Must" or "MustBeEqualTo"
    }
};

export const initial_guiState = {
    activeTab: "quantifier",
    quantifier: {tree: {...initial_elementTree}, guiElements: {...initial_guiElements}},
    constraint: {tree: {...initial_elementTree}, guiElements: {...initial_guiElements}},
    ruleType: "" // "Must" or "MustBeEqualTo"
};