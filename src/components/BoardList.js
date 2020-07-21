import React from 'react';
import BoardCard from '../components/BoardCard';
import NoBoards from '../components/NoBoards';

const BoardList = ({
    boards, 
    deleteBoard, 
    editBoard,
    copyBoard, 
    setBoard, 
    setIsGame
}) => {
    if(boards.length == 0) 
        return <NoBoards/>;

    let dom = boards.map((board, index) => {
        return <BoardCard
        key={board.idBoard} 
        index={index}
        board={board}
        deleteBoard={deleteBoard}
        editBoard={editBoard}
        copyBoard={copyBoard}
        setBoard={setBoard}
        setIsGame={setIsGame}
        ></BoardCard>
    })

    return dom;
}

export default BoardList;
