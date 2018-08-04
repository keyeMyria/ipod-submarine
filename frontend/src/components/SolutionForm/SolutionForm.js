import React, { Component } from 'react';
import { Button, InputGroup } from "@blueprintjs/core";
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
        <h4>Write your solution in two words or less.</h4>
        <form onSubmit={() => this.props.handleSolutionSubmit(this.state.solution)} className="form">
            <InputGroup id="text-input" leftIcon="edit" placeholder="Spicy Cheetos" onChange={this.solutionChangeHandler} />
            <Button icon="enter" text="Submit Solution" type="submit" />
        </form>
      </div>
    );
  }
}