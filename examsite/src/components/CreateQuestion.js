import React, {Component} from 'react';
import {CustomInput, Form, FormGroup, FormText, Label, Input, Button, Alert, Col, Row} from 'reactstrap';
import {getCookie} from "./Utils";
import * as cnst from "./Const"
import * as firebase from "firebase";
import {Question} from './Question';
import SubtopicDropdown from './SubtopicDropdown.js';

/**
 * Uses a form to post information about a new event bring created.
 */
class CreateQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subtopics: {},
            subtopicCount: 0,
            paperType: 1,
            year: 2020,
            session: 'May',
            level: 'HL',
            topic: '1',
            questionNum: 0,
            subtopicMetadata: '',
            questionImages: [],
            answerImages: []
        }
    }

    /**
     * Clears all form fields
     * @param e the component whose state this method will change
     * @public
     */
    clearInputFields = (e) => {
        e.preventDefault();
        this.setState({
            subtopics: {},
            subtopicCount: 0,
            paperType: 1,
            year: 2020,
            session: 'May',
            level: 'HL',
            topic: '1',
            questionNum: 0,
            subtopicMetadata: '',
            questionImages: [],
            answerImages: []
        })
    }
    
    addField = (subtopic) => {
        this.setState((prevState) => ({
            subtopics: [...prevState.subtopics, subtopic]
            })
        )
        console.log(this.state.subtopics);
    }

    increaseSubtopicCount = () => {
        this.setState((prevState) => ({
            subtopicCount: prevState.subtopicCount + 1,
            subtopics: {...this.state.subtopics, [this.state.subtopicCount]: cnst.TOPIC_1_SUB[0]} //TODO: TEMP VARIABLE
        }))

    }

    decreaseSubtopicCount = () => {
        console.log(this.state.subtopicCount - 1);
        const copySubtopics = {...this.state.subtopics}
        delete copySubtopics[this.state.subtopicCount - 1]
        this.setState((prevState) => ({
            subtopicCount: prevState.subtopicCount - 1,
            subtopics: copySubtopics
        }))
    }

    switchSelectedSubtopic = (id, newSubtopic) => {
        // console.log("create prevSelected: " + prevSelected);
        // if(!this.state.subtopics.includes(prevSelected))
        // {
        //     this.setState({
        //         subtopics: [...this.state.subtopics, newSubtopic]
        //     })
        // }
        console.log("switch newSubtopic: " + newSubtopic);
        this.setState({
            subtopics: {
                ...this.state.subtopics,
                [id]: newSubtopic
            }
         })    
    }

    createSubtopics = () => {
        console.log(this.state.subtopics);
        var display = [];
        var options = cnst.TOPIC_1_SUB;

        //https://flaviocopes.com/react-how-to-loop/
        for(var i = 0; i < this.state.subtopicCount; i++) {
            display.push(<SubtopicDropdown id={i} optionItems={options} switchSelectedSubtopic={this.switchSelectedSubtopic}/>)
        }
        return (
            <div>
                {display.map(item => {
                    return <div>{item}</div>
                })}
            </div>
            
        );
    }

    uploadData = () => {
        const db = firebase.firestore();
        console.log("uploadData()");
        console.log("paperType: " + this.state.paperType);
        console.log("year: " + this.state.year);
        console.log("session: " + this.state.session);
        console.log("topic: " + this.state.topic);

        //https://stackoverflow.com/a/46748716
        const newQuestionRef = db.collection(cnst.DATABASE_BRANCH).doc();
        const id = newQuestionRef.id;
        // const myelement = <Question id={key} paperType={this.state.paperType}
        // year={this.state.year} session={this.state.session} topic={this.state.topic} />;
        
        //parse the actual subtopics from the this.state.subtopics dictionary
        const subtopicsProcessed = [];
        for(var key in this.state.subtopics) {
            if(!subtopicsProcessed.includes(this.state.subtopics[key])) {
                subtopicsProcessed.push(this.state.subtopics[key]);
            }
        }

        const myelement = new Question({
            id:id, 
            paperType:this.state.paperType,
            year:this.state.year, 
            session:this.state.session, 
            level: this.state.level,
            questionNum:this.state.questionNum,
            topic:this.state.topic,
            subtopics: subtopicsProcessed,
            subtopicMetadata: this.state.subtopicMetadata,
            questionImageUrls: [],
            answerImageUrls: []
        })

        console.log("getData: " + myelement.getData());
        // newQuestionRef.set({
        //     paperType: this.state.paperType,
        //     year: this.state.year,
        //     session: this.state.session,
        //     topic: this.state.topic
        // });
        newQuestionRef.set(myelement.getData());
        return id;
    }

    uploadImages = (key) => {
        console.log("uploadImages(), questionImages: " + this.state.questionImages);
        console.log("uploadImages(), answerImages: " + this.state.answerImages);
        //https://stackoverflow.com/questions/61215555/how-to-upload-image-to-firebase-storage-and-upload-url-to-firestore-simultaneous
        const storage = firebase.storage();

        this.state.questionImages.forEach((image, index) => {
            const imageRefName = `questions/${Date.now()}`;
            const uploadTask = storage.ref(imageRefName).put(image);
            uploadTask.on('state_changed',
            () => {},
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                
                storage.ref(imageRefName).getDownloadURL().then(url => {
                    console.log("got download URL");
                    firebase
                    .firestore()
                    .collection(cnst.DATABASE_BRANCH).doc(key)
                    .update({
                        //https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
                        questionImageUrls: firebase.firestore.FieldValue.arrayUnion(url)
                    });
                })
            });
        })

        this.state.answerImages.forEach((image, index) => {
            const imageRefName = `answers/${Date.now()}`;
            const uploadTask = storage.ref(imageRefName).put(image);
            uploadTask.on('state_changed',
            () => {},
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                storage.ref(imageRefName).getDownloadURL().then(url => {
                    console.log("got download URL");
                    firebase
                    .firestore()
                    .collection(cnst.DATABASE_BRANCH).doc(key)
                    .update(
                    {
                        //https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
                        answerImageUrls: firebase.firestore.FieldValue.arrayUnion(url)
                    });
                    
                })
            });
        })
        
        
    }

    submitForm = e => {
        e.preventDefault();
        console.log("button pressed");

        const dataKey = this.uploadData();
        this.uploadImages(dataKey);
          //this.clearInputFields(e); TODO: SHOULD I CALL THIS OR NOT?  BECAUSE UI DISPLAY IS NOT CLEARED
    }

    render() {
        return (
            <div className="create-form-container">
                <Form onSubmit={(event)=>this.submitForm(event)}>
                    <Row form>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="paperTypeSelect">Paper Type</Label>
                                <Input type="select" name="select" id="paperTypeSelect" 
                                    onChange={(event)=> {
                                        this.setState({
                                            paperType: event.target.value
                                        })
                                    }}
                                >
                                    <option value="1">Paper 1</option>
                                    <option value="2">Paper 2</option>
                                    <option value="3">Paper 3</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <Label for="yearSelect">Year</Label>
                            <Input type="select" name="select" id="yearSelect" onChange={(event)=> {
                                    this.setState({
                                        year: event.target.value
                                      })
                                }}>
                                <option>2020</option>
                                <option>2019</option>
                                <option>2018</option>
                                <option>2017</option>
                                <option>2016</option>
                                <option>2015</option>
                                <option>2014</option>
                                <option>2013</option>
                                <option>2012</option>
                                <option>2011</option>
                                <option>2010</option>
                            </Input>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="sessionSelect">Session</Label>
                                <Input type="select" name="select" id="sessionSelect" onChange={(event)=> {
                                    this.setState({
                                        session: event.target.value
                                      })
                                }}>
                                    <option value="May">May</option>
                                    <option value="Nov">November</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="levelSelect">Level</Label>
                                <Input type="select" name="select" id="levelSelect" onChange={(event)=> {
                                    this.setState({
                                        level: event.target.value
                                      })
                                }}>
                                    <option>HL</option>
                                    <option>SL</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="topicSelect">Topic</Label>
                                <Input type="select" name="select" id="topicSelect" onChange={(event)=> {
                                    this.setState({
                                        topic: event.target.value
                                      })
                                }}>
                                    <option value="1">1: System Fundamentals</option>
                                    <option value="2">2: Computer Organization</option>
                                    <option value="3">3: Networks</option>
                                    <option value="4">4: Computational Thinking</option>
                                    <option value="5">5: Abstract Data Structures</option>
                                    <option value="6">6: Resource Management</option>
                                    <option value="7">7: Control</option>
                                    <option value="D">D: Object-Oriented Programming</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="questionNum">Question Number</Label>
                                <Input type="number" className="form-control" id="questionNumber"
                                onBlur={(event)=> {
                                    this.setState({
                                        questionNum: event.target.value
                                    })
                                }}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className="form-group">
                        <label htmlFor="subtopicMetadata">Subtopics Metadata</label>
                        <textarea className="form-control" id="subtopicMetadata" rows="3"
                        onBlur={(event)=> {
                            this.setState({
                                subtopicMetadata: event.target.value
                              })
                        }}>
                        </textarea>
                    </div>
                    {this.createSubtopics()}
                    <Button color="primary" onClick={() => this.increaseSubtopicCount()}>Add Subtopic</Button>
                    <Button color="danger" onClick={() => this.decreaseSubtopicCount()}>Remove Subtopic</Button>
                    <FormGroup>
                        <Label for="exampleCustomFileBrowser">Question Image</Label>
                        <CustomInput type="file"
                                    multiple
                                     id="exampleCustomFileBrowser"
                                     name="customFile"
                                     label="Pick image files for the question"
                                     onChange={
                                        (event)=> {
                                            this.setState({
                                                questionImages: [...event.target.files]
                                            })
                                        }
                                     }
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleCustomFileBrowser">Answer Image</Label>
                        <CustomInput type="file"
                                    multiple
                                    id="exampleCustomFileBrowser"
                                    name="customFile"
                                    label="Pick image files for the answers"
                                    onChange={
                                        (event)=> {
                                            this.setState({
                                                answerImages: [...event.target.files]
                                            })
                                        }
                                     }/>
                    </FormGroup>
                    <Button color="primary" type="submit">Save Question</Button>
                </Form>
                
            </div>
        );
    }
}

export default CreateQuestion;