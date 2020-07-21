import React from 'react';

const NoBoards = () => (
    <div className="container-NoBoards">
            <h1 className="text-center mx-auto">
                There aren't boards
            </h1>
            <h3 className="text-center mx-auto my-4">
            Click on
            <button className="btn rounded-pill mx-3" disabled> 
                <span className="fas fa-plus mr-2"></span> 
                New board
            </button>
            to create a board  
            </h3>
    </div>
)

export default NoBoards;
