import React, {Component} from 'react';
import {CustomInput, Form, FormGroup, FormText, Label, Input, Button, Alert, Col, Row} from 'reactstrap';
import {getCookie} from "./Utils";
import * as cnst from "./Const"

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
            subtopics:[]
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
            teams: ''
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
                                <Input type="select" name="select" id="sessionSelect">
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

    render() {
        return (
            <div className="create-form-container">
                <Form>
                    <Row form>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="paperTypeSelect">Paper Type</Label>
                                <Input type="select" name="select" id="paperTypeSelect">
                                    <option>Paper 1</option>
                                    <option>Paper 2</option>
                                    <option>Paper 3</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <Label for="yearSelect">Year</Label>
                            <Input type="select" name="select" id="yearSelect">
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
                                <Input type="select" name="select" id="sessionSelect">
                                    <option>May</option>
                                    <option>November</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="sessionSelect">Topic</Label>
                                <Input type="select" name="select" id="sessionSelect">
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
                        <Label for="exampleCustomFileBrowser">Scenario Image</Label>
                        <CustomInput type="file"
                                     id="exampleCustomFileBrowser"
                                     name="customFile"
                                     label="Pick an image file"
                        />
                    </FormGroup>
                </Form>
                <Button color="primary" >Save Question</Button>
            </div>
        );
    }
}

export default createQuestion;