import React from 'react';
import TileGrid from '../tileGrid/tileGrid.js';
import './dashboard.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: [],
    };
  }

  render() {
    const { width, height, widgetConfigs } = this.props;
    return (
      <>
        <TileGrid
          width={width}
          height={height}
          tilesPerRow={5}
          rows={3}
          widgetConfigs={widgetConfigs}
        />
      </>
    );
  }
}

export default Dashboard;