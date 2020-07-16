import React, {useState} from 'react';

const NewBoard = ({createBoard, cancelNewBoard}) => {

    let [titleBoard, setTitleBoard] = useState("");
    let [themeColor, setThemeColor] = useState("#118AB2");
    
    let [errorClass, setErrorClass] = useState("d-none text-danger");

    let validateTitle = (title) => {
        if (title.length != 0) {
            setErrorClass("d-none text-danger");
            return true;
        } 
        setErrorClass("d-block text-danger");
        return false;
    }

    let handleChange = (e) => {
        setTitleBoard(e.target.value.trim());
        validateTitle(e.target.value);
    } 

    let handleCreateBoard = ()=> {
        if(validateTitle(titleBoard)) {
            let newBoard = {
                titleBoard,
                themeColor
            }
            createBoard(newBoard);
            cancelNewBoard();

        }
        else {
            document.getElementById("txtTitleBoard").focus();
        }
    }
    
    return(
        <div 
        className="row align-items-center justify-content-between rounded bg-white shadow-sm my-3 p-3"
        style={{ borderLeft: "4px solid " + themeColor}}>
            <div className="col-10 px-0">
                <input 
                autoFocus
                placeholder="Ingresa aquí el título del tablero" 
                className="titulo-board-input d-block col-12 px-0"
                maxLength="62"
                onChange={handleChange}
                id="txtTitleBoard"
                />
                <span className={errorClass}>Debes ingresar el título del tablero</span>
                <div className="container-palette-color my-2 btn-group" role="group">
                    <button className="btn option-color btn-primary" onClick={() => { setThemeColor("#118AB2")}}></button>
                    <button className="btn option-color btn-danger" onClick={() => { setThemeColor("#EF476F") }}></button>
                    <button className="btn option-color btn-success" onClick={() => { setThemeColor("#06D6A0") }}></button>
                    <button className="btn option-color btn-warning" onClick={() => { setThemeColor("#FFD166") }}></button>
                    <button className="btn option-color btn-purple" onClick={() => { setThemeColor("#7511B2") }}></button>
                </div>
            </div>
            <div className="col-2 pl-3 px-0 border-left">
                <button data-tooltip="Crear tablero" className="tooltip-bottom btn btn-board-card btn-success rounded-circle mr-2 shadow-sm"
                onClick={handleCreateBoard}>
                    <span className="fas fa-check"></span>
                </button>
                <button data-tooltip="Cancelar" className="tooltip-bottom btn btn-board-card btn-danger rounded-circle shadow-sm"
                onClick={cancelNewBoard}>
                    <span className="fas fa-times"></span>
                </button>
            </div>
        </div>
    )   
}

export default NewBoard;