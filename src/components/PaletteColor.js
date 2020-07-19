import React, {useState} from 'react';
import ReactTooltip from "react-tooltip";

const PaletteColor = ({onChangeTheme}) => {

    let [activePalette, setActivePalette] = useState("");

    let handleClickPalette = (e) => {
        if (activePalette === "activePalete") {
            setActivePalette("");
        }
        else {
            setActivePalette("activePalete");
        }
    }   

    return (
        <div className="d-inline-block dropdown">
            {/* <h6 className="mr-2 d-inline-block">Tema</h6> */}
            <button onClick={handleClickPalette} 
                data-tip="Tema"
                id="btnPalette"
                className="tooltip-bottom btn btn-white btn-circle rounded-circle btn-palette" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="fas fa-palette"></span>
            </button>
            <div 
            aria-labelledby="btnPalette"
            className={`dropdown-menu px-3 shadow`}>
                <div className="btn-group" role="group">
                    <button className="btn option-color btn-primary" onClick={() => { onChangeTheme("#118AB2") }}></button>
                    <button className="btn option-color btn-danger" onClick={() => { onChangeTheme("#EF476F") }}></button>
                    <button className="btn option-color btn-success" onClick={() => { onChangeTheme("#06D6A0") }}></button>
                    <button className="btn option-color btn-warning" onClick={() => { onChangeTheme("#FFD166") }}></button>
                    <button className="btn option-color btn-purple" onClick={() => { onChangeTheme("#7511B2") }}></button>
                </div>
            </div>
            <ReactTooltip place="right" type="dark" effect="solid"/>

        </div>
    );
}

export default PaletteColor;
