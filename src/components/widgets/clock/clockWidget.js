import React from 'react';
import Widget from '../widget.js';
import './clockWidget.scss';

class ClockWidget extends Widget {
  constructor(props) {
    super(props);
    this.state.date = new Date();
    this.internalTimer = setInterval(this.handleNewSecond, 1000);
  }

  handleNewSecond = () => {
    this.setState({ date: new Date() });
  }

  renderWidget() {
    return <div className="ClockContainer">
      <div className="ClockHeader">Clock</div>
      <div className="ClockDate">{this.state.date.toLocaleDateString()}</div>
      <div className="ClockTime">{this.state.date.toLocaleTimeString()}</div>
    </div>;
  }
}

export default ClockWidget;