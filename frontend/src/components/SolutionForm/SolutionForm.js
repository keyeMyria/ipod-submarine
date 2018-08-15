import React, { Component } from 'react';
import { Button, InputGroup, H4 } from "@blueprintjs/core";
import './SolutionForm.scss';

export default class SolutionForm extends Component {

  constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
    }

  solutionChangeHandler = (event) =>  {
    this.setState({
      solution: event.target.value
    })
  }

  render() {
    return (
      <div className="solution-form">
        <H4>Write your solution in two words or less.</H4>
        <form onSubmit={(event) => this.props.handleSolutionSubmit(event, this.state.solution)} className="form">
            <InputGroup id="text-input" leftIcon="edit" placeholder="Spicy Cheetos" onChange={this.solutionChangeHandler} />
            <Button icon="enter" text="Submit Solution" type="submit" />
        </form>
      </div>
    );
  }
}