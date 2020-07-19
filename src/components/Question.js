import React from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill/dist/quill';

export default class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showedAnswer: ""
        }

        this.domQuestion = <div className="txtQuestion" id={`question-${this.props.indexQ}-${this.props.indexC}`}/>;
        this.domAnswer = <div className="txtAnswer" id={`answer-${this.props.indexQ}-${this.props.indexC}`}/>;

    }
 

    handleHide = (e) => {
        this.props.setShowQuestion("");
    }

    showAnswer = (e) => {
        this.props.setAnswered(true);
    }

    confQuillEditor = () => {
        let toolbar = [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'image'],        
            ['blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      
            [{ 'indent': '-1' }, { 'indent': '+1' }],          
            [{ 'direction': 'rtl' }],                       
            [{ 'align': [] }],
            ['clean']  
        ]
        let quillQuestion = new Quill(`#question-${this.props.indexQ}-${this.props.indexC}`, {
            modules: {
                toolbar
            },
            theme: 'snow'
        });
        
        quillQuestion.on('text-change', (delta, oldDelta, source) => {
            this.handleChangeQuestion(quillQuestion.root.innerHTML);
        });

        let quillAnswer = new Quill(`#answer-${this.props.indexQ}-${this.props.indexC}`, {
            modules: {
                toolbar
            },
            theme: 'snow'
        });
        quillAnswer.on('text-change', (delta, oldDelta, source) => {
            this.handleChangeAnswer(quillAnswer.root.innerHTML);
        });
    }

    handleShowAnswer = () => {
        
        this.setState({
            showedAnswer: "showAnswer"
        });
        if(this.props.readOnly) {
            this.props.setAnswered(true);
        }
    }

    handleChangeQuestion = (text) => {
        let question = this.props.question;
        question.text = text;
        this.props.onChangeQuestion(this.props.indexC, this.props.indexQ, question);
    }

    handleChangeAnswer = (answer) => {
        let question = this.props.question;
        question.answer = answer;
        this.props.onChangeQuestion(this.props.indexC, this.props.indexQ, question);
    }

    showQueston = () => {
        document.getElementById(`question-${this.props.indexQ}-${this.props.indexC}`).innerHTML = this.props.question.text;
        document.getElementById(`answer-${this.props.indexQ}-${this.props.indexC}`).innerHTML = this.props.question.answer;
    }

    componentDidMount(){
        this.showQueston();
        if(!this.props.readOnly){
            this.confQuillEditor();
            this.setState({
                showedAnswer: "showAnswer"
            });
        }

        
    }

    render() {

        return (
            <div className={`page-question ${this.props.showQuestion}`} style={{ backgroundColor: this.props.themeColor }}>
                <div className="menuBar-question">
                    <div className="window-btn" onClick={this.handleHide}> <span className={"fas fa-arrow-left text-white"}></span></div>
                    
                    {
                        this.props.readOnly == false ? "" : <button onClick={this.handleShowAnswer} className={`btnAnswer btn btn-white`}>Respuesta</button>
                    }
                </div>
                <div className="container-question text-white" style={{ backgroundColor: this.props.themeColor }}>

                    {this.domQuestion}
                </div>
                <div className={`container-answer bg-white text-dark ${this.state.showedAnswer}`}>
                    {this.domAnswer}
                </div>
            </div>
        )
    }

}


