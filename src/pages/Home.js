import React, {useState} from 'react';
import WindowHeader from '../components/WindowHeader';
import Title from '../components/Title';
import NewBoard from '../components/NewBoard';
import BoardList from '../components/BoardList';
import Loading from '../components/Loading';


const Home = (
    { 
        boards, 
        maximize, 
        handleMaximize, 
        handleMinimize, 
        handleClose,
        createBoard,
        deleteBoard,
        copyBoard,
        searchBoards,
        orderByTitle,
        orderByDate,
        loading
    }) => {
    
    var contBoardClass = "";

    let [isNewBoard, setIsNewBoard] = useState(false);
    let [classOrderTitle, setClassOrderTitle] = useState("fas fa-sort-alpha-down mr-2 ");
    let [classOrderDate, setClassOrderDate] = useState("fas fa-sort-up mr-2 ");
    let [activeTitle, setActiveTitle] = useState("text-dark");
    let [activeDate, setActiveDate] = useState("text-dark");

    const handleNewBoard = (e) => {
        setIsNewBoard(true);
    }

    let cancelNewBoard = () => {
        setIsNewBoard(false)
    }

    let checkNewBoard = () =>{ 
        if (isNewBoard) {
            contBoardClass = "disabled";
            return (
                <div className="container">
                    <NewBoard createBoard={createBoard} cancelNewBoard={cancelNewBoard}></NewBoard>
                </div>
            )
        }
        else {
            isNewBoard = false;
            contBoardClass = "";
        }
    } 

    let isLoading = () => {
        if (loading) {
            return <Loading text={"Cargando tableros"} /> ;
        }
        else {
            return <BoardList 
            boards={boards} 
            deleteBoard={deleteBoard}
            copyBoard={copyBoard} 
            />;
        }
    }

    let handleOrderTitle = (e) => {
        let type = orderByTitle(e);
        if(type == 1) {
            setActiveDate("text-dark");
            setActiveTitle("text-success");

            setClassOrderTitle(`fas fa-sort-alpha-up-alt mr-2 `);
        }
        else {
            setActiveDate("text-dark");
            setActiveTitle("text-success");

            setClassOrderTitle(`fas fa-sort-alpha-down mr-2 `);
        }

    }

    let handleOrderDate = (e) => {
        let type = orderByDate(e);
        if (type == 1) {
            setActiveTitle("text-dark");
            setActiveDate("text-success");

            setClassOrderDate(`fas fa-sort-up mr-2 `);
        } else {
            setActiveTitle("text-dark");
            setActiveDate("text-success");

            setClassOrderDate(`fas fa-sort-down mr-2 `);
        }

    }
    
    return(
        <React.Fragment>
        <div className="container-home">
            
            <div className="bg-white shadow-sm">
                <WindowHeader 
                maximize={maximize} 
                handleMaximize={handleMaximize} 
                handleMinimize={handleMinimize}
                handleClose={handleClose}
                classColor="text-dark" />
                <div className="container">
                    <div className="container-header-boards row align-items-center justify-content-between mb-1">
                        <Title title="Tableros" classColor="text-dark" />
                        <div className="row align-items-center col-12 col-md-auto">
                                
                                <button
                                onClick={handleOrderTitle}
                                data-tooltip="Ordenar por título" 
                                style={{height: "40px"}} 
                                className="tooltip-bottom btn shadow-sm rounded-pill btn-white text-dark my-2 my-md-0" disabled={isNewBoard}>
                                    <span className={classOrderTitle + activeTitle}></span>
                                    Título
                                </button>
                                <button 
                                onClick={handleOrderDate}
                                data-tooltip="Ordenar por fecha"
                                style={{height: "40px"}} 
                                className="tooltip-bottom btn shadow-sm rounded-pill btn-white text-dark ml-3 my-2 my-md-0" disabled={isNewBoard}>
                                    <span className={classOrderDate + activeDate}></span>
                                    Fecha
                                </button>

                            <div className="mx-3 pl-3 rounded-pill shadow-sm my-2 my-md-0">
                                <input id="txtSearch" onChange={searchBoards} type="text" disabled={isNewBoard} placeholder="Buscar" className="txtSearch bg-white" required/>
                                <span className="fas fa-search iconSearch mr-3 ml-2"></span>
                            </div>
                            <button 
                            className="btn shadow-sm rounded-pill btn-success text-white my-2 my-md-0"
                            disabled={isNewBoard}
                            onClick={handleNewBoard}>
                                <span className="fa fa-plus mr-2"></span>
                                Nuevo tablero
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            
                
            <div className="container-boards">
                {checkNewBoard()}
                <div className={"container " + contBoardClass}>
                    {isLoading()}
                </div>
            </div>
        </div>
            
        </React.Fragment>
    )
}

export default Home;