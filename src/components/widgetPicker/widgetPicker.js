import React from 'react';
import './widgetPicker.scss';
import appEvents from '../../appEvents.js';

class WidgetPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: []
    };
  }

  render() {
    return (
      <>
        <div className="WidgetPicker">
          <div className="WidgetPickerHeader">Add Widget</div>
          <div
            className="WidgetPickerOption"
            onClick={() => appEvents.onWidgetCreated(this.props.tile, 'clock')}
          >
            <img className="WidgetPickerImage" src="/images/plus.png" />
            <div className="WidgetPickerName">Clock</div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(this.props.tile, 'hourlyEarthquakes')
            }
          >
            <img className="WidgetPickerImage" src="/images/plus.png" />
            <div className="WidgetPickerName">Hourly Earthquakes</div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(this.props.tile, 'strongestEarthquake')
            }
          >
            <img className="WidgetPickerImage" src="/images/plus.png" />
            <div className="WidgetPickerName">Strongest Magnitude</div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(this.props.tile, 'depthCorrelation')
            }
          >
            <img className="WidgetPickerImage" src="/images/plus.png" />
            <div className="WidgetPickerName">Depth Correlation</div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(
                this.props.tile,
                'strongestEarthquakeWeek'
              )
            }
          >
            <img className="WidgetPickerImage" src="/images/plus.png" />
            <div className="WidgetPickerName">Strongest Magnitude (1 week)</div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(this.props.tile, 'depthCorrelationWeek')
            }
          >
            <img className="WidgetPickerImage" src="/images/plus.png" />
            <div className="WidgetPickerName">Depth Correlation (1 week)</div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(
                this.props.tile,
                'strongestEarthquakeMonth'
              )
            }
          >
            <img className="WidgetPickerImage" src="/images/plus.png" />
            <div className="WidgetPickerName">
              Strongest Magnitude (1 month)
            </div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(
                this.props.tile,
                'depthCorrelationMonth'
              )
            }
          >
            <img className="WidgetPickerImage" src="/images/plus.png" />
            <div className="WidgetPickerName">Depth Correlation (1 month)</div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(this.props.tile, 'usPopulation')
            }
          >
            <img className="WidgetPickerImage" src="/images/plus.png" />
            <div className="WidgetPickerName">US Population</div>
          </div>
        </div>
      </>
    );
  }
}

export default WidgetPicker;
