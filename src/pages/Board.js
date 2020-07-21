import React from 'react';
import WindowHeader from '../components/WindowHeader';
import Title from '../components/Title';
import BoardGrid from '../components/BoardGrid';
import PaletteColor from '../components/PaletteColor';
import ReactTooltip from "react-tooltip";
import Team from '../components/Team';
import swal from 'sweetalert';

export default class Board extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            scoreOp: 0,
            teams: [{
                "idTeam": 1,
                "numberTeam": 1,
                "themeColor": this.props.board.themeColor,
                "score": 0,
                "scoreOp": 0,
            }],
            qIdTeam: "1"
        }
    }
    

    showEditCtrl = () => {
        if(this.props.isGame == false) {
            return (
                <div className="ctrl-grid-boards bg-white text-center px-2 py-1 shadow">
                    <button
                        onClick={this.props.onClickSave}
                        data-tip="Save"
                        className="tooltip-bottom btn rounded-circle btn-circle btn-white text-dark my-md-0">
                        <span className="fa fa-save"></span>
                    </button>
                    <button
                        onClick={this.props.onAddColumn}
                        data-tip="Add column"
                        className="tooltip-bottom btn rounded-circle btn-circle btn-white text-dark my-md-0">
                        <span className="fas fa-columns"></span>
                    </button>
                    <button
                        onClick={this.props.onAddRow}
                        data-tip="Add row"
                        className="tooltip-bottom btn rounded-circle btn-circle btn-white text-dark my-md-0">
                        <span className="far fa-minus-square"></span>
                    </button>
                    <PaletteColor
                        onChangeTheme={this.props.onChangeTheme}
                    />

                </div>
            )
        }
    }

    addTeam = (e) => {
        let teamsArray = this.state.teams;

        teamsArray.push({
            "themeColor": this.props.board.themeColor,
            "score": 0,
            "scoreOp": this.state.scoreOp,
        });

        this.setState({
            teams: teamsArray
        });

    }

    deleteTeam = (idTeam) => {

        swal({
            title: "Would you like to delete the team?",
            icon: "warning",
            buttons: ["No", "Yes"]
        })
        .then((accept) => {
            if(accept) {
                let teams = this.state.teams;

                teams.splice(idTeam, 1);

                this.setState({
                    teams
                });
            }
        });

    }

    setScoreOp = (scoreOp) => {
        this.setState({
            scoreOp: scoreOp
        });
    }
 
    render() {
        return (
            <React.Fragment>
                <div className="page container-home">

                    <div className="shadow-sm" style={{ backgroundColor: `${this.props.board.themeColor}` }}>
                        <WindowHeader
                            classColor="text-white"
                            backButton
                            closeButton
                            minimizeButton
                            maximizeButton
                        />
                        <div className="container-fluid">
                            <div className="container-header-boards row align-items-center pb-1">
                                <Title
                                    title={this.props.board.titleBoard}
                                    readOnly={this.props.isGame}
                                    onChangeTitle={this.props.onChangeTitle}
                                    classColor="text-white text-center col-12" />
                                {this.showEditCtrl()}
                            </div>

                        </div>
                    </div>

                    <div className="container-boards pb-0">
                        <BoardGrid
                            columns={this.props.board.columns}
                            themeColor={this.props.board.themeColor}
                            readOnly={this.props.isGame}
                            onSortColumns={this.props.onSortColumns}
                            onChangeColumnTitle={this.props.onChangeColumnTitle}
                            onChangeCell={this.props.onChangeCell}
                            onChangeQuestion={this.props.onChangeQuestion}
                            setScoreOp={this.setScoreOp}
                            onDeleteColumn={this.props.onDeleteColumn}
                            onDeleteRow={this.props.onDeleteRow}

                        />
                    </div>
                    {
                        this.props.isGame ? 
                            <div className="container-teams text-center py-0">
                                <div id="container-teams" className="d-inline-block">
                                    {
                                        this.state.teams.map((team, index) => (
                                            <Team 
                                            key={index} 
                                            numberTeam={index} 
                                            themeColor={team.themeColor}
                                            score={team.score} 
                                            scoreOp={this.state.scoreOp} 
                                            deleteTeam={this.deleteTeam}
                                            />
                                        ))
                                    }
                                </div>

                                <button 
                                onClick={this.addTeam} 
                                data-tip="Add team" 
                                data-place="right" 
                                className="btn btn-white rounded shadow btnAddTeam mt-2"
                                >
                                    <span className="fas fa-plus mr-2"></span>
                                    <span className="fas fa-users"></span>
                                </button>
                            </div>

                        : ""
                    }

                </div>
                <ReactTooltip place="right" type="dark" effect="solid" />
            </React.Fragment>
        )
    }
    
}
