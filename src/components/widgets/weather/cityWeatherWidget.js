import React from 'react';
import Widget from '../widget.js';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import HighchartsMore from 'highcharts/highcharts-more';
import { When } from '../../conditionals.js';
import appEvents from '../../../appEvents.js';
import $ from 'jquery';
import '../../dark-unica.scss';
import './cityWeatherWidget.scss';

class CityWeather extends Widget {
  constructor(props) {
    super(props);
    this.state.date = new Date();
    this.state.geoData = [];
    this.state.tempHighWeather = null;
    this.state.tempLowWeather = null;
    this.state.timeWeather = null;
  }

  handleNewSecond = () => {
    this.setState({ date: new Date() });
  };

  fetchWeatherData(latlong) {
    $.ajax({
      url: `${process.env.REACT_APP_API_URL}api/fetchWeatherHighLow?lat=${latlong[0]}&long=${latlong[1]}`
    }).done(result => {
      const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const tempHigh = [];
      const tempLow = [];
      const time = [];
      result.forEach(day => {
        tempHigh.push(day.temperatureHigh);
        tempLow.push(day.temperatureLow);
        const date = new Date();
        date.setTime(day.time * 1000);
        time.push(weekDays[date.getDay()]);
      });

      // 1. we need to setState inside the callback.. not outside.
      // This code here runs 1 seconds AFTER the outside runs.
      // if we put the setState outside then it will set empty
      // arrays into the state..not exactly correct
      this.setState({
        tempHighWeather: tempHigh,
        tempLowWeather: tempLow,
        timeWeather: time,
        isLoading: false
      });
    });
  }

  fetchGeoData(city) {
    $.ajax({
      url: `${process.env.REACT_APP_API_URL}api/fetchLatLong?city=${city}`
    }).done(result => {
      // console.log('This is the result of fetch geo data', result);
      const newConfig = Object.assign({}, this.props.config);
      newConfig.latlong = result;
      appEvents.onUpdateWidgetConfig(newConfig);
      // console.log('config data', this.props.config);
      this.fetchWeatherData(result);
    });
  }

  getOptions = () => {
    return {
      chart: {
        type: 'line',
        width: this.getTileWidth(),
        height: this.getTileHeight(),
        styledMode: true
      },
      title: {
        text: `DAILY TEMPERATURE: ${this.props.config.city}`,
        style: { fontColor: 'white' }
      },
      xAxis: {
        categories: this.state.timeWeather
      },
      yAxis: {
        title: {
          text: 'Temperature (°F)'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [
        {
          name: 'High',
          data: this.state.tempHighWeather
        },
        {
          name: 'Low',
          data: this.state.tempLowWeather
        }
      ],
      credits: {
        enabled: false
      }
    };
  };

  renderWidget() {
    const { config } = this.props;
    const options = this.getOptions();

    if (config.city !== undefined && config.latlong === undefined) {
      this.fetchGeoData(config.city);
      return <div>Fetching Geodata for {config.city}</div>;
    }
    if (
      config.city !== undefined &&
      config.latlong !== undefined &&
      this.state.tempHighWeather === null
    ) {
      // console.log('weather data');
      this.fetchWeatherData(config.latlong);
      return <div>Fetching weather data for {config.city}</div>;
    }

    return (
      <div className="CityWeather">
        <When condition={this.state.isHover}>
          <div
            onMouseDown={() => {
              appEvents.onWidgetTextInput(
                this.props.tile.props.id,
                'city',
                'Enter a City'
              );
            }}
            className="WidgetSettings"
          >
            &#9776;
          </div>
        </When>
        <When condition={config.city === undefined}>No city selected</When>
        <When condition={config.city !== undefined}>
          <div className="CityWeather">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </When>
      </div>
    );
  }
}

export default CityWeather;
