import React, { Component } from 'react';
import { Card } from "@blueprintjs/core";

export default class PlayersList extends Component {
  
  renderPlayers = (players) => {
    return players.map((player, i) =>
        <Card key={i}>
            <p>{player.username}</p>
        </Card>
    );
  }

  render() {
    const players = this.props.players;
    return (
      <div classname="players">
        <h1>You are {this.props.currentUser}</h1>
        {this.renderPlayers(players)}
      </div>
    );
  }
}