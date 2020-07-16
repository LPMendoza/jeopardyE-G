import React from 'react';
import WindowHeader from '../components/WindowHeader';
import Title from '../components/Title';

const Board = () => {
    return (
        <React.Fragment>
        <div className="container-home">
            
            <div className="bg-white shadow-sm">
                <WindowHeader 
                classColor="text-dark" />
                <div className="container">
                    <div className="container-header-boards row align-items-center justify-content-center mb-1">
                        <Title title="Tableros" classColor="text-dark" />
                    </div>
                </div>
            </div>
        </div>
            
        </React.Fragment>
    )
}

export default Board;