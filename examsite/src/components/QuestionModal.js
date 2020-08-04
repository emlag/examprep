import React, {useState, useEffect} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const QuestionModal = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);
    const [note, setNote] = useState("hi this is a note");

    const toggle = () => setModal(!modal);

    // useEffect(() => {
    //     getNote();
    // }, [note, modal])
    //

    function getImages(imagesArr) {
        const allImageDivs = imagesArr.map((imageURL, idx) => {
            return(
                <img src={imageURL} alt={idx} width="100%"/>
            )
        })

        return allImageDivs;
    }

    return (
        <div>
            <a onClick={toggle} style={{color: '#2980b9', cursor:"pointer"}}><u>{props.title}</u></a>
            <Modal isOpen={modal} toggle={toggle} size="lg" style={{maxWidth: '1200px', width: '60%'}}>
                {/*<ModalHeader toggle={toggle}>{props.teamName}</ModalHeader>*/}
                <ModalBody>
                    {getImages(props.data.questionImageUrls)}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>OK</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default QuestionModal;