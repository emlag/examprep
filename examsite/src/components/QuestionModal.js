import React, {useState, useEffect} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const QuestionModal = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [note, setNote] = useState("hi this is a note");

    const toggle = () => setModal(!modal);
    const toggleAnswer = () => setShowAnswer(!showAnswer);

    function getImages(data) {
        const allImageDivs = data.questionImageUrls.map((imageURL, idx) => {
            return(
                <img src={imageURL} alt={idx} width="100%"/>
            )
        })

        return allImageDivs;
    }

    function getAnswers(data) {
        const allImageDivs = data.answerImageUrls.map((imageURL, idx) => {
            return(
                <img src={imageURL} alt={idx} width="100%"/>
            )
        })

        return allImageDivs;
    }

    function toShow(data) {
        if (showAnswer){
            return getAnswers(data)
        }

        return getImages(data);
    }

    function buttonTitle() {
        const title = showAnswer ? "Question" : "Mark Scheme";

        return title;
    }

    return (
        <div>
            <a onClick={toggle} style={{color: '#2980b9', cursor:"pointer"}}><u>{props.title}</u></a>
            <Modal isOpen={modal} toggle={toggle} size="lg" style={{maxWidth: '1200px', width: '60%'}}>
                {/*<ModalHeader toggle={toggle}>{props.teamName}</ModalHeader>*/}
                <ModalBody>
                    {toShow(props.data)}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleAnswer}>{buttonTitle()}</Button>{' '}
                    <Button color="primary" onClick={toggle}>OK</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default QuestionModal;