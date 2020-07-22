import React from 'react';
import ReactTooltip from "react-tooltip";

const Cell = ({
    question, 
    indexQ, 
    indexC,
    readOnly,
    onChangeCell,
    setCellClicked,
    setShowQuestion,
    setFocusText,
    foucusText,
    onDeleteRow
}) => {
    let cellDom = question.value;

    const handleFocus = (e) => {
        setFocusText(true);
        e.target.select();
    }

    const handleBlur = (e) => {
        setFocusText(false);
    }
    
    const handleDeleteRow = (e) => {
        onDeleteRow(indexQ);
    }

    if(readOnly == false ){
        cellDom = <input onBlur={handleBlur} onFocus={handleFocus} onChange={onChangeCell} type="number" id={`cell-${indexC}-${indexQ}`} readOnly={readOnly} value={question.value} 
        style={{marginLeft: "1rem"}} />
    }

    let handleShowQuestion = (e) => {
        if (!foucusText) {
            setShowQuestion(true);
            setCellClicked([indexC, indexQ]);
        }
    }

    return(
        <React.Fragment>
            <div className="container-cell px-0">
                {
                    (!readOnly && indexC == 0) ? <button onClick={handleDeleteRow} data-tip="Delete row" className="btn container-ctrl-cell btn-white btn-circle rounded-circle shadow-sm mx-2 text-danger"> <span className="fas fa-trash"></span> </button>
                    : ""
                }

                <div
                    onClick={handleShowQuestion}
                    id={`cell-${indexQ}-${indexC}`}
                    className="cell-board btn-white shadow-sm"
                >
                    {cellDom}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Cell;