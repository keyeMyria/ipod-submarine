import React, { Component } from 'react';
import { Card } from "@blueprintjs/core";
import './PlayersList.scss';

export default class PlayersList extends Component {
  
  renderPlayers = (players) => {
    return players.map((player, i) =>
        <Card key={i}>
            <p>{player.username}</p>
            <span>{player.points}</span>
        </Card>
    );
  }

  render() {
    const players = this.props.players;
    return (
      <div className="players-list">
        <div className="player-name">Hello, <b>{this.props.currentUser}</b></div>
        <div className="players-container">
          {this.renderPlayers(players)}
        </div>
      </div>
    );
  }
}