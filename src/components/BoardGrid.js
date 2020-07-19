import React from 'react';
import Cell from './Cell';

const BoardGrid = ({
    columns, 
    themeColor,
    readOnly,
    onChangeColumnTitle,
    onChangeCell,
    onChangeQuestion
    }) => {
    
    let domCtrlColumns = 
                    <div className="text-center container-ctrl-columns">
                        <button className="btn btn-white btn-circle rounded-circle shadow-sm mr-2 text-danger"> <span className="fas fa-trash"></span> </button>
                        <button className="btn btn-white btn-circle rounded-circle shadow-sm"> <span className="fas fa-arrows-alt"></span> </button>
                    </div>;

    if(readOnly) {
        domCtrlColumns = "";
    }

    const showColumns = () => (
        columns.map((column, indexC) => {
            return(
                
                <div className="d-inline-block container-column" key={indexC} >
                    <input 
                    type="text" 
                    readOnly={readOnly} 
                    className="h6 titleColumn column-board my-4" 
                    id={`column-${indexC}`}
                    defaultValue={column.titleColumn}
                    onChange={onChangeColumnTitle}
                    maxLength="22"
                    />
                    {
                        column.questions.map((question, indexQ) => {
                            return <Cell 
                            themeColor={themeColor} 
                            readOnly={readOnly} 
                            onChangeCell={onChangeCell} 
                            onChangeQuestion={onChangeQuestion} 
                            question={question} 
                            key={indexQ} 
                            indexC={indexC} 
                            indexQ={indexQ} />
                        })
                    }
                    {
                        domCtrlColumns
                    }
                </div>
            )
        })
    )
    return (
        <div className="container">
            <div className="row align-items-center justify-content-center">
                {showColumns()}
            </div>
        </div>

    )
}

export default BoardGrid;