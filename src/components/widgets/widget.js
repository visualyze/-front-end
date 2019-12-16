import React from 'react';
import { When } from '../conditionals.js';
import appEvents from '../../appEvents.js';
import appCommon from '../../appCommon.js';
import './widget.scss';

let nextWidgetId = 0;

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.id = nextWidgetId;
    nextWidgetId++;

    this.state = {
      isHover: false,
      isResizing: false,
      resizeSrcX: null,
      resizeSrcY: null,
      resizeDestX: null,
      resizeDestY: null,
    };
  }

  setHover(isHover) {
    this.setState({ isHover });
  }

  renderWidget() {
    return null;
  }

  handleGripStart = (event) => {
    document.documentElement.addEventListener('mouseup', this.handleOnMouseUpAnywhere);
    document.documentElement.addEventListener('mousemove', this.handleOnMouseMoveAnywhere);
    appCommon.pauseEvent(event);
    appCommon.resizeHappening = true;

    const rect = event.target.parentElement.getBoundingClientRect();
    event.target.parentElement.classList.add('resizedTile');

    this.setState({
      isResizing: true,

      resizeSrcX: rect.left,
      resizeSrcY: rect.top,
      resizeDestX: null,
      resizeDestY: null,
    })
  }

  handleOnMouseUpAnywhere = (event) => {
    if (!this.state.isResizing) {
      return;
    }
    document.documentElement.removeEventListener('mouseup', this.handleOnMouseUpAnywhere);
    document.documentElement.removeEventListener('mousemove', this.handleOnMouseMoveAnywhere);
    appCommon.resizeHappening = false;
    appEvents.onHighlightedTilesChanged({});
    for (const el of document.getElementsByClassName('resizedTile')) {
      el.classList.remove("resizedTile");
    }

    // If we stopped dragging the mouse on a tile
    if (event.target !== null && event.target.id.startsWith("tile_")) {
      // tile_row_col
      const dstParts = event.target.id.split("_");
      const srcParts = this.props.tile.props.id.split("_");
      const tilesH = (dstParts[1] - srcParts[1]) + 1; // if it's the same one then it's 1 size
      const tilesW = (dstParts[2] - srcParts[2]) + 1; // if it's the same one then it's 1 size

      if (tilesH > 0 && tilesW > 0) {
        // duplicate my config to a new config
        const newConfig = Object.assign({}, this.props.config);
        newConfig.numOfTilesW = tilesW;
        newConfig.numOfTilesH = tilesH;
        appEvents.onUpdateWidgetConfig(newConfig);
      }
    }

    this.setState({
      isResizing: false,
      resizeSrcX: null,
      resizeSrcY: null,
      resizeDestX: null,
      resizeDestY: null,
    })
  }

  handleOnMouseMoveAnywhere = (event) => {
    if (!this.state.isResizing) {
      return;
    }

    if (event.target && event.target.id.startsWith("tile_")) {
      // tile_row_col
      const dstParts = event.target.id.split("_");
      const srcParts = this.props.tile.props.id.split("_");

      const highlightedTiles = {};
      for (let row = srcParts[1]; row <= dstParts[1]; ++row) {
        for (let col = srcParts[2]; col <= dstParts[2]; ++col) {
          highlightedTiles["tile_" + row + "_" + col] = true;
        }
      }
      appEvents.onHighlightedTilesChanged(highlightedTiles);
    }

    this.setState({
      resizeDestX: event.clientX,
      resizeDestY: event.clientY,
    })
  }

  // There are 2 margins between tile (the right and left of each tile)
  // TILE margin margin TILE margin margin TILE margin margin TILE
  calcSize = (numOfTiles, resizeSize) => {
    const { tileSize, config } = this.props;
    return resizeSize
      ? resizeSize
      : (numOfTiles * tileSize) + ((numOfTiles - 1) * (appCommon.tileMargin * 2))
  }

  getTileWidth = () => {
    const { tileSize, config } = this.props;
    const resizedWidth = (this.state.resizeSrcX !== null)
      ? this.state.resizeDestX - this.state.resizeSrcX
      : null;
    return this.calcSize(config.numOfTilesW, resizedWidth);
  }

  getTileHeight = () => {
    const { tileSize, config } = this.props;
    const resizedHeight = (this.state.resizeSrcX !== null)
      ? this.state.resizeDestY - this.state.resizeSrcY
      : null;
    return this.calcSize(config.numOfTilesH, resizedHeight);
  }

  render() {
    const { tileSize, config } = this.props;

    return (
      <>
        <div
          onMouseEnter={() => this.setHover(true)}
          onMouseLeave={() => this.setHover(false)}
          style={{
            width: this.getTileWidth(),
            height: this.getTileHeight(),
          }}
          className="widget">
          {this.renderWidget()}
          <When condition={this.state.isHover || this.state.isResizing}>
            <div
              onMouseDown={this.handleGripStart}
              className="grip">&#9698;</div>
            <div
              onMouseDown={() => appEvents.onWidgetDelete(this.props.tile.props.id)}
              className="WidgetDelete">X</div>
          </When>
        </div>
      </>
    );
  }
}

export default Widget;