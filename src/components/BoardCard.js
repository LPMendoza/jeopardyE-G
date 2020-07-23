import React from 'react';
import {Link} from 'react-router-dom';
import ReactTooltip from "react-tooltip";

const BoardCard = ({
    index, 
    board, 
    copyBoard, 
    deleteBoard, 
    editBoard
}) => {
    const handleEdit = (e) => {
        editBoard(board, false);
    }

    const handleGame = (e) => {
        editBoard(board, true);
    }

    return(
        <React.Fragment>
            <div 
            className="boardCard row align-items-center justify-content-between rounded bg-white shadow-sm my-3 p-3"
                style={{ borderLeft: "4px solid " + board.themeColor}}>
                <div className="col-10 px-0">
                    <h4 className="titulo-board-card">{board.titleBoard}</h4>
                    <span className="fecha-card">{board.dateModified}</span>
                </div>
                <div className="col-lg-2 col-12 mt-2 mt-lg-0 pl-3 px-0 border-left">
                    <button onClick={handleGame} data-tip="Play board" id={index}
                            className=" tooltip-bottom btn btn-circle btn-primary rounded-circle mr-2 shadow-sm btnPlay">
                            <span className="fas fa-play"></span>
                    </button>
                    <button onClick={handleEdit} data-tip="Edit board" id={index}
                        className=" tooltip-bottom btn btn-circle btn-warning rounded-circle mr-2 shadow-sm btnEdit">
                        <span id={index} className="fas fa-pen"></span>
                    </button>
                    <button data-tip="Copy board" onClick={copyBoard} id={index} 
                    className=" tooltip-bottom btn btn-circle btn-success rounded-circle mr-2 shadow-sm btnCopy">
                        <span id={index} className="fas fa-copy"></span>
                    </button>
                    <button data-tip="Delete board" onClick={deleteBoard} id={index} 
                    className=" tooltip-bottom btn btn-circle btn-danger rounded-circle  shadow-sm btnDelete">
                        <span id={index} className="fas fa-trash"></span>
                    </button>
                </div>
            </div>
            <ReactTooltip place="bottom" type="dark" effect="solid"/>

        </React.Fragment>
    )   
}

export default BoardCard;
