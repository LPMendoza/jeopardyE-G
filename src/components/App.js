import React, {useState} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import HomeContainer from '../pages/HomeContainer';
import BoardContainer from '../pages/BoardContainer';

import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/js/bootstrap.js';
import '../assets/fontawesome/css/all.css'
import '../assets/styles/app.css';
//import 'css-tooltip/dist/css-tooltip.min.css';

import BoardController from '../controllers/BoardController';
let boardCtrl = new BoardController();

function App() {
  const [board, setBoard] = useState([]);
  const [isGame, setIsGame] = useState(false);
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <HomeContainer boardCtrl={boardCtrl} setBoard={setBoard} setIsGame={setIsGame} />
        </Route>
        <Route exact path="/board" >
          <BoardContainer boardCtrl={boardCtrl} board={board} isGame={isGame}/>
        </Route>
        <Route/>
      </Switch>
    </HashRouter>
  );
}

export default App;