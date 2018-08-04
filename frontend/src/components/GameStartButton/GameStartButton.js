import React, { Component } from 'react';
import { Button } from "@blueprintjs/core";
import './GameStartButton.scss';

export default class GameStartButton extends Component {
  render() {
    return (
      <div className="game-start-button">
        <Button
          text="Start Game"
          intent="success"
          onClick={this.props.startGame}
          disabled={this.props.gameHasStarted}
        />
      </div>
    );
  }
}
