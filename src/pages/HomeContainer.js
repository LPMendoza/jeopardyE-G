import React from 'react';
import Home from './Home';
import swal from 'sweetalert';

export default class HomeContainer extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            boards: [],
            boardsAux: [],
            loading: true,
            orderByTitle: 1,
            orderByDate: 1
        }

        this.boardCtrl = this.props.boardCtrl;
    }

    showLoading() {
        this.setState({
            loading: true
        })
    }

    hideLoading() {
        this.setState({
            loading: false
        })
    }

    createBoard = (newBoard) => {
        this.boardCtrl.createBoard(newBoard, 1);
        this.getBoards();
    }

    copyBoard = (e) => {
        let index = e.target.id;
        swal({
            title: `¿Desea realizar una copia del tablero "${this.state.boardsAux[e.target.id].titleBoard}"?`,
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"]
        })
        .then((accept) => {

            if (accept) {
                this.showLoading();
                this.boardCtrl.boards = this.state.boardsAux;
                this.boardCtrl.copyBoard(index);
                this.getBoards();
            }

        })
    }

    deleteBoard = (e) => {
        let index = e.target.id;
        swal({
            title: `¿Desea eliminar el tablero "${this.state.boardsAux[e.target.id].titleBoard}"?`,
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"]
        })
        .then((accept) => {
            if(accept) {
                this.showLoading();
                this.boardCtrl.boards = this.state.boardsAux;
                this.boardCtrl.deleteBoard(index);
                this.getBoards();

            }
        })
    }

    orderByTitle = (e) => {
        let orderedBoards = [];
        if(this.state.orderByTitle == 1) {
            this.boardCtrl.boards = this.state.boardsAux;
            orderedBoards = this.boardCtrl.orderByTitle(2);

            this.setState({
                orderByTitle: 2,
                boardsAux: orderedBoards
            })
        }
        else {
            this.boardCtrl.boards = this.state.boardsAux;
            orderedBoards = this.boardCtrl.orderByTitle(1);

            this.setState({
                orderByTitle: 1,
                boardsAux: orderedBoards
            })
        }

        return this.state.orderByTitle;
    }

    orderByDate = (e) => {
        let orderedBoards = [];
        if (this.state.orderByDate == 1) {
            this.boardCtrl.boards = this.state.boardsAux;
            orderedBoards = this.boardCtrl.orderByDate(2);
            this.setState({
                boardsAux: orderedBoards,
                orderByDate: 2,
            })
        } else {
            this.boardCtrl.boards = this.state.boardsAux;
            orderedBoards = this.boardCtrl.orderByDate(1);
            this.setState({
                boardsAux: orderedBoards,
                orderByDate: 1,
            })
        }
        return this.state.orderByDate;
    }
 
    getBoards() {

        this.showLoading();
        let boards = this.boardCtrl.getBoards();
        if (this.validateError(boards)) {
            this.setState({
                boards: boards,
                boardsAux: boards
            });
        }
        document.getElementById("txtSearch").value = "";
        this.hideLoading();

    }

    validateError(object) {
        if (object.error) {
            swal({
                title: "Hubo un error, intente más tarde",
                icon: "error",
                buttons: "Aceptar"
            });
            return false;
        }
        return true;
    }

    searchBoards = (e) => {
        let text = e.target.value;
        text = text.toLowerCase();
        if(text != "") {
            let boardsFound = this.state.boardsAux.map((board) => {
                if (board.titleBoard.toLowerCase().includes(text) == true ||
                board.dateModified.includes(text) == true) {
                    return board;
                }
            });
            boardsFound = boardsFound.filter((el) => {
                return el != undefined
            });

            this.setState({
                boardsAux: boardsFound
            })

        }
        else {
            this.setState({
                boardsAux: this.state.boards
            })

        }
    }


    componentDidMount() {
        this.setState({
            orderByDate: 1
        })
        this.getBoards();
    }

    render() {
        const {boardsAux, maximize, loading} = this.state;
        return (
            
            <Home 
            boards={boardsAux}
            createBoard={this.createBoard}
            deleteBoard={this.deleteBoard}
            copyBoard={this.copyBoard}
            searchBoards={this.searchBoards}
            orderByTitle={this.orderByTitle}
            orderByDate={this.orderByDate}
            setBoard={this.props.setBoard}
            setIsGame={this.props.setIsGame}
            boardCtrl={this.boardCtrl}
            loading={loading}
            />
        )
    }
}
    