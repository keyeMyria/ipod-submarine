import React, { Component } from 'react';
import { Card } from "@blueprintjs/core";
import './SolutionsList.scss';

export default class SolutionsList extends Component {
  
  renderSolutions = (solutions) => {
    return solutions.map((solution, i) =>
        <Card key={i}>
            <p>{solution}</p>
        </Card>
    );
  }

  render() {
    const solutions = this.props.solutions;
    return (
      <div className="solutions-list">
        {this.renderSolutions(solutions)}
      </div>
    );
  }
}