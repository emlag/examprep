import React, {Component} from 'react';
import {CustomInput, Form, FormGroup, FormText, Label, Input, Button, Alert, Col, Row} from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import {getCookie} from "./Utils";
import * as cnst from "./Const"
import * as firebase from "firebase";
import {Question} from './Question';
import DynamicOptionDropdown from './DynamicOptionDropdown.js';

/**
 * Uses a form to post information about a new event bring created.
 */
class CreateQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paperType: 1,
            year: 2020,
            session: 'May',
            level: 'HL',
            topics: {},
            topicCount: 1,
            subtopics: {},
            subtopicCount: 0,
            questionNum: 0,
            pageStartNum: 0,
            subtopicMetadata: '',
            questionImages: [],
            answerImages: [],
            pdfFiles: [],
            parsing: false,
            markscheme: 'Yes'
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
            paperType: 1,
            year: 2020,
            session: 'May',
            level: 'HL',
            topics: {"0": "1"},
            topicCount: 1,
            subtopics: {},
            subtopicCount: 0,
            questionNum: 0,
            pageStartNum: 0,
            subtopicMetadata: '',
            questionImages: [],
            answerImages: [],
            pdfFiles: [],
            parsing: false,
            markscheme: 'Yes'
        })
    }
  
    temp = () => {
        var storage = firebase.storage();
        storage.ref('/parsed/May14HLP1/answers/0i.jpg').getDownloadURL().then(function(url) {

        var img = document.getElementById('myimg');
        img.src = url;
        });
    }

    increaseCount = (itemToChange) => {
        if(itemToChange === cnst.SUBTOPIC_KEY) {
            this.setState((prevState) => ({
                subtopicCount: prevState.subtopicCount + 1,
                // subtopics: {...this.state.subtopics, 
                //     [this.state.subtopicCount]: ""} //TODO: TEMP VARIABLE
            }))
        }
        else if(itemToChange === cnst.TOPIC_KEY) {
            this.setState((prevState) => ({
                topicCount: prevState.topicCount + 1,
                // topics: {...this.state.topics, 
                //     [this.state.topicCount]: ""} //TODO: TEMP VARIABLE
            }))
        }
        

    }

    decreaseCount = (itemToChange) => {
        if(itemToChange === cnst.SUBTOPIC_KEY) {
            const copySubtopics = {...this.state.subtopics}
            delete copySubtopics[this.state.subtopicCount - 1]
            this.setState((prevState) => ({
                subtopicCount: prevState.subtopicCount - 1,
                subtopics: copySubtopics
            }))
        }
        else if(itemToChange === cnst.TOPIC_KEY) {
            const copyTopics = {...this.state.topics}
            delete copyTopics[this.state.topicCount - 1]
            this.setState((prevState) => ({
                topicCount: prevState.topicCount - 1,
                topics: copyTopics
            }))
        }
        
    }

    switchSelected = (id, newItem, itemToChange) => {
        // console.log("create prevSelected: " + prevSelected);
        // if(!this.state.subtopics.includes(prevSelected))
        // {
        //     this.setState({
        //         subtopics: [...this.state.subtopics, newSubtopic]
        //     })
        // }
        if(itemToChange === cnst.SUBTOPIC_KEY) {
            this.setState({
                subtopics: {
                    ...this.state.subtopics,
                    [id]: newItem
                }
             })  
        }
        if(itemToChange === cnst.TOPIC_KEY) {
            this.setState({
                topics: {
                    ...this.state.topics,
                    [id]: newItem
                }
             })  
        }
    }

    createTopics = () => {
        var display = [];
        var options = [];
        for(var topic in cnst.TOPICS)
        {
            options.push(cnst.TOPICS[topic]);
        }

        //https://flaviocopes.com/react-how-to-loop/
        for(var i = 0; i < this.state.topicCount; i++) {
            display.push(<DynamicOptionDropdown id={i} itemToChange={cnst.TOPIC_KEY} optionItems={options} switchSelected={this.switchSelected}/>)
        }
        return (
            <div>
                {display.map((item, idx) => {
                    return <div key={idx}>{item}</div>
                })}
            </div>
        );
    }

    createSubtopics = () => {
        var display = [];
        var options = [];
        for(var topic in this.state.topics) {
            options = options.concat(cnst.TOPIC_SUBTOPIC_DICT[this.state.topics[topic]]);
        }

        //https://flaviocopes.com/react-how-to-loop/
        for(var i = 0; i < this.state.subtopicCount; i++) {
            display.push(<DynamicOptionDropdown id={i} itemToChange={cnst.SUBTOPIC_KEY} optionItems={options} switchSelected={this.switchSelected}/>)
        }
        return (
            <div>
                {display.map((item, idx) => {
                    return <div key={idx}>{item}</div>
                })}
            </div>
        );
    }

    uploadData = () => {
        const db = firebase.firestore();

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

        const topicsProcessed = [];
        for(var key in this.state.topics) {
            if(!topicsProcessed.includes(this.state.topics[key])) {
                topicsProcessed.push(this.state.topics[key]);
            }
        }

        const myelement = new Question({
            id:id, 
            paperType:this.state.paperType,
            year:this.state.year, 
            session:this.state.session, 
            level: this.state.level,
            questionNum:this.state.questionNum,
            topics: topicsProcessed,
            subtopics: subtopicsProcessed,
            subtopicMetadata: this.state.subtopicMetadata,
            questionImageUrls: [],
            answerImageUrls: []
        })

        // newQuestionRef.set({
        //     paperType: this.state.paperType,
        //     year: this.state.year,
        //     session: this.state.session,
        //     topic: this.state.topic
        // });
        newQuestionRef.set(myelement.getData());
        return id;
    }

    uploadPdf = (callback) => {
        this.setState({
            parsing: true
        })
        const storage = firebase.storage();
        var markscheme = ""
        if(this.state.markscheme === "Yes") {
            markscheme = "M"
        }
        // var markscheme = "M" ? this.state.markscheme === "Yes" : "" somehow this doesnt work, it becomes "false"
        const fileName = this.state.session + this.state.year.toString().slice(-2) + this.state.level + "P" + this.state.paperType + markscheme + ".pdf"
        
        this.state.pdfFiles.forEach(pdf => {
            const pdfRefName = `uploadedPdfs/${fileName}`;
            const uploadTask = storage.ref(pdfRefName).put(pdf);
            uploadTask.on('state_changed',
                () => {}, //cancel function
                (error) => {
                    // error function ....
                    console.log(error);
                },
                () => {
                    //complete function
                    console.log("completed upload of pdf");
                    callback(fileName);
                }
            )
        });
    }

    fetchRequestParse = (filename) => {
        const token = getCookie('csrftoken'); //this is needed to prevent 403 Forbidden
        var isMarkscheme = true ? this.state.markscheme === "Yes" : false
        console.log(isMarkscheme)
        fetch(`/create/${filename}`, {
            method: 'PUT',
            headers: {
                'X-CSRFToken': token
            },
            body: JSON.stringify({
                paperType: this.state.paperType,
                year: this.state.year,
                session: this.state.session,
                level: this.state.level,
                filename: filename,
                pageStartNum: this.state.pageStartNum,
                isMarkscheme: isMarkscheme
            })
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        }).then(data => {
            console.log("pdf updated successfully");
            this.setState({
                parsing: false
            })
        }).catch(err => {
            console.log("pdf not updated/uploaded");
            console.log(err);
            this.setState({
                parsing: false
            })
            alert("pdf not uploaded");
        })
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
                () => {}, //next function
                (error) => {
                    // error function
                    console.log(error);
                },
                () => { //complete function
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
                }
            );
        })

        this.state.answerImages.forEach((image, index) => {
            const imageRefName = `answers/${Date.now()}`;
            const uploadTask = storage.ref(imageRefName).put(image);
            uploadTask.on('state_changed',
                () => {}, //next function
                (error) => {
                    // error function ....
                    console.log(error);
                },
                () => { //complete function
                    storage.ref(imageRefName).getDownloadURL().then(url => {
                        console.log("got download URL answer");
                        firebase
                        .firestore()
                        .collection(cnst.DATABASE_BRANCH).doc(key)
                        .update(
                        {
                            //https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
                            answerImageUrls: firebase.firestore.FieldValue.arrayUnion(url)
                        });
                    })
                }
            );
        })
    }

    submitPdf = event => {
        event.preventDefault();
        // https://stackoverflow.com/a/13455303
        this.uploadPdf((result) => {
            console.log("onComplete", result);
            // this.downloadPdf(result)
            this.fetchRequestParse(result)
        });
    }

    submitForm = e => {
        e.preventDefault();
    
        const dataKey = this.uploadData();
        this.uploadImages(dataKey);
          this.clearInputFields(e); //TODO: SHOULD I CALL THIS OR NOT?  BECAUSE UI DISPLAY IS NOT CLEARED
    }

    render() {
        return (
            <LoadingOverlay active={this.state.parsing} spinner text="Parsing your Pdf">
            <div className="create-form-container">
                <Form onSubmit={(event)=>this.submitForm(event)}>
                    <Row form>
                        <div>
                            <img id="myimg"/>
                            {this.temp()}
                        </div>
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
                    </Row>
                    <FormGroup>
                        <Label for="exampleCustomFileBrowser">PDF Upload</Label>
                        <CustomInput type="file"
                                    multiple
                                        id="exampleCustomFileBrowser"
                                        name="customFile"
                                        label="Pick a pdf to upload"
                                        onChange={
                                        (event)=> {
                                            this.setState({
                                                pdfFiles: [...event.target.files]
                                            })
                                        }
                                        }
                        />
                    </FormGroup>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="markschemeSelect">Is it a markscheme?</Label>
                                <Input type="select" name="select" id="markschemeSelect" onChange={(event)=> {
                                    this.setState({
                                        markscheme: event.target.value
                                    })
                                }}>
                                    <option>Yes</option>
                                    <option>No</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="questionNum">Page where Section A starts (eg. if it starts on page 3, input 3)</Label>
                                <Input type="number" min="1" className="form-control" id="questionNumber"
                                onBlur={(event)=> {
                                    this.setState({
                                        pageStartNum: event.target.value
                                    })
                                }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button color="primary" onClick={(event) => this.submitPdf(event)}>Upload and Parse PDF</Button>
                    <br/>
                    <Col md={3}>
                        <FormGroup>
                            <Label htmlFor="questionNum">Question Number</Label>
                            <Input type="number" min="1" className="form-control" id="questionNumber"
                            onBlur={(event)=> {
                                this.setState({
                                    questionNum: event.target.value
                                })
                            }}
                            />
                        </FormGroup>
                    </Col>
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
                    <Row>
                    <Col>
                    {this.createTopics()}
                    <Button color="primary" onClick={() => this.increaseCount(cnst.TOPIC_KEY)}>Add Topic</Button>
                    <Button color="danger" onClick={() => this.decreaseCount(cnst.TOPIC_KEY)}>Remove Topic</Button>
                    </Col>
                    <Col>
                    {this.createSubtopics()}
                    <Button color="primary" onClick={() => this.increaseCount(cnst.SUBTOPIC_KEY)}>Add Subtopic</Button>
                    <Button color="danger" onClick={() => this.decreaseCount(cnst.SUBTOPIC_KEY)}>Remove Subtopic</Button>
                    </Col>
                    </Row>
                    <br/>
                    <Button color="primary" type="submit">Save Question</Button>
                </Form>
                
            </div>
            </LoadingOverlay>
        );
    }
}

export default CreateQuestion;