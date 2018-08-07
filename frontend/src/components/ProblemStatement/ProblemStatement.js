import React, { Component } from 'react';
import { Card, H3, Icon } from "@blueprintjs/core";
import './ProblemStatement.scss';

export default class ProblemStatement extends Component {
  render() {
    const userIsAlan = this.props.alan === this.props.currentUser;
    return (
      <div className="problem-statement">
        <Card>
            <H3>
                <Icon icon="hand-right" iconSize={25} />
                <span className="problem-urgent-label"> URGENT:</span>
                {userIsAlan ? <span className="problem-text"> {this.props.problem}</span>
                :
                <span> You are Alan.</span>
                }
            </H3>
        </Card>
      </div>
    );
  }
}
