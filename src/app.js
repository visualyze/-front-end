import React from 'react';
import appEvents from './appEvents.js';
import { When } from './components/conditionals.js';
import Dashboard from './components/dashboard/dashboard.js';
import WidgetPicker from './components/widgetPicker/widgetPicker.js';
import './app.scss';
import dotenv from 'dotenv';

dotenv.config();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // if we change the size of the window, the tiles will also change
      height: window.innerHeight,
      width: window.innerWidth,
      showingPickerFor: null,
      widgetConfigs: []
    };
    window.addEventListener('resize', this.handleSizeChange);
    appEvents.onPlusClick = this.handleOnPlusClick;
    appEvents.onUpdateWidgetConfig = this.handleWidgetConfig;
    appEvents.onWidgetCreated = this.handleWidgetCreated;
    appEvents.onWidgetDelete = this.handleWidgetDelete;
  }

  handleOnPlusClick = tile => {
    this.setState({ showingPickerFor: tile.props.id });
  };

  handleAbortPicker = () => {
    this.setState({ showingPickerFor: null });
  };

  handleWidgetCreated = (tileId, kind) => {
    // Duplicate the object because we don't want to change the original one
    const widgetConfigs = Object.assign({}, this.state.widgetConfigs);

    // This sets the widget of kind and size at location tileId
    widgetConfigs[tileId] = {
      tileId: tileId,
      kind: kind,
      numOfTilesW: 1,
      numOfTilesH: 1
    };

    this.setState({ widgetConfigs, showingPickerFor: null });
  };

  handleWidgetDelete = tileId => {
    // Duplicate the object because we don't want to change the original one
    const widgetConfigs = Object.assign({}, this.state.widgetConfigs);

    // We delete the widget
    delete widgetConfigs[tileId];
    // We rerender without the deleted widget
    this.setState({ widgetConfigs });
  };

  handleWidgetConfig = widgetConfig => {
    // Duplicate the object because we don't want to change the original one
    const widgetConfigs = Object.assign({}, this.state.widgetConfigs);
    widgetConfigs[widgetConfig.tileId] = widgetConfig;
    this.setState({ widgetConfigs });
  };

  handleSizeChange = () => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  };

  render() {
    return (
      <>
        <Dashboard
          height={this.state.height}
          width={this.state.width}
          widgetConfigs={this.state.widgetConfigs}
        />
        <When condition={this.state.showingPickerFor !== null}>
          <div className="modalCover" onClick={this.handleAbortPicker} />
          <WidgetPicker tile={this.state.showingPickerFor} />
        </When>
      </>
    );
  }
}
