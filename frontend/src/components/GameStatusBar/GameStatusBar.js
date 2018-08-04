import React, { Component } from 'react';
import GameStartButton from '../GameStartButton';
import { Card, Elevation } from "@blueprintjs/core";
import './GameStatusBar.scss';

export default class GameStatusbar extends Component {
  render() {
    return (
      <div className="game-status-bar">
        <Card elevation={Elevation.FOUR}>
          <GameStartButton startGame={this.props.startGame} gameHasStarted={this.props.gameHasStarted} />
          <article className="game-status-bar-information">
            <span className="player-count">{this.props.playerCount} players</span>
            <span className="round-number">Round #{this.props.roundNumber}</span>
          </article>
        </Card>
      </div>
    );
  }
}
