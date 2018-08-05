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
      problem: '',
      roundNumber: 0,
      roundHasEnded: false,
    };

    this.waitForSocketConnection(() => {
      WebSocketInstance.addPlayer(this.props.currentUser);
      WebSocketInstance.addPlayerCallbacks(this.setPlayers.bind(this), this.addPlayer.bind(this));
      WebSocketInstance.fetchPlayers();
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

  startGame = (event) => {
    this.setState({ gameHasStarted: true});
    this.startRound();
  }
  startRound() {
    this.setState({ roundNumber: this.state.roundNumber+1 });
    WebSocketInstance.addProblemCallback(this.setProblem.bind(this));
    WebSocketInstance.getNewProblem();
  }
  setProblem(problem) {
    this.setState({ problem: problem });
  }

  addPlayer(player) {
    this.setState({ players: [...this.state.players, player]});
  }
  setPlayers(players) {
    this.setState({ players: players});
  }

  handleSolutionSubmit = (solution) => {
    WebSocketInstance.sendNewSolution(solution, this.props.currentUser, this.state.problem);
  }

  render() {
    return (
      <div className="game">
        {/*<SolutionsList solutions={this.state.solutions} />*/}
        <GameStatusBar startGame={this.startGame}
          gameHasStarted={this.state.gameHasStarted}
          playerCount={this.state.players.length}
          roundNumber={this.state.roundNumber} />
        <ProblemStatement problem={this.state.problem} />
        <PlayersList players={this.state.players} currentUser={this.props.currentUser} />
        <SolutionForm currentUser={this.props.currentUser} handleSolutionSubmit={this.handleSolutionSubmit} />
      </div>
    );
  }
}
