import React from 'react'

const WindowHeader = ({maximize, handleMaximize, handleMinimize, handleClose, classColor}) => {
    const maximizeClass = maximize === true ? "fas fa-compress-alt " + classColor : "fas fa-expand-alt "+ classColor;
    return (
        <div className="container-window-header mb-5">
            <span className={"window-title " + classColor}>Jeopardy E & G</span>
            <div className="container-window-btn">
                <div className="window-btn btn-minimize" onClick={handleMinimize} ><span className={"far fa-window-minimize " + classColor}></span></div>
                <div className="window-btn btn-maximize" onClick={handleMaximize} id="btnMaximize"><span className={maximizeClass} ></span></div>
                <div className="window-btn btn-close" onClick={handleClose} id="btnClose"> <span className={"fas fa-times " + classColor}></span></div>
            </div>
        </div>
    )
}
export default WindowHeader;