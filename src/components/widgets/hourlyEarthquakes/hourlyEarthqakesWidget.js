import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Widget from '../widget.js';
import $ from 'jquery';
import '../../dark-unica.scss';
import './hourlyEarthqakesWidget.scss';

class HourlyEarthqakesWidget extends Widget {
  constructor(props) {
    super(props);
    this.state.series = [];
    this.state.isLoading = true;

    // Update every minute
    this.internalTimer = setInterval(this.handleRefresh, 60000);
  }

  handleRefresh = () => {
    //TODO: make this configurable
    $.ajax({
      url: `http://localhost:3333/api/hourlyEarthquakes`
    }).done(result => {
      // We map [["123456": 1]] to [[123456: 1]]
      const series = result.map(pair => [Number.parseInt(pair[0]), pair[1]]);
      this.setState({ series: series, isLoading: false });
    });
  };

  getOptions = () => {
    return {
      chart: {
        type: 'line',
        width: this.getTileWidth(),
        height: this.getTileHeight(),
        styledMode: true
      },

      title: {
        text: 'Hourly Earthquakes (24h)'
      },

      yAxis: {
        title: {
          enabled: false
        }
      },

      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          hour: '%I %p'
        },
        labels: {
          format: '{value:%I %p}',
          style: { fontSize: '8px' }
        },

        tickInterval: 1000 * 60 * 60 // tick every hour
      },

      legend: {
        enabled: false
      },

      plotOptions: {
        series: {}
      },

      credits: {
        enabled: false
      },

      series: [
        {
          name: 'count',
          data: this.state.series
        }
      ]
    };
  };

  renderWidget() {
    const options = this.getOptions();
    if (this.state.isLoading) {
      this.handleRefresh();
      return <div className="HourlyEarthquakes">Loading...</div>;
    }
    if (this.state.isResizing) {
      return <div className="HourlyEarthquakes">(Resizing in progress)</div>;
    }

    return (
      <div className="HourlyEarthquakes">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

export default HourlyEarthqakesWidget;
