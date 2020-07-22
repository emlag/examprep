import React, {Component} from 'react';

export class Question extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            paperType: this.props.paperType,
            year: this.props.year,
            session: this.props.session,
            topic: this.props.topic,
            subtopicQuestionPair: this.props.subtopicQuestionPair,
            questionImageUrls: this.props.questionImageUrls,
            answerImageUrls: this.props.answerImageUrls
        };  
    }

    getData() {
        return this.state;
    }
    addQuestionImageUrl(newImageUrl) {
        this.setState({ questionImageUrls: [...prevState.questionImageUrls, newImageUrl] });
      }

      addAnswerImageUrl(newImageUrl) {
        this.setState({ answerImageUrls: [...prevState.answerImageUrls, newImageUrl] });
      }
}

export default Question;