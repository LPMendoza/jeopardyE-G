import React, {useState} from 'react';

const Team = ({numberTeam, themeColor, score, scoreOp, deleteTeam}) => {

    const [scoreTeam, setScoreTeam] = useState(score);

    let handlePlus = (e) => {
        setScoreTeam(parseFloat(scoreTeam) + parseFloat(scoreOp));
    }

    let handleLess = (e) => {
        setScoreTeam(scoreTeam - scoreOp);
    }

    let handleDeleteTeam = (e) => {
        deleteTeam(numberTeam);
    }

    return(
        <div className="row card-team bg-white shadow mx-2 mt-2 pb-2">
            <div className="titleTeam py-0 pl-2">
                <label className="text-dark team-name text-left d-inline-block pt-1">{`Team ${numberTeam + 1}`}</label>
                <button onClick={handleDeleteTeam} className="btnDeleteTeam btn btn-white text-center d-inline-block">
                    <span className="fas fa-times"></span>
                </button>
            </div>
            <label className="col-12 team-score"
                style={{
                    color: themeColor || "#393e46"
                }}>{scoreTeam}</label>
            <div className="col-12 px-0">
                <button onClick={handlePlus} className="btn btn-white text-center col-auto">
                    <span className="fas fa-plus"></span>
                </button>
                <button onClick={handleLess} className="btn btn-white text-center col-auto">
                    <span className="fas fa-minus"></span>
                </button>
            </div>

        </div>
    )

}

export default Team;
