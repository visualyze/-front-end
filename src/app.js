import React, { useContext } from 'react';
import appEvents from './appEvents.js';
import { When } from './components/conditionals.js';
import Dashboard from './components/dashboard/dashboard.js';
import WidgetPicker from './components/widgetPicker/widgetPicker.js';
import WidgetTextInput from './components/widgetTextInput/widgetTextInput.js';
import $ from 'jquery';
import './app.scss';
import firebaseConfig from './firebaseConfig';
// Required for side-effects;
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import UserContext from './UserContext';

// dotenv.config();

export default class App extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    console.log(firebase.auth().currentUser);

    this.needsSave = false;
    this.firstLoadWithUser = true;

    this.state = {
      // if we change the size of the window, the tiles will also change
      height: window.innerHeight,
      width: window.innerWidth,
      showingPickerFor: null,
      showingTextInputFor: null,
      showingTextInputField: null,
      showingTextInputTitle: null,
      widgetConfigs: [],
      user: null
    };
    // console.log(this.state.user);
    // console.log("Id token: ", this.state.user.getIdToken());
    window.addEventListener('resize', this.handleSizeChange);
    appEvents.onPlusClick = this.handleOnPlusClick;
    appEvents.onUpdateWidgetConfig = this.handleWidgetConfig;
    appEvents.onWidgetCreated = this.handleWidgetCreated;
    appEvents.onWidgetDelete = this.handleWidgetDelete;
    appEvents.onWidgetTextInput = this.handleWidgetTextInput;
    appEvents.onTextInputEntered = this.handleTextInputEntered;
  }

  makeSureWereLoggedIn = () => {
    if (this.state.user !== null) {
      return;
    }

    console.log('Logging in...');
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(user.email, user.password)
    //   .then(result => this.setState({ user: result.user }))
    //   .catch(error => console.log('login failed'));
  };

  saveDashboard = () => {
    // Save can only work if we have a user
    if (this.state.user === null) {
      return;
    }

    const fdb = firebase.database();
    const dbref = fdb.ref('widgets/' + this.state.user.uid);
    dbref.set(JSON.stringify(this.state.widgetConfigs), error => {
      if (error) {
        console.log(error);
      } else {
        console.log('Saved dashboard');
      }
    });
  };

  loadDashboard = () => {
    // Load can only work if we have a user
    if (this.state.user === null) {
      return;
    }

    const fdb = firebase.database();
    const dbref = fdb.ref('widgets/' + this.state.user.uid);
    dbref.on('value', snapshot => {
      const snapshotJson = snapshot.toJSON();
      this.setState({ widgetConfigs: JSON.parse(snapshotJson) });
    });
  };

  handleOnPlusClick = tile => {
    this.setState({ showingPickerFor: tile.props.id });
  };

  handleAbortPicker = () => {
    this.setState({ showingPickerFor: null });
  };

  handleWidgetCreated = (tileId, kind) => {
    this.needsSave = true;

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

    if (kind === 'cityWeather') {
      appEvents.onWidgetTextInput(tileId, 'city', 'Location');
    }
  };

  handleWidgetDelete = tileId => {
    this.needsSave = true;

    // Duplicate the object because we don't want to change the original one
    const widgetConfigs = Object.assign({}, this.state.widgetConfigs);

    // We delete the widget
    delete widgetConfigs[tileId];
    // We rerender without the deleted widget
    this.setState({ widgetConfigs });
  };

  handleWidgetTextInput = (tileId, field, title) => {
    this.needsSave = true;

    this.setState({
      showingTextInputFor: tileId,
      showingTextInputField: field,
      showingTextInputTitle: title
    });
  };

  handleAbortTextInput = () => {
    this.setState({ showingTextInputFor: null });
  };

  handleTextInputEntered = text => {
    this.needsSave = true;
    // Duplicate the object because we don't want to change the original one
    const widgetConfigs = Object.assign({}, this.state.widgetConfigs);
    widgetConfigs[this.state.showingTextInputFor][
      this.state.showingTextInputField
    ] = text;
    this.setState({ showingTextInputFor: null, widgetConfigs });
  };

  handleWidgetConfig = widgetConfig => {
    this.needsSave = true;
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
    console.log(this.context);
    this.makeSureWereLoggedIn();

    // This means we have a user and it's the first time we're here
    if (this.state.user !== null && this.firstLoadWithUser) {
      this.firstLoadWithUser = false;
      this.loadDashboard();
    }

    if (this.needsSave) {
      this.saveDashboard();
      this.needsSave = false;
    }

    console.log('Logged in with: ', this.state.user);
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
        <When condition={this.state.showingTextInputFor !== null}>
          <div className="modalCover" onClick={this.handleAbortTextInput} />
          <WidgetTextInput title={this.state.showingTextInputTitle} />
        </When>
      </>
    );
  }
}
