import React from 'react';
import appCommon from '../../appCommon.js';
import appEvents from '../../appEvents.js';
import Tile from '../tile/tile.js';
import './tileGrid.scss';

class TileGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightedTiles: {},
    };

    appEvents.onHighlightedTilesChanged = this.handleHighlightedTilesChanged;
  }

  handleHighlightedTilesChanged = (highlightedTiles) => {
    this.setState({ highlightedTiles })
  }

  render() {
    const { width } = this.props;
    const { tilesPerRow, rows } = this.props;
    const { widgetConfigs } = this.props;
    const realWidth = width - appCommon.scrollbarWidth;
    const tileWidth = (realWidth / tilesPerRow) - (appCommon.tileMargin * 2);

    const tileRows = [];
    for (let row = 0; row < rows; ++row) {
      const tileRow = [];
      for (let col = 0; col < tilesPerRow; ++col) {
        const tileId = 'tile_' + row + '_' + col;
        tileRow.push(<Tile
          id={tileId}
          key={tileId}
          size={tileWidth}
          widgetConfig={widgetConfigs[tileId]}
          isHighlighted={tileId in this.state.highlightedTiles}
        />);
      }
      tileRows.push(
        <div className="tileRow" key={row} style={{ minWidth: width }}>{tileRow}</div>
      );
    }

    return (
      <>
        <div className="tileGrid">
          {tileRows}
        </div>
      </>
    );
  }
}

export default TileGrid;