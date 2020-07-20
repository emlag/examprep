import React, {Component} from 'react';
import {CustomInput, Form, FormGroup, FormText, Label, Input, Button, Alert, Col, Row} from 'reactstrap';
import {getCookie} from "./Utils";
import * as cnst from "./Const"
import * as firebase from "firebase";

/**
 * Uses a form to post information about a new event bring created.
 */
class createQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSuccess: false,
            successPIN: '',
            onFail: false,
            errToShow: '',
            name: '',
            date: '',
            time: '',
            teams: '',
            judges: '',
            criteria: '',
            subtopics:[],
            paperType: 1,
            year: 2020,
            session: 'May',
            topic: 1,
            subtopicQuestionPair: {},
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
            name: '',
            date: '',
            time: '',
            teams: '',
            paperType: 1,
            year: 2020,
            session: 'May',
            topic: 1,
            subtopicQuestionPair: {},
            questionImages: [],
            answerImages: []
        })
    }

    /**
     * Posts information to the server about the event being created.
     *
     * @param e the component whose state this method will change
     * @public
     */
        // submitEvent = (e) => {
        //     e.preventDefault();
        //     console.log("submit clicked");
        //     console.log(this.state.teams.split('\n'));
        //
        //     const token = getCookie('csrftoken');
        //
        //     //send call to API
        //     fetch('/create', {
        //         method: 'POST',
        //         headers: {
        //             'X-CSRFToken': token
        //         },
        //         body: JSON.stringify({
        //             event_name: this.state.name,
        //             date_time: this.state.date + " " + this.state.time,
        //             teams: this.state.teams,
        //             judges: this.state.judges,
        //             criteria: this.state.criteria
        //         })
        //     }).then(response => {
        //         if (!response.ok) {
        //             return response.json().then(errorText => {
        //                 throw new Error(errorText["error"])
        //             });
        //         }
        //         return response.json()
        //     })
        //         .then(result => { //if things went well
        //             const pin = result["pin"];
        //             this.setState({
        //                 onSuccess: true,
        //                 successPIN: pin
        //             })
        //         })
        //         .catch(err => { //otherwise show error alert
        //             console.log(err);
        //             this.setState({
        //                 onFail: true,
        //                 errToShow: err.message
        //             })
        //         })
        // }

    addField = (subtopic) => {
        this.setState((prevState) => ({
            subtopics: [...prevState.subtopics, subtopic]
            })
        )
    }

    createSubtopics = () => {
        return (
            this.state.subtopics.map((val, idx) => {
                 return (
                        <Col md={4}>
                            <FormGroup>
                                <Label for="sessionSelect">Subtopic</Label>
                                <Input type="select" name="select" id="sessionSelect" value={this.state.session}>
                                    <option>1.1.1</option>
                                    <option>1.1.2</option>
                                    <option>1.1.3</option>
                                    <option>1.1.4</option>
                                    <option>1.1.5</option>
                                    <option>1.1.6</option>
                                    <option>1.1.7</option>
                                </Input>
                            </FormGroup>
                        </Col>
                 )
            })
        )
    }

    uploadData = () => {
        const db = firebase.firestore();
        console.log("uploadData()");
        console.log("paperType: " + this.state.paperType);
        console.log("year: " + this.state.year);
        console.log("session: " + this.state.session);
        console.log("topic: " + this.state.topic);
        //https://stackoverflow.com/a/46748716
        
        const newQuestionRef = db.collection("questions").doc();
        const key = newQuestionRef.id;
        newQuestionRef.set({
            paperType: this.state.paperType,
            year: this.state.year,
            session: this.state.session,
            topic: this.state.topic
        });
        return key;
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
                //https://stackoverflow.com/a/43396448
                var imgUrl = "questionImgUrl" + index;
                storage.ref(imageRefName).getDownloadURL().then(url => {
                    console.log("got download URL");
                    firebase
                    .firestore()
                    .collection(`questions`).doc(key)
                    .update({
                        [imgUrl]: url
                    })
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
                //https://stackoverflow.com/a/43396448
                var imgUrl = "answerImgUrl" + index;
                storage.ref(imageRefName).getDownloadURL().then(url => {
                    console.log("got download URL");
                    firebase
                    .firestore()
                    .collection(`questions`).doc(key)
                    .update({
                        [imgUrl]: url
                    })
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
                                    this.state.paperType = event.target.value;
                                }}>
                                    <option value="1" >Paper 1</option>
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
                                <Label for="topicSelect">Topic</Label>
                                <Input type="select" name="select" id="topicSelect" onChange={(event)=> {
                                    this.setState({
                                        topic: event.target.value
                                      })
                                }}>
                                    <option>1: System Fundamentals</option>
                                    <option>2: Computer Organization</option>
                                    <option>3: Networks</option>
                                    <option>4: Computational Thinking</option>
                                    <option>5: Abstract Data Structures</option>
                                    <option>6: Resource Management</option>
                                    <option>7: Control</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Subtopics Metadata</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    {this.createSubtopics()}
                    <Button color="primary" onClick={() => this.addField(cnst.SCENARIO)}>Add Subtopic</Button>
                    <Button color="danger" onClick={() => this.addField(cnst.SCENARIO)}>Remove Subtopic</Button>
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
                                                questionImages: [...this.state.questionImages, ...event.target.files]
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
                                                answerImages: [...this.state.answerImages, ...event.target.files]
                                            })
                                        }
                                     }
                        />
                    </FormGroup>
                    <Button color="primary" type="submit">Save Question</Button>
                </Form>
                
            </div>
        );
    }
}

export default createQuestion;