import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import appSettings from './settings/appSettings';

import LoadingScreen from './scenes/LoadingScreen';

class App extends Component {

  constructor (props) {

    super (props);
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

    if (this.state.isLoading === true) {

      return <LoadingScreen />;
    }

    return <Text>Hello</Text>;
  }

  _stopLoading = () => {

    console.log ('djwbaiodaw');
    this.setState ({

      isLoading: false,
    });
  };
}

export default App;