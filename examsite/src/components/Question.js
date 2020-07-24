import React, {Component} from 'react';

export class Question extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            paperType: this.props.paperType,
            year: this.props.year,
            session: this.props.session,
            level: this.props.level,
            questionNum: this.props.questionNum,
            topics: this.props.topics,
            subtopics: this.props.subtopics,
            subtopicMetadata: this.props.subtopicMetadata,
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
