import React from 'react';
import Widget from '../widget.js';
import { When } from '../../conditionals.js';
import appEvents from '../../../appEvents.js';
import './cityWeatherWidget.scss';

class CityWeather extends Widget {
  constructor(props) {
    super(props);
    this.state.date = new Date();
  }

  handleNewSecond = () => {
    this.setState({ date: new Date() });
  };

  renderWidget() {
    const { config } = this.props;
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
