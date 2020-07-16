import React from 'react';

const NoBoards = () => (
    <div className="container-NoBoards">
            <h1 className="text-center mx-auto">
                No hay tableros que mostrar
            </h1>
            <h3 className="text-center mx-auto my-4">
            De clic en
            <button className="btn rounded-pill mx-3" disabled> 
                <span className="fas fa-plus mr-2"></span> 
                Nuevo tablero
            </button>
            para crear un tablero  
            </h3>
    </div>
)

export default NoBoards;
