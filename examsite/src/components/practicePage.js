import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Checkbox from '@material-ui/core/Checkbox';
import {makeStyles} from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import QuestionCard from "./QuestionCard";
import Container from '@material-ui/core/Container';


//venturing into styled components.
//have no idea what I'm doing xD
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
    card: {
        maxWidth: 1000,
    },
    media: {
        height: 700,
        width: '33%',
        marginLeft: '33%'
    },
}));

//Using functional component instead of a class component.
//Doing this mostly to use current react best practices and learn about the difference.
export default function practicePage() {
    const classes = useStyles();

    //similar to this.state in a class component
    const [state, setState] = useState({
        topicOne: false,
        topicTwo: false,
        topicThree: false,
        topicFour: false,
        topicFive: false,
        topicSix: false,
        topicSeven: false,
    });

    //change the current state for one of the checkboxes
    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    //creating variables for the states
    const {topicOne, topicTwo, topicThree, topicFour, topicFive, topicSix, topicSeven} = state;


    //1. pick a checkbox
    //2. click on a button to query
    //3. figure out which checkboxes are clicked
    //4. compound query for any checkboxes that are on
        //5. is there a way to get a random one or do I have to get all of the data currently in the databse?
    //5. display the questions in the correct spot
        //5a. this will be an array so we have to loop through an create a new card image for each question image
    //6. display the answer int he correct spot.
        //6a. same sort of looping for the answer images
    //7. display the metadata
    //8. display the title and topic info for the picture



    return (
        <div>
            <Container>
                <FormLabel component="legend">Choose one or more topics: </FormLabel>
                <div className={classes.root}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={topicOne} onChange={handleChange} name="topicOne"
                                                   color="primary"/>}
                                label="Topic 1: Systems Fundamentals"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={topicTwo} onChange={handleChange} name="topicTwo"
                                                   color="primary"/>}
                                label="Topic 2: Computer Organization"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={topicThree} onChange={handleChange} name="topicThree"
                                                   color="primary"/>}
                                label="Topic 3: Networks"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={topicFour} onChange={handleChange} name="topicFour"
                                                   color="primary"/>}
                                label="Topic 4: Computational Thinking"
                            />
                        </FormGroup>
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={topicFive} onChange={handleChange} name="topicFive"
                                                   color="primary"/>}
                                label="Topic 5: Abstract Data Structures"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={topicSix} onChange={handleChange} name="topicSix"
                                                   color="primary"/>}
                                label="Topic 6: Resource Management"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={topicSeven} onChange={handleChange} name="topicSeven"
                                                   color="primary"/>}
                                label="Topic 7: Control"
                            />
                        </FormGroup>
                    </FormControl>
                </div>
            </Container>
            <Container>
                <QuestionCard/>
            </Container>
        </div>
    )
}

