import React, { Component } from 'react';
import PlayersList from "../PlayersList";
import './Game.scss';

import WebSocketInstance from '../../services/WebSocket'

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {players: []}

    this.waitForSocketConnection(() => {
      WebSocketInstance.initGamePlayer(this.props.currentUser);
      WebSocketInstance.addCallbacks(this.setPlayers.bind(this), this.addPlayer.bind(this))
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

  addPlayer(player) {
    this.setState({ players: [...this.state.players, player]})
  }

  setPlayers(players) {
    this.setState({ players: players})
  }

  render() {
    return (
      <div classname="game">
        <PlayersList players={this.state.players} currentUser={this.props.currentUser} />
      </div>
    );
  }
}
