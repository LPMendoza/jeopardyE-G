import React, {useState} from 'react';
import Cell from './Cell';
import Question from './Question';
import {ReactSortable, Sortable, MultiDrag, Swap} from 'react-sortablejs';
import ReactTooltip from "react-tooltip";

Sortable.mount(new MultiDrag(), new Swap());

const BoardGrid = ({
    columns, 
    themeColor,
    readOnly,
    onSortColumns,
    onChangeColumnTitle,
    onChangeCell,
    onChangeQuestion,
    setScoreOp,
    onDeleteColumn,
    onDeleteRow

    }) => {

    const [cellClicked, setCellClicked] = useState([0, 0]);
    let [showQuestion, setShowQuestion] = useState(false);
    let [foucusText, setFocusText] = useState(false);
    let questions = [];

    const createCtrlColumn = (index) => {

        return (
            <div className="text-center container-ctrl-columns pb-1" key={index}
            
                >
                <button data-tip="Delete column" onClick={(e) => {onDeleteColumn(index)}} className="btn btn-white btn-circle rounded-circle shadow-sm mr-2 text-danger"> <span className="fas fa-trash"></span> </button>
                <button data-tip="Sort column" className="btn btn-white btn-circle rounded-circle shadow-sm sortIconColumn"> <span className="fas fa-arrows-alt"></span> </button>
            </div>
        ) 
        

    }

    const sortQuestions = (questions, indexC) => {
        let newColumns = columns;
        newColumns[indexC].questions = questions;
        
        onSortColumns(newColumns);
    }

    const showColumns = () => (
        columns.map((column, indexC) => {
            return(
                
                <div className="d-inline-block container-column mx-1 mb-2" key={indexC} >

                    <input 
                    type="text" 
                    readOnly={readOnly} 
                    className="h6 titleColumn column-board my-4" 
                    id={`column-${indexC}`}
                    value={column.titleColumn}
                    onChange={onChangeColumnTitle}
                    maxLength="22"
                    />
                    <ReactSortable 
                    list={column.questions} 
                    setList={(newQuestions) => { sortQuestions(newQuestions, indexC)} }
                    group="container-column"
                    animation={200}
                    ghostClass={"draggableCell"}
                    swapClass={"draggableCell"}
                    selectedClass={"draggableClass"}
                    >
                        {
                            column.questions.map((question, indexQ) => {
                                question["columnIndex"] = indexC;
                                questions.push(question);
                                return (
                                    <div key={indexQ}>
                                        <Cell 
                                        readOnly={readOnly} 
                                        onChangeCell={onChangeCell} 
                                        question={question} 
                                        key={indexQ} 
                                        indexC={indexC} 
                                        indexQ={indexQ}
                                        setShowQuestion={setShowQuestion}
                                        foucusText={foucusText}
                                        setFocusText={setFocusText}
                                        setCellClicked={setCellClicked} 
                                        setScoreOp={setScoreOp}
                                        onDeleteRow={onDeleteRow}
                                        />
                                    </div>
                                )
                            })
                        }
                        
                    </ReactSortable>
                    {
                        (!readOnly && columns.length > 1) ? createCtrlColumn(indexC) : ""
                    }
                </div>
            )
        })
    )
    return (
        <div className="container-fluid px-5">
            <div className="rowColumns">
                <ReactSortable 
                list={columns} 
                setList={onSortColumns}
                multiDrag
                animation={200}
                handle={".sortIconColumn"}
                ghostClass={"draggableClass"}
                selectedClass={"draggableClass"}
                scroll={true}
                >
                    
                    {
                        showColumns()
                    }
                </ReactSortable>
                
            </div>

            {
                showQuestion ?
                    <Question
                        indexC={cellClicked[0]}
                        indexQ={cellClicked[1]}
                        columns={columns}
                        showQuestion={showQuestion}
                        setShowQuestion={setShowQuestion}
                        readOnly={readOnly}
                        themeColor={themeColor}
                        onChangeQuestion={onChangeQuestion}
                        setScoreOp={setScoreOp}
                    />  
                : ""
            }
        </div>

    )
}

export default BoardGrid;