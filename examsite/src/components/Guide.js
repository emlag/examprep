import React, {Component} from "react";
import ReactDOM from "react-dom";
import * as cnst from "./Const";
import * as firebase from "firebase";
import {Global} from "./styles";
import Tree from "./Tree";
import Leaf from "./Leaf";
import Button from "@material-ui/core/Button";

class Guide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topicQuestions: [], //change to dictionary?
            data: null
        };

        // this.queryTopic = this.queryTopic.bind(this);
        //
        // this.queryTopic("1.1.1");
    }



    subTopics = (subheader, descDict) => {
        const subTopicContents = descDict[subheader];
        const subTopicKeys = Object.keys(subTopicContents);

        const subtopicsTrees = subTopicKeys.map((subTopicKey, idx) => {
            const subtopicTitle = subTopicKey + " " + subTopicContents[subTopicKey]
            return (
                <Leaf name={subtopicTitle} subtopic={subTopicKey} key={idx}>
                    <div style={{position: 'relative', width: '100%', height: 200, padding: 10}}>
                        {/*<div style={{width: '100%', height: '100%', background: 'black', borderRadius: 5}}/>*/}
                        {/*<Button variant="outlined" color="primary" onClick={() => {*/}
                        {/*    this.queryTopic(subTopicKey)*/}
                        {/*}}>*/}
                        {/*    Query Questions*/}
                        {/*</Button>*/}
                    </div>
                </Leaf>
            )
        });

        return subtopicsTrees;
    }

    subHeaders = (header, descDict) => {
        const subheaders = Object.keys(descDict[header]);
        const subheaderTrees = subheaders.map((subheaderName, idx) => {

            return (
                <Tree name={subheaderName} key={idx}>
                    {this.subTopics(subheaderName, descDict[header])}
                </Tree>
            )
        });

        return subheaderTrees;
    }

    headers = (topic) => {
        const headers = Object.keys(cnst.TOPIC_DESCS[topic]);
        const headerTrees = headers.map((headerName, idx) => {

            return (
                <Tree name={headerName} key={idx}>
                    {this.subHeaders(headerName, cnst.TOPIC_DESCS[topic])}
                </Tree>
            )
        })

        return headerTrees;
    }


    buildTree = (topic) => {
        return (
            <div>
                <Tree name={cnst.TOPICS[topic]}>
                    {this.headers(topic)}
                </Tree>
            </div>
        )
    }

    buildHLTree = (topic) => {
        return (
            <div>
                <Tree name={cnst.TOPICS[topic] + " (HL)"} style={{color: '#d35400'}}>
                    {this.headers(topic)}
                </Tree>
            </div>
        )
    }

    render() {
        return (
            <>
                {this.buildTree("1")}
                {this.buildTree("2")}
                {this.buildTree("3")}
                {this.buildTree("4")}
                {this.buildHLTree("5")}
                {this.buildHLTree("6")}
                {this.buildHLTree("7")}
                {this.buildTree("D")}
            </>
        );
    }
}

export default Guide;
