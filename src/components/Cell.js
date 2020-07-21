import React from 'react';

const Cell = ({
    question, 
    indexQ, 
    indexC,
    readOnly,
    onChangeCell,
    setCellClicked,
    setShowQuestion,
    setFocusText,
    foucusText
}) => {
    let cellDom = question.value;

    const handleFocus = (e) => {
        setFocusText(true);
        e.target.select();
    }

    const handleBlur = (e) => {
        setFocusText(false);
    }


    if(readOnly == false ){
        cellDom = <input onBlur={handleBlur} onFocus={handleFocus} onChange={onChangeCell} type="number" id={`cell-${indexC}-${indexQ}`} readOnly={readOnly} defaultValue={question.value} />
    }

    let handleShowQuestion = (e) => {
        if (!foucusText) {
            setShowQuestion(true);
            setCellClicked([indexC, indexQ]);
        }
    }

    return(
        <React.Fragment>
            <div 
            onClick={handleShowQuestion} 
            id={`cell-${indexQ}-${indexC}`}
            className="cell-board d-block btn-white shadow-sm" 
            >
                {cellDom}
            </div>
        </React.Fragment>
    )
}

export default Cell;