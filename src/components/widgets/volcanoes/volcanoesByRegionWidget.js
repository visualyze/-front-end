import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import Widget from '../widget.js';
import $ from 'jquery';
import '../../dark-unica.scss';
import './volcanoesByRegionWidget.scss';

const url = `http://localhost:3333/api/volcanoesByRegion`;
console.log(url);

// eslint-disable-next-line new-cap
HighchartsMore(Highcharts);

class VolcanoesByRegion extends Widget {
  constructor(props) {
    super(props);
    this.state.data = [];
    this.state.isLoading = true;
  }

  handleRefresh = () => {
    // TODO: make this configurable
    $.ajax({
      url: 'http://localhost:3333/api/volcanoesByRegion',
    }).done((result) => {
      this.setState({
        data: Object.entries(result).map((pair) => {
          return {name: pair[0], y: pair[1]};
        }),
        isLoading: false,
      });
    });
  };

  getOptions = () => {
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        width: this.getTileWidth(),
        height: this.getTileHeight(),
        styledMode: true,
      },
      title: {
        text: 'Volcanoes by Region',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          name: 'Volcanoes',
          colorByPoint: true,
          data: this.state.data,
        },
      ],

      credits: {
        enabled: false,
      },

      legend: {
        enabled: false,
      },
    };
  };

  renderWidget() {
    const options = this.getOptions();
    if (this.state.isLoading) {
      this.handleRefresh();
      return <div className="VolcanoesByRegion">Loading...</div>;
    }
    if (this.state.isResizing) {
      return <div className="VolcanoesByRegion">(Resizing in progress)</div>;
    }

    return (
      <div className="VolcanoesByRegion">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

export default VolcanoesByRegion;
