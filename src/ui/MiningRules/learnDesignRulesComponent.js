/**
 * Created by saharmehrpour on 11/1/17.
 */

import React, {Component} from "react";
import "../../App.css";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import "rc-slider/assets/index.css";

import {updateFeatureMetaData, updateGroupingMetaData} from "../../actions";
import Utilities from "../../core/utilities";
import {reduxStoreMessages} from "../../reduxStoreConstants";
import MinedRulePad from "./minedRulePad";
import {createGroupingMetaData, formGroupings} from "../../miningRulesCore/preProcessing";
import {createFeatureMetaDataMap} from "../../miningRulesCore/extractFeatures";
import {
    generateFeatures, prepareMapsToSend, combineFeatureSetToRulePadCompressed
} from "../../miningRulesCore/processing";
import {focusElementType, groupTitle} from "../../miningRulesCore/featureConfig";
import MinedDesignRules from "./minedDesignRules";

class LearnDesignRulesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            featureRulePad: [],
            minedRules: [],
            loadingStatus: false, // for loading icons when mining rules
            loadingTitle: "Mining Design Rules",
        };
    }

    render() {
        return (
            <div className={"learningDesignRulesComponent overlayContainer"}>
                <div className={"mainDiv-overlay"}>
                {this.renderDefaultView()}
                <div className={"minedRulesComponent"}>
                    {this.renderFocusedElementInfo()}
                    {this.renderFeatureRulePad()}
                    <MinedDesignRules minedRules={this.state.minedRules} featureMetaData={this.props.featureMetaData}/>
                </div>
                </div>
                {this.renderLoading()}
            </div>
        )
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        switch (nextProps.message) {
            case reduxStoreMessages.update_rule_table_msg:
                this.preProcessGroupings();
                break;

            case reduxStoreMessages.request_mine_rules_for_element_msg:
                this.setState({
                    minedRules: [],
                    loadingStatus: true,
                }, () => {
                    this.processFeaturesForSelectedScope();
                })
                break;

            case reduxStoreMessages.update_mined_rules_msg:
                this.setState({
                    minedRules: nextProps.minedRules,
                    loadingStatus: false,
                })
                break;

            case reduxStoreMessages.update_feature_metadata_msg:
                this.setState({
                    featureMetaData: nextProps.featureMetaData
                });
                break;

            case reduxStoreMessages.save_feature_selection_msg:
                this.setState({
                    customFeatures: nextProps.customFeatures
                });
                break;

            default:
                break;

        }
    }

    /**
     * render the initial views
     * @return {null|*}
     */
    renderDefaultView() {
        if (this.state.minedRules.length > 0 || this.state.featureRulePad.length > 0)
            return (
                <div>
                    {this.renderLoading()}
                </div>
            );
        return (
            <div>
                <h3>Pick an element in the IDE, and select <strong>Mine Rules</strong> from the context menu.</h3>
            </div>
        )
    }


    /**
     * render loading gif
     * @return {null}
     */
    renderLoading() {
        return this.state.loadingStatus ? (
            <div className={"overlayLoading loadingMinedRulesContainer"}>
                <div className={"loadingMinedRules"}><h3>{this.state.loadingTitle}</h3></div>
                <div>
                    <div className="spinner"/>
                </div>
            </div>
        ) : null;
    }

    renderFocusedElementInfo() {
        let filePath = "";
        let identifier = "";
        let nodeTitle = "";
        if (this.props.focusedElementData.mapFocusedElementToFeaturesKey !== "") {
            let mapFilter = focusElementType
                .filter(d => d.mapFocusedElementToFeaturesKey ===
                    this.props.focusedElementData.mapFocusedElementToFeaturesKey);
            if (mapFilter.length === 1)
                nodeTitle = mapFilter[0].title;
            filePath = this.props.focusedElementData.filePath;
            identifier = this.props.focusedElementData.identifier;
            return (
                <div style={{marginBottom: "60px"}}>
                    <h4><strong>Focused Element </strong>{nodeTitle} with identifier <code>{identifier}</code></h4>
                    <h4>{filePath}</h4>
                </div>
            )
        }
    }

    renderFeatureRulePad() {

        if (this.state.minedRules.length > 0 || this.state.featureRulePad.length === 0) return null;

        let mapped = this.state.featureRulePad.map((objEntries, i) => {
            let key = objEntries[0];
            /**
             * @type {{
             * elementFeatures: {element: string, featureIds: number[]}[],
             * rule: {grammarCompressed: string, rulePadStateCompressed: {guiElements, guiTree}}
             * }}
             */
            let groupObject = objEntries[1];

            return (
                <div key={i}>
                    <h4>{groupTitle[key] ? groupTitle[key] : key}</h4>
                    <div className={"generateRuleGui guiBoundingBox minedRuleBoundingBox"}>
                        <MinedRulePad key={new Date()} rulePadState={groupObject.rule.rulePadStateCompressed}/>
                    </div>
                </div>
            )
        });

        return (
            <div>
                <div>{mapped}</div>
                <div>
                    <Button onClick={() => this.sendFeaturesForMiningRules()}>Approve</Button>
                </div>
            </div>
        )
    }


    /**
     * Find the groupings
     * Since the method is called after reduxStoreMessages.project_path_msg
     * the projectPath is not updated in the props yet.
     */
    preProcessGroupings() {
        let groupingMetaData = new createGroupingMetaData();
        formGroupings(this.props.xmlFiles, this.props.projectPath, groupingMetaData);
        this.props.onUpdateGroupingMetaData(groupingMetaData);
    }

    /**
     * For a selected element (scope), extract features from relevant file (from initial groupings)
     * populate the feature map and send the info to the server for mining process.
     */
    processFeaturesForSelectedScope() {
        let featureMetaData = createFeatureMetaDataMap();
        generateFeatures(this.props.xmlFiles, this.props.projectPath, this.props.focusedElementData,
            this.props.doiInformation, this.props.groupingMetaData, featureMetaData);
        Promise
            .all([combineFeatureSetToRulePadCompressed(featureMetaData)]) // combineFeatureSetToRulePad(featureMetaData)
            .then(() => {
                this.setState({
                    featureRulePad: Object.entries(featureMetaData.featureGroups.spec)
                        .concat(Object.entries(featureMetaData.featureGroups.usage)),
                    loadingStatus: false,
                });
                this.props.onUpdateFeatureMetaData(featureMetaData);
            });

    }

    /**
     * after the user selected the features, the feature weights get updated and are sent to server
     */
    processSelectedFeaturesRulePad() {

    }

    /**
     * selected features are sent to the server for mining rules
     */
    sendFeaturesForMiningRules() {
        let messages = prepareMapsToSend(this.props.featureMetaData)
        for (let message of messages) {
            Utilities.sendToServer(this.props.ws, message.command, message.data);
        }
        this.setState({loadingStatus: true});
    }

}

function mapStateToProps(state) {
    return {
        message: state.message,
        ws: state.ws,
        xmlFiles: state.xmlFiles,
        featureMetaData: state.minedRulesState.featureMetaData,
        groupingMetaData: state.minedRulesState.groupingMetaData,
        focusedElementData: state.minedRulesState.focusedElementData,
        doiInformation: state.minedRulesState.doiInformation,
        minedRules: state.minedRulesState.minedRules,
        projectPath: state.projectPath,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onUpdateFeatureMetaData: (featureMetaData) => dispatch(updateFeatureMetaData(featureMetaData)),
        onUpdateGroupingMetaData: (groupingMetaData) => dispatch(updateGroupingMetaData(groupingMetaData)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LearnDesignRulesComponent);