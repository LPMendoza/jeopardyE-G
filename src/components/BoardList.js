import React from 'react';
import BoardCard from '../components/BoardCard';
import NoBoards from '../components/NoBoards';

const BoardList = ({boards, deleteBoard, copyBoard}) => {
    if(boards.length == 0) 
        return <NoBoards/>;

    let dom = boards.map((board, index) => {
        return <BoardCard
        key={board.idBoard} 
        index={index}
        titleBoard={board.titleBoard} 
        themeColor={board.themeColor}
        dateModified={board.dateModified}
        deleteBoard={deleteBoard}
        copyBoard={copyBoard}
        ></BoardCard>
    })

    return dom;
}

export default BoardList;
