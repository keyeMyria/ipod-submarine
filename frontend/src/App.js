import React, { Component } from 'react';
import './App.css';
import InitGame from './components/InitGame'
import Game from './components/Game'
import WebSocketInstance from './services/WebSocket'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      loggedIn: false
    };
  }

  handleLoginSubmit = (username) => {
    this.setState({ loggedIn: true, username: username });
    WebSocketInstance.connect();
  }

  render() {
    const { 
      loggedIn,
      username
    } = this.state;

    return (
      <div className="App">
        { 
          loggedIn ?
          <Game
            currentUser={username}
          />
          :
          <InitGame
            onSubmit={this.handleLoginSubmit}
            usernameChangeHandler={this.usernameChangeHandler}
          />
        }
      </div>
    );
  }
}
