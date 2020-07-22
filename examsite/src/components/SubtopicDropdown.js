import React from 'react';
import { useState } from 'react';
import {FormGroup, Label, Input, Col} from 'reactstrap';

function SubtopicDropdown(props) {
    const optionItems = props.optionItems;
    const id = props.id;
    // //https://stackoverflow.com/questions/53165945/what-is-usestate-in-react
    // const [prevSelected, setPrevSelected] = useState(optionItems[0]);
    // console.log("prevSelected: "+ prevSelected);
    // const listItems = optionItems.map(item =>
    //     {
            return (
                <Col md={4}>
                    <FormGroup>
                        <Label for="subtopicSelect">Subtopic</Label>
                        <Input type="select" name="select" id="subtopicSelect"
                        onSelect={ (event) => {console.log("onselect " + event.target.value)}}
                        onChange={ (event) => 
                            {
                                console.log("event target value: " + event.target.value);
                                props.switchSelectedSubtopic(id, event.target.value);
                                // props.switchSelectedSubtopic(prevSelected, event.target.value)
                                // setPrevSelected(event.target.value);
                            }
                        }
                        >
                            {optionItems.map(item => {
                            return <option value={item}>{item}</option>;
                            })}
                            {/* <option>1.1.1</option>
                            <option>1.1.2</option>
                            <option>1.1.3</option>
                            <option>1.1.4</option>
                            <option>1.1.5</option>
                            <option>1.1.6</option>
                            <option>1.1.7</option> */}
                        </Input>
                    </FormGroup>
                </Col>
            )
    //     }
    // );
}

export default SubtopicDropdown;