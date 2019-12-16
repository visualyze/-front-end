import React from 'react';
import Highcharts from 'highcharts/js/highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge.js';
import Widget from '../../widget.js';
import $ from 'jquery';
import '../../../dark-unica.scss';
import './strongestEarthquakeWidget.scss';

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

class StrongestEarthquakeWidget extends Widget {
  constructor(props) {
    super(props);
    this.state.strongestEarthquake = 0;
    this.state.strongestLocation = '';
    this.state.isLoading = true;

    // Update every minute
    this.internalTimer = setInterval(this.handleRefresh, 60000);
  }

  handleRefresh = () => {
    //TODO: make this configurable
    $.ajax({
      url: 'http://localhost:3333/api/strongestEarthquake'
    }).done(result => {
      this.setState({
        strongestEarthquake: result.strongestEarthquake,
        strongestLocation: result.strongestLocation,
        isLoading: false
      });
    });
  };

  getOptions = () => {
    return {
      chart: {
        type: 'solidgauge',
        width: this.getTileWidth(),
        height: this.getTileHeight(),
        styledMode: true
      },

      title: {
        text: this.state.strongestLocation
      },

      subtitle: {
        text: '24 hours'
      },

      pane: {
        center: ['50%', '75%'],
        size: '100%',
        startAngle: -90,
        endAngle: 90,
        background: {
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
        }
      },

      // the value axis
      yAxis: {
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          y: -70,
          text: null
        },
        labels: {
          y: 16
        },
        min: 0,
        max: 10
      },

      credits: {
        enabled: false
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true
          }
        }
      },

      legend: {
        enabled: false
      },

      series: [
        {
          name: 'magnitude',
          data: [this.state.strongestEarthquake]
        }
      ]
    };
  };

  renderWidget() {
    const options = this.getOptions();
    if (this.state.isLoading) {
      this.handleRefresh();
      return <div className="StrongestEarthquake">Loading...</div>;
    }
    if (this.state.isResizing) {
      return <div className="StrongestEarthquake">(Resizing in progress)</div>;
    }

    return (
      <div className="StrongestEarthquake">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

export default StrongestEarthquakeWidget;
