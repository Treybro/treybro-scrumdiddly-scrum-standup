import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { completeTutorial } from '../actions/tutorialActions';

import Swiper from 'react-native-swiper';

import styles from '../styles/tutorialScreenStyle';

class TutorialScreen extends Component {

  constructor (props) {

    super (props);
  }

  render () {

    return (

      <Swiper style={styles.wrapper} activeDotColor={'#FFFFFF'} loop={false}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Scrumdiddly</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Umptious</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>Let's go!</Text>
          <TouchableHighlight onPress={this.props.finishTutorial} style={styles.enterButton}>
            <Text>Get Started!</Text>
          </TouchableHighlight>
        </View>
      </Swiper>
    );
  }
}

const mapDispatchToProps = dispatch => ({

  finishTutorial: () => dispatch(completeTutorial()),
});

function mapStateToProps(state) {

  return {};
}

export default connect (mapStateToProps, mapDispatchToProps)(TutorialScreen);