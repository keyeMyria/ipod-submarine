import React, { Component } from 'react';
import { H1, Icon } from "@blueprintjs/core";
import './TopLogo.scss';

export default class TopLogo extends Component {
  render() {
    return (
      <div className="top-logo">
        <H1>
          <Icon icon="lightbulb" iconSize={40} />
          <Icon icon="trending-up" iconSize={40} />
          iPod <span>Submarine</span>
        </H1>
      </div>
    );
  }
}
