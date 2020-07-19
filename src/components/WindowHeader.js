import React, {useState} from 'react';
const {remote} = window.require("electron");

const WindowHeader = ({
    classColor, 
    minimizeButton,
    maximizeButton,
    closeButton,
    backButton
}) => {
    
    let [maximize, setMaximize] = useState(true);

    const goBack = (e) => {
        window.history.go(-1);
    }
    const handleMaximize = (e) => {
        let currentWindow = remote.getCurrentWindow();
        if (maximize) {
            currentWindow.unmaximize()
            setMaximize(false);
        } else {
            currentWindow.maximize()
            setMaximize(true);
        }
    }

    const handleMinimize = (e) => {
        let currentWindow = remote.getCurrentWindow();
        currentWindow.minimize();
    }

    const handleClose = (e) => {
        let currentWindow = remote.getCurrentWindow();
        currentWindow.close();
    }

    let classBackButton = "d-none";
    let classCloseButton = "d-none";
    let classMinimizeButton = "d-none";
    let classMaximizeButton = "d-none";

    if(backButton) {
        classBackButton = "";
    }
    if (minimizeButton) {
        classMinimizeButton = "";
    }
    if (maximizeButton) {
        classMaximizeButton = "";
    }
    if (closeButton) {
        classCloseButton = "";
    }
    const classMaximizeIcon = maximize === true ? "fas fa-compress-alt " + classColor : "fas fa-expand-alt "+ classColor;
    return (
        <div className="container-window-header mb-5">
            <div>
                <button 
                onClick={goBack} 
                className={`${classBackButton} btnBack btn px-3 ${classColor}`}
                id="btnBack"
                >
                    <span className="fas fa-arrow-left"></span>
                </button>
                <span className={"window-title " + classColor}>Jeopardy E & G</span>
            </div>
            <div className="container-window-btn">
                <div className={`window-btn btn-minimize ${classMinimizeButton}`} onClick={handleMinimize} ><span className={"far fa-window-minimize " + classColor}></span></div>
                <div className={`window-btn btn-maximize ${classMaximizeButton}`} onClick={handleMaximize} id="btnMaximize"><span className={classMaximizeIcon} ></span></div>
                <div className={`window-btn btn-close ${classCloseButton}`} onClick={handleClose} id="btnClose"> <span className={"fas fa-times " + classColor}></span></div>
            </div>
        </div>
    )
}
export default WindowHeader;