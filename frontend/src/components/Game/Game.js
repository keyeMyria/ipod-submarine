import React, { Component } from 'react';
import GameStatusBar from "../GameStatusBar";
import ConditionalProblemDisplay from "../ConditionalProblemDisplay";
import PlayersList from "../PlayersList";
import SolutionsList from "../SolutionsList";
import './Game.scss';

import WebSocketInstance from '../../services/WebSocket'

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameHasStarted: false,
      players: [],
      solutions: ['.'],
      problem: '',
      alan: '', // alan's username
      roundNumber: 0, // how many rounds have gone by?
      roundHasEnded: false, // is the round still going?
    };
    this.waitForSocketConnection(() => {
      WebSocketInstance.addPlayer(this.props.currentUser);
      WebSocketInstance.addCallbacks({
        'fetch_players': this.setPlayers.bind(this),
        'add_player': this.addPlayer.bind(this),
        'new_problem': this.setProblem.bind(this),
        'new_solution': this.addSolution.bind(this),
        'start_round': this.startRound.bind(this),
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

  // Callbacks
  setProblem(problem, alan) {
    this.setState({ problem: problem, alan: alan});
  }
  addPlayer(player) {
    this.setState({ players: [...this.state.players, player]});
  }
  setPlayers(players) {
    this.setState({ players: players});
  }
  addSolution(solution) {
    this.setState({ solutions: [...this.state.solutions, solution]});
  }

  // Event handlers
  handleSolutionSubmit = (event, solution) => {
    event.preventDefault();
    WebSocketInstance.sendNewSolution(solution, this.props.currentUser, this.state.problem);
  }
  startGame = () => {
    WebSocketInstance.startGame();
  }

  // Other actions
  startRound(problem, alan) {
    this.setState({ gameHasStarted: true});
    this.setState({ roundNumber: this.state.roundNumber+1});
    this.setProblem(problem, alan);
  }

  render() {
    const gameHasStarted = this.state.gameHasStarted;
    return (
      <div className="game">
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
        <PlayersList players={this.state.players}
          currentUser={this.props.currentUser} />
        <SolutionsList solutions={this.state.solutions}
          solutionSubmitted={this.state.solutionSubmitted} />
      </div>
    );
  }
}