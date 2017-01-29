import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import appSettings from './settings/appSettings';

import LoadingScreen from './scenes/LoadingScreen';
import WelcomeScreen from './scenes/WelcomeScreen';
import TutorialScreen from './scenes/TutorialScreen';

class App extends Component {

  constructor (props) {

    super (props);
    this.state = {

      isLoading: true,
      hasViewedTutorial: false,
    }

    //  Set timer for loading screen
    var intervalReference = setInterval (() => {

      this._stopLoading ();
      //  Cancel the loading timer
      clearInterval(intervalReference);
    }, appSettings.appLoadingTime);
  }

  render () {

    if (this.state.isLoading === true) {

      return <LoadingScreen />;
    }

    if (this.state.hasViewedTutorial === false) {

      return <TutorialScreen />;
    }

    return <WelcomeScreen />;
  }

  _stopLoading = () => {
    
    this.setState ({

      isLoading: false,
    });
  };
}

export default App;