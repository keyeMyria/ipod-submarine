import React, { Component } from 'react';
import { Card, H4, Tag } from "@blueprintjs/core";
import './PlayersList.scss';

export default class PlayersList extends Component {
  
  renderPlayers = (players) => {
    return players.map((player, i) =>
        <Card key={i}>
            <p>{player.username}</p>
            <Tag>Points: {player.points}</Tag>
        </Card>
    );
  }

  render() {
    const players = this.props.players;
    return (
      <div className="players-list">
        <div className="player-name">
          <H4>Hello, {this.props.currentUser}</H4>
        </div>
        <div className="players-container">
          {this.renderPlayers(players)}
        </div>
      </div>
    );
  }
}