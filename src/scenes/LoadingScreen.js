import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from '../styles/loadingScreenStyle';

class LoadingScreen extends Component {

  constructor (props) {

    super (props);
  }

  render () {

    return (

      <View style={styles.containerView}>
        <Text style={styles.loadingText}>Loading, please wait...</Text>
      </View>
    );
  }
}

export default LoadingScreen;