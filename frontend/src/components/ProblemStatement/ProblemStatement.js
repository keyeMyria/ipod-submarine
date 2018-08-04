import React, { Component } from 'react';
import { H2 } from "@blueprintjs/core";
import './ProblemStatement.scss';

export default class ProblemStatement extends Component {
  render() {
    return (
      <div className="problem-statement">
        <H2>{this.props.problem}</H2>
      </div>
    );
  }
}
