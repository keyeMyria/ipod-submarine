import React, { Component } from 'react';
import './App.scss';
import TopLogo from './components/TopLogo'
import LandingPage from './components/LandingPage'
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
        <TopLogo />
        { 
          loggedIn ?
          <Game
            currentUser={username}
          />
          :
          <LandingPage
            onSubmit={this.handleLoginSubmit}
            usernameChangeHandler={this.usernameChangeHandler}
          />
        }
      </div>
    );
  }
}
