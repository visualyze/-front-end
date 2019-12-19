import React from 'react';
import { When } from '../conditionals.js';
import appEvents from '../../appEvents.js';
import appCommon from '../../appCommon.js';
import ClockWidget from '../widgets/clock/clockWidget.js';
import HourlyEarthqakesWidget from '../widgets/hourlyEarthquakes/hourlyEarthqakesWidget.js';
import StrongestEarthquakeWidget from '../widgets/strongestEarthquake//strongestEarthquakeDay/strongestEarthquakeWidget.js';
import DepthCorrelationWidget from '../widgets/depthCorrelation/depthCorrelationWidget.js';
import StrongestEarthquakeWeekWidget from '../widgets/strongestEarthquake/strongestEarthquakeWeek/strongestEarthquakeWeekWidget.js';
import DepthCorrelationWeekWidget from '../widgets/depthCorrelation/depthCorrelationWeek/depthCorrelationWeekWidget.js';
import StrongestEarthquakeMonthWidget from '../widgets/strongestEarthquake/strongestEarthquakeMonth/strongestEarthquakeMonthWidget.js';
import DepthCorrelationMonthWidget from '../widgets/depthCorrelation/depthCorrelationMonth/depthCorrelationMonthWidget.js';
import UsPopulationWidget from '../widgets/usPopulation/usPopulationWidget.js';
import CityWeatherWidget from '../widgets/weather/cityWeatherWidget.js';
import VolcanoesByRegionWidget from '../widgets/volcanoes/volcanoesByRegionWidget.js';
import BreakingNewsRssFeedWidget from '../widgets/rssFeed/breakingNewsRssFeedWidget.js';

import './tile.scss';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    };
  }

  isEmpty() {
    return this.props.widgetConfig == null; // null or undefined
  }

  setHover(isHover) {
    this.setState({ isHover });
  }

  render() {
    // size is from tile grid and widgetConfig is from app
    const { size, widgetConfig } = this.props;

    // For every widget we add, we need to add the name => react component
    // in this table. The lambdas make sure these are not created until the
    // function is called.
    const widgetMap = {
      clock: () => (
        <ClockWidget config={widgetConfig} tileSize={size} tile={this} />
      ),
      hourlyEarthquakes: () => (
        <HourlyEarthqakesWidget
          config={widgetConfig}
          tileSize={size}
          tile={this}
        />
      ),
      strongestEarthquake: () => (
        <StrongestEarthquakeWidget
          config={widgetConfig}
          tileSize={size}
          tile={this}
        />
      ),
      depthCorrelation: () => (
        <DepthCorrelationWidget
          config={widgetConfig}
          tileSize={size}
          tile={this}
        />
      ),
      strongestEarthquakeWeek: () => (
        <StrongestEarthquakeWeekWidget
          config={widgetConfig}
          tileSize={size}
          tile={this}
        />
      ),
      depthCorrelationWeek: () => (
        <DepthCorrelationWeekWidget
          config={widgetConfig}
          tileSize={size}
          tile={this}
        />
      ),
      strongestEarthquakeMonth: () => (
        <StrongestEarthquakeMonthWidget
          config={widgetConfig}
          tileSize={size}
          tile={this}
        />
      ),
      depthCorrelationMonth: () => (
        <DepthCorrelationMonthWidget
          config={widgetConfig}
          tileSize={size}
          tile={this}
        />
      ),
      usPopulation: () => (
        <UsPopulationWidget config={widgetConfig} tileSize={size} tile={this} />
      ),
      cityWeather: () => (
        <CityWeatherWidget config={widgetConfig} tileSize={size} tile={this} />
      ),
      volcanoesByRegion: () => (
        <VolcanoesByRegionWidget
          config={widgetConfig}
          tileSize={size}
          tile={this}
        />
      )
    };

    const style = {
      width: size,
      height: size,
      margin: appCommon.tileMargin
    };

    // this is when we use the grip and drag over other tiles
    if (this.props.isHighlighted) {
      style.backgroundColor = '#212121';
    }

    return (
      <>
        <div
          id={this.props.id}
          onMouseEnter={() => this.setHover(true)}
          onMouseLeave={() => this.setHover(false)}
          className="tile"
          style={style}
        >
          <When
            condition={
              this.isEmpty() && this.state.isHover && !appCommon.resizeHappening
            }
          >
            <div
              onClick={() => appEvents.onPlusClick(this)}
              className="plusDiv"
            />
          </When>
          {widgetConfig ? widgetMap[widgetConfig.kind]() : null}
        </div>
      </>
    );
  }
}

export default Tile;
