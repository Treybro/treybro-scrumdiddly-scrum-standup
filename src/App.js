import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import appSettings from './settings/appSettings';

import LoadingScreen from './scenes/LoadingScreen';
import WelcomeScreen from './scenes/WelcomeScreen';
import TutorialScreen from './scenes/TutorialScreen';

/*
* App Root
* Handles navigation before entering the app itself
* ie. Displays loading/tutorial/welcome screen
*/
class App extends Component {

  constructor (props) {

    super (props);
    //  Spoof loading screen
    //  TODO add this to redux - reducer/action
    this.state = {

      isLoading: true,
    }

    //  Set timer for loading screen
    var intervalReference = setInterval (() => {

      this._stopLoading ();
      //  Cancel the loading timer
      clearInterval(intervalReference);
    }, appSettings.appLoadingTime);
  }

  render () {

    //  Are we loading?
    if (this.state.isLoading === true) {

      return <LoadingScreen />;
    }

    //  First time app open?
    if (this.props.hasViewedTutorial === false) {

      return <TutorialScreen />;
    }

    //  User has been here before
    return <WelcomeScreen />;
  }

  //  Tell the component to stop loading
  _stopLoading = () => {
    
    this.setState ({

      isLoading: false,
    });
  };
}

/*
* Mapping for redux state.
* hasViewedTutorial is used throughout the entire app
* mapping it to redux so we can share the state across
* components.
*/
const mapStateToProps = state => ({

  hasViewedTutorial: state.hasViewedTutorial,
});

export default connect(mapStateToProps)(App);