import React, { Component } from 'react';
import { Button, InputGroup } from "@blueprintjs/core";
import './SolutionForm.scss';
import WebSocketInstance from '../../services/WebSocket'

export default class SolutionForm extends Component {

  constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
      //WebSocketInstance.addCallbacks(this.addSolution.bind(this))
    }

  solutionChangeHandler = (event) =>  {
    this.setState({
      solution: event.target.value
    })
  }

  handleSolutionSubmit = (solution) => {
    WebSocketInstance.newSolution(solution, this.props.currentUser, "help");
  }

  render() {
    return (
      <div className="solution-form">
        <h4>Write your solution in two words or less.</h4>
        <form onSubmit={() => this.handleSolutionSubmit(this.state.solution)} className="form">
            <InputGroup id="text-input" leftIcon="edit" placeholder="Spicy Cheetos" onChange={this.solutionChangeHandler} />
            <Button icon="enter" text="Submit Solution" type="submit" />
        </form>
      </div>
    );
  }
}