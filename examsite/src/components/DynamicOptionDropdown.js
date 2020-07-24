import React from 'react';
import { useState } from 'react';
import {FormGroup, Label, Input, Col} from 'reactstrap';
import * as cnst from "./Const"

function DynamicOptionDropdown(props) {
    const optionItems = props.optionItems;
    const itemToChange = props.itemToChange;
    const id = props.id;
    var label;
    if(itemToChange === cnst.TOPIC_KEY)
    {
        label = "Topic";
        var itemValues = optionItems.map(item => item.split(":")[0])
        console.log("itemValues: " + itemValues);
    }
    else if(itemToChange === cnst.SUBTOPIC_KEY)
    {
        label = "Subtopic";
        var itemValues = optionItems;
    }
    // //https://stackoverflow.com/questions/53165945/what-is-usestate-in-react
    // const [prevSelected, setPrevSelected] = useState(optionItems[0]);
    // console.log("prevSelected: "+ prevSelected);
    // const listItems = optionItems.map(item =>
    //     {
        return (
            <Col md={4}>
                <FormGroup>
                    <Label for="dropdownSelect">{label}</Label>
                    <Input type="select" name="select" id="dropdownSelect"
                    onSelect={ (event) => {console.log("onselect " + event.target.value)}}
                    onChange={ (event) => 
                        {
                            console.log("event target value: " + event.target.value);
                            props.switchSelected(id, event.target.value, itemToChange);
                            // props.switchSelectedSubtopic(prevSelected, event.target.value)
                            // setPrevSelected(event.target.value);
                        }
                    }
                    >
                        <option value="" disabled="true" selected="true">Select {itemToChange}</option>
                        {
                            optionItems.map((item, index) => {
                        return <option value={itemValues[index]}>{item}</option>;
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

export default DynamicOptionDropdown;