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
            <img className="WidgetPickerImage" src="/images/clockIcon.png" />
            <div className="WidgetPickerName">Clock</div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(this.props.tile, 'hourlyEarthquakes')
            }
          >
            <img className="WidgetPickerImage" src="/images/lineChart.png" />
            <div className="WidgetPickerName">Hourly Earthquakes</div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(this.props.tile, 'strongestEarthquake')
            }
          >
            <img className="WidgetPickerImage" src="/images/gaugeIcon.png" />
            <div className="WidgetPickerName">
              Earthquake Strongest Magnitude <br />
              (Last 24h)
            </div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(this.props.tile, 'depthCorrelation')
            }
          >
            <img className="WidgetPickerImage" src="/images/scatterIcon.png" />
            <div className="WidgetPickerName">
              Eathquake Depth Correlation
              <br />
              (Last 24h)
            </div>
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
            <img className="WidgetPickerImage" src="/images/gaugeIcon.png" />
            <div className="WidgetPickerName">
              Earthquake Strongest Magnitude
              <br />
              (1 week)
            </div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(this.props.tile, 'depthCorrelationWeek')
            }
          >
            <img className="WidgetPickerImage" src="/images/scatterIcon.png" />
            <div className="WidgetPickerName">
              Earthquake Depth Correlation
              <br />
              (1 week)
            </div>
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
            <img className="WidgetPickerImage" src="/images/gaugeIcon.png" />
            <div className="WidgetPickerName">
              Earthquake Strongest Magnitude
              <br />
              (1 month)
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
            <img className="WidgetPickerImage" src="/images/scatterIcon.png" />
            <div className="WidgetPickerName">
              Earthquake Depth Correlation
              <br />
              (1 month)
            </div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(this.props.tile, 'usPopulation')
            }
          >
            <img
              className="WidgetPickerImage"
              src="/images/populationIcon.png"
            />
            <div className="WidgetPickerName">US Population</div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(this.props.tile, 'cityWeather')
            }
          >
            <img
              className="WidgetPickerImage"
              src="/images/lineChartDoubleLine.png"
            />
            <div className="WidgetPickerName">Weather by City</div>
          </div>
          <div
            className="WidgetPickerOption"
            onClick={() =>
              appEvents.onWidgetCreated(this.props.tile, 'volcanoesByRegion')
            }
          >
            <img className="WidgetPickerImage" src="/images/pieIcon.png" />
            <div className="WidgetPickerName">Volcanoes by Region</div>
          </div>
        </div>
      </>
    );
  }
}

export default WidgetPicker;
