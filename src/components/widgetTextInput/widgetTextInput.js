import React from 'react';
import './widgetTextInput.scss';
import appEvents from '../../appEvents.js';

class WidgetPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: []
    };
  }

  handleGetGeoData = () => {
    //TODO: make this configurable
    $.ajax({
      url: 'http://localhost:3333/api/getGeoData'
    }).done(result => {
      this.setState({ series: result.series, isLoading: false });
    });
  };

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      appEvents.onTextInputEntered(e.target.value);
      console.log('this is e.target.value', e.target.value);
    }
  };

  render() {
    return (
      <>
        <div className="WidgetTextInput">
          <div className="WidgetInputTextHeader">{this.props.title}</div>
          <div className="WidgetInputTextBox">
            <input type="text" onKeyDown={this.handleKeyDown} />
          </div>
        </div>
      </>
    );
  }
}

export default WidgetPicker;
