import React, { Component } from 'react';
import { Card, H3 } from "@blueprintjs/core";
import './ConditionalProblemDisplay.scss';
import ProblemStatement from '../ProblemStatement';
import SolutionForm from '../SolutionForm';

export default class ConditionalProblemDisplay extends Component {
  render() {
    const gameHasStarted = this.props.gameHasStarted;
    return (
      <div className="conditional-problem-display">
        {gameHasStarted ?
            <section className="problem-with-solution-form">
                <ProblemStatement problem={this.props.problem} alan={this.props.alan} />
                <SolutionForm currentUser={this.props.currentUser} handleSolutionSubmit={this.props.handleSolutionSubmit} />
            </section>
        :
            <Card className="click-to-begin">
                <H3>Click start game to begin.</H3>
            </Card>
        }
      </div>
    );
  }
}