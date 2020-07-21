import React from 'react';
import Board from './Board';
import Loading from '../components/Loading';
import swal from 'sweetalert';

export default class BoardContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            board: this.props.board,
            loading: true
        }
        this.boardCtrl = this.props.boardCtrl;
        this.interval = 0;
        this.timeInterval = 300000;
        this.sortable = null;
    }

    onChangeTitle = (e) => {
        let board = this.state.board;
        board.titleBoard = e.target.value;

        this.setState({
            board
        });
    }

    onChangeColumnTitle = (e) => {
        let board = this.state.board;
        board.columns[e.target.id.split("-")[1]].titleColumn = e.target.value;

        this.setState({
            board
        });
    }

    onChangeCell = (e) => {
        let board = this.state.board;
        board.columns[e.target.id.split("-")[1]].questions[e.target.id.split("-")[2]].value = e.target.value;
        this.setState({
            board
        });
    }

    onChangeQuestion = (index, indexQuestion, question) => {
        let board = this.state.board;
        board.columns[index].questions[indexQuestion] = question;
        this.setState({
            board
        });

    }

    onAddColumn = (e) => {
        let column = this.boardCtrl.addColumn(this.state.board.columns[0].questions.length);
        let board = this.state.board;
        board.columns.push(column);

        this.setState({
            board
        });
    }

    onSortColumns = (columns) => {
        let board = this.state.board;
        board.columns = columns;

        this.setState({
            board
        });
    }

    onDeleteColumn = (index) => {
        swal({
            title: "Would you like to delete the column?",
            icon: "warning",
            buttons: ["No", "Yes"]
        })
        .then((accept) => {
            if(accept) {
                let columns = this.state.board.columns;
                let board = this.state.board;

                columns.splice(index, 1);

                board.columns = columns;

                this.setState({
                    board
                });

            }
        });
        
    }

    onAddRow = (e) => {
        let newColumns = this.boardCtrl.addRow(this.state.board.columns);
        let board = this.state.board;
        board.columns = newColumns;

        this.setState({
            board
        });
    }

    onChangeTheme = (color) => {
        let board = this.state.board;
        board.themeColor = color;

        this.setState({
            board
        });
    }

    saveBoard = () => {
        this.boardCtrl.updateBoard(this.state.board);
    }

    onClickSave = (e) => {
        this.showLoading();
        this.saveBoard();
        window.location.hash = "/";
        this.hideLoading();

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

    componentDidMount() {
        this.hideLoading();

        if(!this.props.isGame) {
            this.interval = setInterval((h) => {
                this.saveBoard();
            }, this.timeInterval);

        }


    }

    componentWillUnmount() {
        if (this.props.isGame) {
            clearInterval(this.interval);
        }
    }

    render() {
        const {board, loading} = this.state;
        const {isGame} = this.props;

        if (loading) {
            return <Loading/>
        }

        return(
            <Board 
            board={board} 
            isGame={isGame} 
            onChangeTitle={this.onChangeTitle}
            onSortColumns={this.onSortColumns}
            onChangeColumnTitle={this.onChangeColumnTitle}
            onChangeCell={this.onChangeCell}
            onChangeTheme={this.onChangeTheme}
            onAddColumn={this.onAddColumn}
            onAddRow={this.onAddRow}
            onClickSave={this.onClickSave}
            onChangeQuestion={this.onChangeQuestion}
            onDeleteColumn={this.onDeleteColumn}
            />
        )
    }
}
