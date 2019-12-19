import React from 'react';
import './widgetTextInput.scss';
import appEvents from '../../appEvents.js';
import $ from 'jquery';

class WidgetPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoData: []
    };
  }

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      appEvents.onTextInputEntered(e.target.value);
      // fetchGeoData(e.target.value);
    }
  };

  render() {
    return (
      <>
        <div className="WidgetTextInput">
          <div className="WidgetInputTextHeader">{this.props.title}</div>
          <div className="WidgetInputTextBox">
            <input
              type="text"
              ref={el => {
                if (el) {
                  el.focus();
                }
              }}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </div>
      </>
    );
  }
}

export default WidgetPicker;
