import React from 'react';

const Loading = ({text}) => (
    
    <div className="contLoading">
        <img src="" className="img-spinner"/>
            <span id="spinner">
            </span>
        <p className="saludos">{text}</p>
    </div>

);

export default Loading;