import basePath from '../config';
const fs  = window.require('fs') ;

export default class BoardController {
    constructor() {
        this.boards = [];
        this.pathBoards = basePath + "/boards/";
        this.typeOrder = 1;
        this.isOrderAsc = 1;
    }

    getBoards() {
        try {
            let boardFiles = fs.readdirSync(this.pathBoards);
            this.boards = boardFiles.map((file) => {

                let jsonBoard = fs.readFileSync(this.pathBoards + file);
                return JSON.parse(jsonBoard);

            })
            if(this.typeOrder == 1) {
                this.orderByTitle(this.isOrderAsc);
            }
            else {
                this.orderByDate(this.isOrderAsc);
            }

            return this.boards;
            
        } catch (error) {
            if(error.code == 'ENOENT') {
                fs.mkdirSync(this.pathBoards);
                this.boards = [];
                return this.boards;
            }
            return {"error": true}
        }
    }

    createDate() {

        let date = new Date();
        let dateNow = Date.now();

        let day = date.getDate(dateNow) < 10 ? ("0" + date.getDate(dateNow)) : date.getDate(dateNow);
        let month = (parseInt(date.getMonth(dateNow))) < 10 ? ("0" + (parseInt(date.getMonth(dateNow)) + 1)) : (parseInt(date.getMonth(dateNow)) + 1);
        let year = date.getFullYear(dateNow);

        let hour = date.getHours(dateNow) < 10 ? ("0" + date.getHours(dateNow)) : date.getHours(dateNow);
        let minutes = date.getMinutes(dateNow) < 10 ? ("0" + date.getMinutes(dateNow)) : date.getMinutes(dateNow);
        let seconds = date.getSeconds(dateNow) < 10 ? ("0" + date.getSeconds(dateNow)) : date.getSeconds(dateNow);

        return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
    }
    crearBoardJSON(board) {

        board["dateModified"] = this.createDate();
        board["columns"] = [{
            "titleColumn": "Columna 1",
            "questions": [{
                "text": "",
                "answer": ""
            }, {
                "text": "",
                "answer": ""
            }, {
                "text": "",
                "answer": "Respuesta"
            }, {
                "text": "",
                "answer": "Respuesta"
            }, {
                "text": "",
                "answer": "Respuesta"
            }]
        }]

        board["idBoard"] = this.createIdBoard();

        return board;
    }

    sortNumber(a, b) {
        return a - b;
    }

    createIdBoard() {
        let idBoard = 1;
        if(this.boards.length > 0) {
            let ids = this.boards.map((board) => {
                return board["idBoard"];
            })
            let orderedIds = ids.sort(this.sortNumber)
            idBoard = orderedIds[orderedIds.length - 1] + 1;
        }
        return idBoard;
    }

    createBoard(board, type) {

        if(type == 1) {
            board = this.crearBoardJSON(board);
        }

        fs.writeFileSync(this.pathBoards + `${board.idBoard}`, JSON.stringify(board));
        return board;
    }

    copyBoard(index) {

        let board = this.boards[index];
        let newId = this.createIdBoard();

        board["dateModified"] = this.createDate();

        board.idBoard = newId;
        board.titleBoard = board.titleBoard + "-copy";

        this.createBoard(board, 2);
        return board;
        
    }
    
    deleteBoard(index) {
        let board = this.boards[index];
        fs.unlinkSync(this.pathBoards + `${board.idBoard}`);
        this.boards.splice(index, 1);
        return this.boards;
    }

    orderByTitle(type) {
        this.typeOrder = 1;
        this.isOrderAsc = type;
        if(type == 1) {
            this.boards.sort((a, b) => (a.titleBoard.toLowerCase() > b.titleBoard.toLowerCase()) ? 1 : -1);
        }
        else {
            this.boards.sort((a, b) => (b.titleBoard.toLowerCase() > a.titleBoard.toLowerCase()) ? 1 : -1);
        }
        return this.boards;
    }

    orderByDate(type) {
        this.typeOrder = 2;
        this.isOrderAsc = type;

        if (type == 1) {
            this.boards.sort((a, b) => {
                let bD = b.dateModified.split(" ")[0].split("/")[2] 
                + "-" + b.dateModified.split(" ")[0].split("/")[1]
                + "-" + b.dateModified.split(" ")[0].split("/")[0]
                + " " + b.dateModified.split(" ")[1]

                let aD = a.dateModified.split(" ")[0].split("/")[2]
                    + "-" + a.dateModified.split(" ")[0].split("/")[1]
                    + "-" + a.dateModified.split(" ")[0].split("/")[0]
                    + " " + a.dateModified.split(" ")[1]
                return (new Date(bD) - new Date(aD))
            });
        } else {
            this.boards.sort((a, b) => {
                let bD = b.dateModified.split(" ")[0].split("/")[2]
                    + "-" + b.dateModified.split(" ")[0].split("/")[1]
                    + "-" + b.dateModified.split(" ")[0].split("/")[0]
                    + " " + b.dateModified.split(" ")[1]

                let aD = a.dateModified.split(" ")[0].split("/")[2] 
                    + "-" + a.dateModified.split(" ")[0].split("/")[1]
                    + "-" + a.dateModified.split(" ")[0].split("/")[0]
                    + " " + a.dateModified.split(" ")[1]


                return (new Date(aD) - new Date(bD))
            });
        }
        return this.boards;
    }

}