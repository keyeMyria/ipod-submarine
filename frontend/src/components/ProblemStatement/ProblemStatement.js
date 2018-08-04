import React, { Component } from 'react';
import { Card, H3, Icon } from "@blueprintjs/core";
import './ProblemStatement.scss';

export default class ProblemStatement extends Component {
  render() {
    return (
      <div className="problem-statement">
        <Card>
            <H3>
                <Icon icon="hand-right" iconSize={25} />
                <span className="problem-urgent-label"> URGENT:</span>
                <span className="problem-text"> {this.props.problem}</span>
            </H3>
        </Card>
      </div>
    );
  }
}
