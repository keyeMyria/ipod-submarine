import React, { Component } from 'react';
import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import './LandingPage.scss';

export default class LandingPage extends Component {

  constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
    }

  usernameChangeHandler = (event) =>  {
    this.setState({
      username: event.target.value
    })
  }

  render() {
    return (
      <div className="login">
        <FormGroup
            label="Join iPod Submarine"
            labelFor="text-input"
            labelInfo="(required)"
        >
            <form onSubmit={() => this.props.onSubmit(this.state.username)} className="form">
                <InputGroup id="text-input" leftIcon="person" placeholder="John Doe" onChange={this.usernameChangeHandler} />
                <Button icon="log-in" text="Join Game" type="submit" />
            </form>
        </FormGroup>
      </div>
    );
  }
}
