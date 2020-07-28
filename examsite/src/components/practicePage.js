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
import Button from "@material-ui/core/Button";
import * as firebase from "firebase";
import * as cnst from "./Const";


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
        allChecked: [],
    });

    const [objFromDB, setObjFromDB] = useState({answerImageUrls:[], questionImageUrls:[], questionNum:""})

    //change the current state for one of the checkboxes
    const handleChange = (event, topicName) => {
        //setState({...state, [event.target.name]: event.target.checked});
        setState({
            allChecked: state.allChecked.includes(topicName) ?
                state.allChecked.filter(value => value !== topicName) :
                [...state.allChecked, topicName]
        });
    };

    //creating variables for the states
    const {topicOne, topicTwo, topicThree, topicFour, topicFive, topicSix, topicSeven} = state;

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    function onSearch() {
        const db = firebase.firestore();

        console.log(state.allChecked);

        const newQuestionRef = db.collection(cnst.DATABASE_BRANCH);
        newQuestionRef.where("topics", "array-contains-any", state.allChecked).get()
            .then((querySnapshot) => {

                let fromDB = []

                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    fromDB.push(doc.data());
                });

                const isEmpty = fromDB === undefined || fromDB.length == 0;

                if (!isEmpty){
                    let randomImageNum = getRandomIntInclusive(0, fromDB.length);
                    const toShow = fromDB[randomImageNum]
                    setObjFromDB(toShow);
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    return (
        <div>
            <Container>
                <FormLabel component="legend">Choose one or more topics: </FormLabel>
                <div className={classes.root}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={topicOne} onChange={e => handleChange(e, "1")} name="1"
                                                   color="primary"/>}
                                label="Topic 1: Systems Fundamentals"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={topicTwo} onChange={e => handleChange(e, "2")} name="2"
                                                   color="primary"/>}
                                label="Topic 2: Computer Organization"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={topicThree} onChange={e => handleChange(e, "3")} name="3"
                                                   color="primary"/>}
                                label="Topic 3: Networks"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={topicFour} onChange={e => handleChange(e, "4")} name="4"
                                                   color="primary"/>}
                                label="Topic 4: Computational Thinking"
                            />
                        </FormGroup>
                        <Button variant="outlined" color="primary" onClick={() => {
                            onSearch()
                        }}>
                            Search
                        </Button>
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={topicFive} onChange={e => handleChange(e, "5")} name="5"
                                                   color="primary"/>}
                                label="Topic 5: Abstract Data Structures"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={topicSix} onChange={e => handleChange(e, "6")} name="6"
                                                   color="primary"/>}
                                label="Topic 6: Resource Management"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={topicSeven} onChange={e => handleChange(e, "7")} name="7"
                                                   color="primary"/>}
                                label="Topic 7: Control"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={topicSeven} onChange={e => handleChange(e, "D")} name="D"
                                                   color="primary"/>}
                                label="Option D: OOP"
                            />
                        </FormGroup>
                    </FormControl>
                </div>
            </Container>
            <Container>
                <QuestionCard dbResult={objFromDB}/>
            </Container>
        </div>
    )
}

