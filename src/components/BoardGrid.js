import React, {useState} from 'react';
import StyleSheet from 'react';
import Cell from './Cell';
import Question from './Question';
import {ReactSortable, Sortable, MultiDrag, Swap} from 'react-sortablejs';

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
    onDeleteColumn
    }) => {

    const [cellClicked, setCellClicked] = useState([0, 0]);
    let [showQuestion, setShowQuestion] = useState(false);
    let [foucusText, setFocusText] = useState(false);

    const createCtrlColumn = (index) => {

        return (
            <div className="text-center container-ctrl-columns pb-1" key={index}>
                <button onClick={(e) => {onDeleteColumn(index)}} className="btn btn-white btn-circle rounded-circle shadow-sm mr-2 text-danger"> <span className="fas fa-trash"></span> </button>
                <button className="btn btn-white btn-circle rounded-circle shadow-sm sortIconColumn"> <span className="fas fa-arrows-alt"></span> </button>
            </div>
        ) 
        

    }

    const createCtrlRow = (index) => {

        return (
            <div className="text-center pb-1" key={index} style={{height: "60px"}}>
                <button onClick={(e) => {onDeleteColumn(index)}} className="btn btn-white btn-circle rounded-circle shadow-sm mb-2 text-danger"> <span className="fas fa-trash"></span> </button>
            </div>
        ) 
        

    }

    const showCtrlsRow = () => {
        return (
            <div className="d-inline-block container-column mx-1 mb-2 d-inline-block" >
                    <div className="h6 titleColumn column-board my-4" style={{height: "21px"}} />
                    {
                        columns[0].questions.map((cell, index) => {
                            return createCtrlRow(index);
                        })
                    }
            </div>
        )
        
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
                    {/* <ReactSortable 
                    list={column.questions} 
                    setList={setColumnsS}
                    multiDrag

                    group="container-column"
                    animation={200}
                    ghostClass={"draggableCell"}
                    selectedClass={"draggableClass"}
                    > */}
                        {
                            column.questions.map((question, indexQ) => {
                                return <Cell 
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
                                />
                            })
                        }
                        
                    {/* </ReactSortable> */}
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
            {/* {
                showCtrlsRow()
            } */}
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