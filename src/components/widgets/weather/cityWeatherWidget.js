import React from 'react';
import Widget from '../widget.js';
import { When } from '../../conditionals.js';
import appEvents from '../../../appEvents.js';
import $ from 'jquery';
import './cityWeatherWidget.scss';

class CityWeather extends Widget {
  constructor(props) {
    super(props);
    this.state.date = new Date();
    this.state.geoData = [];
    this.state.weatherData = [];
  }

  handleNewSecond = () => {
    this.setState({ date: new Date() });
  };

  fetchWeatherData(latlong){
    $.ajax({
      url: `http://localhost:3333/api/fetchWeatherHighLow?lat=${latlong[0]}&long=${latlong[1]}`
    }).done(result => {
      this.setState({
        weatherData: result,
        isLoading: false
      });
      console.log('weather data retrieved', this.state.weatherData)
    })
  }

  fetchGeoData(city){
    $.ajax({
      url: `http://localhost:3333/api/fetchLatLong?city=` + city
    }).done(result => {
      console.log("This is the result of fetch geo data", result);
      const newConfig = Object.assign({}, this.props.config);
      newConfig.latlong = result;
      appEvents.onUpdateWidgetConfig(newConfig);
      console.log('config data', this.props.config);
      this.fetchWeatherData(result);
    });
  }



  renderWidget() {
    const { config } = this.props;

    if (config.city !== undefined && config.latlong === undefined) {
      this.fetchGeoData(config.city);
      return <div>Fetching Geodata for {config.city}</div>;
    }

    // if (config.city !== undefined && config.latlong !== undefined) {
    //   this.fetchWeatherData(config.latlong);
    // }

    return (
      <div className="CityWeather">
        <When condition={this.state.isHover}>
          <div
            onMouseDown={() => {
              appEvents.onWidgetTextInput(
                this.props.tile.props.id,
                'city',
                'Location'
              );
            }}
            className="WidgetSettings"
          >
            &#9776;
          </div>
        </When>
        <When condition={config.city === undefined}>No city selected</When>
        <When condition={config.city !== undefined}>
          Current City: {config.city}
        </When>
      </div>
    );
  }
}

export default CityWeather;
