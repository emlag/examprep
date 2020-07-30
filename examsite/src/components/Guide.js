import React, {Component} from "react";
import ReactDOM from "react-dom";
import * as cnst from "./Const";
import * as firebase from "firebase";
import {Global} from "./styles";
import Tree from "./Tree";
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

    queryTopic = (subtopic) => {
        //rename input
        const db = firebase.firestore();

        //https://stackoverflow.com/questions/48479717/how-do-i-render-firestore-data-in-react
        const questionRef = db.collection(cnst.DATABASE_BRANCH);

        // const query = questionRef.where("subtopics", "array-contains", e);
        const query = questionRef.where("subtopics", "array-contains", subtopic);

        query.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                {
                    let data = doc.data();
                    if (doc.exists) {
                        let data = doc.data();

                        console.log("questions with subtopic " + subtopic);
                        console.log("Document data:", data.id);
                        console.log("Document data:", data);
                    } else {
                        this.setState({data: null});
                        console.log("No such document!");
                    }
                }
            });
            // .catch(error => {
            //   //TODO: doesn't work
            //   this.setState({ data: null });
            //   console.log("Error getting document:", error);
            // });
        });
    };

    subTopics = (subheader, descDict) => {
        const subTopicContents = descDict[subheader];
        const subTopicKeys = Object.keys(subTopicContents);

        const subtopicsTrees = subTopicKeys.map((subTopicKey, idx) => {
            const subtopicTitle = subTopicKey + " " + subTopicContents[subTopicKey]
            return (
                <Tree name={subtopicTitle} key={idx}>
                    <div style={{position: 'relative', width: '100%', height: 200, padding: 10}}>
                        {/*<div style={{width: '100%', height: '100%', background: 'black', borderRadius: 5}}/>*/}
                        <Button variant="outlined" color="primary" onClick={() => {
                            this.queryTopic(subTopicKey)
                        }}>
                            Query Questions
                        </Button>
                    </div>
                </Tree>
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
                <Tree name={cnst.TOPICS[topic] + " (HL)"} style={{color: '#2980b9'}}>
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
