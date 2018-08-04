import React, { Component } from 'react';
import GameStatusBar from "../GameStatusBar";
import ProblemStatement from "../ProblemStatement";
import SolutionForm from "../SolutionForm";
import PlayersList from "../PlayersList";
import './Game.scss';

import WebSocketInstance from '../../services/WebSocket'

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameHasStarted: false,
      players: [],
      solutions: [],
      problem: "this is my problem"
    };

    this.waitForSocketConnection(() => {
      WebSocketInstance.initGamePlayer(this.props.currentUser);
      WebSocketInstance.addCallbacks(this.setPlayers.bind(this), this.addPlayer.bind(this));
      WebSocketInstance.fetchPlayers();
      //WebSocketInstance.addCallbacks(this.setSolutions.bind(this), this.addSolution.bind(this));
    });
  }
  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(
      function () {
        // Check if websocket state is OPEN
        if (WebSocketInstance.state() === 1) {
          console.log("Connection is made")
          callback();
          return;
        } else {
          console.log("wait for connection...")
          component.waitForSocketConnection(callback);
        }
    }, 100); // wait 100 milisecond for the connection...
  }

  addPlayer(player) {
    this.setState({ players: [...this.state.players, player]})
  }
  setPlayers(players) {
    this.setState({ players: players})
  }

  /*addSolution(solution) {
    this.setState({ solutions: [...this.state.solutions, solution]})
  }
  setSolutions(solutions) {
    this.setState({ solutions: solutions})
  }*/
  handleSolutionSubmit = (solution) => {
    WebSocketInstance.newSolution(solution, this.props.currentUser, this.state.problem);
  }

  startGame = (event) => {
    this.setState({ gameHasStarted: true});
    console.log('hey');
    // get problem
    // problem has whoever alan is
  }

  render() {
    return (
      <div classname="game">
        {/*<SolutionsList solutions={this.state.solutions} />*/}
        <GameStatusBar startGame={this.startGame} gameHasStarted={this.state.gameHasStarted} />
        <ProblemStatement problem={this.state.problem} />
        <PlayersList players={this.state.players} currentUser={this.props.currentUser} />
        <SolutionForm currentUser={this.props.currentUser} handleSolutionSubmit={this.handleSolutionSubmit} />
      </div>
    );
  }
}
