import React from 'react';
import TileGrid from '../tileGrid/tileGrid.js';
import './dashboard.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: []
    };
  }

  render() {
    const { width, height, widgetConfigs } = this.props;
    return (
      <>
        <TileGrid
          width={width}
          height={height}
          tilesPerRow={6}
          rows={5}
          widgetConfigs={widgetConfigs}
        />
      </>
    );
  }
}

export default Dashboard;
