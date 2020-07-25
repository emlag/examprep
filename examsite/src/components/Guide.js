import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as cnst from "./Const";
import * as firebase from "firebase";
import { Global } from "./styles";
import Tree from "./Tree";

class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicQuestions: [], //change to dictionary?
      data: null
    };

    this.queryTopic = this.queryTopic.bind(this);
  }

  queryTopic = e => {
    const db = firebase.firestore();

    //https://stackoverflow.com/questions/48479717/how-do-i-render-firestore-data-in-react
    const questionRef = db.collection(cnst.DATABASE_BRANCH);

    const query = questionRef.where("subtopics", "array-contains", e);

    query.get().then(querySnapshot => {
      querySnapshot
        .forEach(doc => {
          {
            let data = doc.data();
            if (doc.exists) {
              let data = doc.data();
              this.setState({ data: data });
              this.setState({ topicQuestions: data.id });
              console.log("Document data:", data.id);
              console.log("Document data:", data);
            } else {
              this.setState({ data: null });
              console.log("No such document!");
            }
          }
        })
        .catch(error => {
          //TODO: doesn't work
          this.setState({ data: null });
          console.log("Error getting document:", error);
        });
    });
  };

  componentDidMount() {
    this.queryTopic("1.1.1");
  }

  //pass in firestore question ID
  getQuestionName = e => {
    const questionRef = db.collection(cnst.DATABASE_BRANCH).doc(e);
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          let data = doc.data();
          this.setState({ data: data });
          var session = dict["session"];
          var level = dict["level"];
          var paper = dict["paperType"];
          var year = dict["year"];
          var name = session + year + level + paper;
        } else {
          // doc.data() will be undefined in this case
          this.setState({ data: null });
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        this.setState({ data: null });
        console.log("Error getting document:", error);
      });
  };

  render() {
    return (
      <>
        <Global />
        <Tree name="main" defaultOpen>
          <Tree name="Topic 1: System Fundamentals">
            <Tree name="1.1 Systems in Organizations">
              <Tree name="1.1.1 Planning and System Installation">
                <div
                  type="tree-div"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 200,
                    padding: 10,
                    background: "black",
                    borderRadius: 5
                  }}
                ></div>
              </Tree>
              <Tree name="1.1.2 User Focus" />
              <Tree name="1.1.3 System Backup" />
              <Tree name="1.1.4 Software Deployment" />
            </Tree>
            <Tree name="1.2 System design basics">
              <Tree name="Components of a computer system" />
              <Tree name="System design and analysis" />
              <Tree name="Human interaction with the system" />
            </Tree>
          </Tree>
          <Tree name="Topic 2: Computer organization">
            <Tree name="2.1 Computer organization">
              <Tree name="Computer architecture" />
              <Tree name="Secondary memory" />
              <Tree name="Operating systems and application systems" />
              <Tree name="Binary representation" />
              <Tree name="Simple logic gates" />
            </Tree>
          </Tree>
          <Tree name="Topic 3: Networks">
            <Tree name="3.1 Networks">
              <Tree name="Network fundamentals" />
              <Tree name="Data transmission" />
              <Tree name="Wireless networking" />
            </Tree>
          </Tree>
          <Tree
            name="Topic 4: Computational thinking, problem-solving and
programming"
          >
            <Tree name="4.1 General principles">
              <Tree name="Thinking procedurally" />
              <Tree name="Thinking logically" />
              <Tree name="Thinking ahead" />
              <Tree name="Thinking concurrently" />
              <Tree name="Thinking abstractly" />
            </Tree>
            <Tree name="4.2 Connecting computational thinking and program design" />
            <Tree name="4.3 introduction to programming">
              <Tree name="Nature of programming languages" />
              <Tree name="Use of programming languages" />
            </Tree>
          </Tree>
          <Tree name="Topic 5: Abstract data structures">
            <Tree name="5.1 Abstract data structures">
              <Tree name="Thinking recursively" />
              <Tree name="Abstract data structures" />
              <Tree name="Linked lists" />
              <Tree name="Trees" />
              <Tree name="Applications" />
            </Tree>
          </Tree>
          <Tree name="Topic 6: Resource management">
            <Tree name="6.1 Resource management">
              <Tree name="System resources" />
              <Tree name="Role of the operating system" />
            </Tree>
          </Tree>
          <Tree name="Topic 7: Control">
            <Tree name="7.1 Control">
              <Tree name="Centralized control systems" />
              <Tree name="Distributed systems" />
            </Tree>
          </Tree>
          <Tree name="Options">
            <Tree name="D: Object-oriented programming">
              <Tree name="D.1 Objects as a programming concept" />
              <Tree name="D.2 Features of OOP" />
              <Tree name="D.3 Program development" />
              <Tree name="D.4 Advanced program development (HL)" />
            </Tree>
          </Tree>
          {/* 
          <Tree name="subtree with children">
            <Tree name="hello" />
            <Tree name="sub-subtree with children">
              <Tree name="child 1" style={{ color: "#37ceff" }} />
              <Tree name="child 2" style={{ color: "#37ceff" }} />
              <Tree name="child 3" style={{ color: "#37ceff" }} />
              <Tree name="custom content">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 200,
                    padding: 10
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "black",
                      borderRadius: 5
                    }}
                  />
                </div>
              </Tree>
            </Tree>
            <Tree name="hello" />
          </Tree>
          <Tree name="world" />
          <Tree name={<span>🙀 something something</span>} /> */}
        </Tree>
      </>
    );
  }
}

export default Guide;
