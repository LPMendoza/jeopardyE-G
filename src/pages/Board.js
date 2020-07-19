import React from 'react';
import WindowHeader from '../components/WindowHeader';
import Title from '../components/Title';
import BoardGrid from '../components/BoardGrid';
import PaletteColor from '../components/PaletteColor';
import ReactTooltip from "react-tooltip";

const Board = ({
    board, 
    isGame,
    onChangeTitle,
    onChangeColumnTitle,
    onChangeCell,
    onChangeTheme,
    onAddColumn,
    onAddRow,
    onClickSave,
    onChangeQuestion
    }) => {

    const showEditCtrl = () => {
        if(isGame == false) {
            return (
                <div className="ctrl-grid-boards bg-white text-center pt-4 pb-3 px-2 shadow">
                    <button
                        onClick={onClickSave}
                        data-tip="Guardar"
                        className="tooltip-bottom btn rounded-circle btn-circle btn-white text-dark my-md-0">
                        <span className="fa fa-save"></span>
                    </button>
                    <br />
                    <button
                        onClick={onAddColumn}
                        data-tip="Agregar columna"
                        className="tooltip-bottom btn rounded-circle btn-circle btn-white text-dark my-md-0">
                        <span className="fas fa-columns"></span>
                    </button>
                    <br/>
                    <button
                        onClick={onAddRow}
                        data-tip="Agregar renglón"
                        className="tooltip-bottom btn rounded-circle btn-circle btn-white text-dark my-md-0">
                        <span className="far fa-minus-square"></span>
                    </button>
                    <br/>
                    <PaletteColor
                        onChangeTheme={onChangeTheme}
                    />

                </div>
            )
        }
    }

    return (
        <React.Fragment>
        <div className="page container-home">
            
            <div className={`shadow-sm`} style={{backgroundColor: `${board.themeColor}`}}>
                <WindowHeader 
                classColor="text-white"
                backButton
                />
                <div className="container-fluid">
                    <div className="container-header-boards row align-items-center mb-1">
                        <Title 
                        title={board.titleBoard} 
                        readOnly={isGame} 
                        onChangeTitle={onChangeTitle}
                        classColor="text-white text-center col-12" />
                        {showEditCtrl()}
                    </div>

                </div>
            </div>

            <div className="container-boards">
                <BoardGrid
                    columns={board.columns}
                    themeColor={board.themeColor}
                    readOnly={isGame}
                    onChangeColumnTitle={onChangeColumnTitle}
                    onChangeCell={onChangeCell}
                    onChangeQuestion={onChangeQuestion}
                />
                <div className="container my-1">
                    <div className="row align-items-center justify-content-center">
                    </div>
                </div>
            </div>


        </div>
            <ReactTooltip place="right" type="dark" effect="solid"/>
        </React.Fragment>
    )
}

export default Board;