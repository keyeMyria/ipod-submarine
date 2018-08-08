import React, { Component } from 'react';
import GameStatusBar from "../GameStatusBar";
import ConditionalProblemDisplay from "../ConditionalProblemDisplay";
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
      alan: '',
      roundNumber: 0,
      roundHasEnded: false,
    };
    this.waitForSocketConnection(() => {
      WebSocketInstance.addPlayer(this.props.currentUser);
      WebSocketInstance.addCallbacks({
        'fetch_players': this.setPlayers.bind(this),
        'add_player': this.addPlayer.bind(this),
        'new_problem': this.setProblem.bind(this)
      });
      WebSocketInstance.fetchPlayers();
    });
  }
  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(
      function () {
        if (WebSocketInstance.state() === 1) { // Check if websocket state is OPEN
          //console.log("Connection is made")
          callback();
          return;
        } else {
          component.waitForSocketConnection(callback);
        }
    }, 100); // wait 100 milisecond for the connection...
  }

  startGame = (event) => {
    this.setState({ gameHasStarted: true});
    this.startRound();
  }
  startRound() {
    this.setState({ roundNumber: this.state.roundNumber+1});
    WebSocketInstance.getNewProblem();
  }
  setProblem(problem, alan) {
    this.setState({ problem: problem, alan: alan});
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
    const gameHasStarted = this.state.gameHasStarted;
    return (
      <div className="game">
        {/*<SolutionsList solutions={this.state.solutions} />*/}
        <GameStatusBar startGame={this.startGame}
          gameHasStarted={gameHasStarted}
          playerCount={this.state.players.length}
          roundNumber={this.state.roundNumber} />
        <ConditionalProblemDisplay
          gameHasStarted = {gameHasStarted}
          problem={this.state.problem}
          alan={this.state.alan}
          currentUser={this.props.currentUser}
          handleSolutionSubmit={this.handleSolutionSubmit} />
        <PlayersList players={this.state.players} currentUser={this.props.currentUser} />
      </div>
    );
  }
}