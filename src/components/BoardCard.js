import React from 'react';

const BoardCard = ({index, titleBoard, themeColor, dateModified, deleteBoard, copyBoard}) => {
    return(
        <React.Fragment>
            <div 
            className="boardCard row align-items-center justify-content-between rounded bg-white shadow-sm my-3 p-3"
                style={{ borderLeft: "4px solid " + themeColor}}>
                <div className="col-10 px-0">
                    <h4 className="titulo-board-card">{titleBoard}</h4>
                    <span className="fecha-card">{dateModified}</span>
                </div>
                <div className="col-2 pl-3 px-0 border-left">
                    <button data-tooltip="Jugar tablero" id={index} 
                    className=" tooltip-bottom btn btn-board-card btn-primary rounded-circle mr-2 shadow-sm btnPlay">
                        <span className="fas fa-play"></span>
                    </button>
                    <button data-tooltip="Editar tablero" id={index} 
                    className=" tooltip-bottom btn btn-board-card btn-warning rounded-circle mr-2 shadow-sm btnEdit">
                        <span className="fas fa-pen"></span>
                    </button>
                    <button data-tooltip="Copiar tablero" onClick={copyBoard} id={index} 
                    className=" tooltip-bottom btn btn-board-card btn-success rounded-circle mr-2 shadow-sm btnCopy">
                        <span id={index} className="fas fa-copy"></span>
                    </button>
                    <button data-tooltip="Eliminar tablero" onClick={deleteBoard} id={index} 
                    className=" tooltip-bottom btn btn-board-card btn-danger rounded-circle  shadow-sm btnDelete">
                        <span id={index} className="fas fa-trash"></span>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )   
}

export default BoardCard;
