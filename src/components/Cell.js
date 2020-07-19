import React, {useState} from 'react';
import Question from './Question';

const Cell = ({
    question, 
    themeColor,
    indexQ, 
    indexC,
    readOnly,
    onChangeCell,
    onChangeQuestion
}) => {
    let cellDom = question.value;

    let [showQuestion, setShowQuestion] = useState("");
    let [isAnswered, setAnswered] = useState(false);

    if(readOnly == false ){
        cellDom = <input onChange={onChangeCell} type="number" id={`cell-${indexC}-${indexQ}`} readOnly={readOnly} defaultValue={question.value} />
    }

    let handleShowQuestion = (e) => {
        setShowQuestion("question-showed")
    }


    return(
        <React.Fragment>
            <div 
            onClick={handleShowQuestion} 
            id={`cell-${indexQ}`}
            className="cell-board d-block btn-white shadow-sm" 
            style={{
                color: `${isAnswered ? themeColor : "text-dark"}`
            }}
            >
                {cellDom}
            </div>
            <Question 
            indexC={indexC}
            indexQ={indexQ}
            question={question} 
            showQuestion={showQuestion} 
            setShowQuestion={setShowQuestion} 
            readOnly={readOnly}
            themeColor={themeColor}
            onChangeQuestion={onChangeQuestion}
            setAnswered={setAnswered}
            />
        </React.Fragment>
    )
}

export default Cell;