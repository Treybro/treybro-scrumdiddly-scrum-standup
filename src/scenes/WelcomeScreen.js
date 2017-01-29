import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import styles from '../styles/welcomeScreenStyle';

const styleSettings = require ('../settings/styleSettings');

/*
* Responsible for displaying the welcome screen
* to the user.
* TODO - May ask for login details here?
*/
class WelcomeScreen extends Component {

  constructor (props) {

    super (props);
  }

  render () {

    return (

      <View style={styles.containerView}>
        <Text style={styles.welcomeText}>Welcome to Scrumdiddly!</Text>
        <TouchableHighlight underlayColor={styleSettings.lightBlue} onPress={this._onPressButton} style={styles.enterButton}>
          <Text style={styles.enterButtonText}>Enter</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onPressButton = () => {

    console.log ('Press me!');
  }
}

export default WelcomeScreen;