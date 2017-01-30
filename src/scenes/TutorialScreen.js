import React, { Component } from "react";
import {
	View,
	Text,
	TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { completeTutorial } from "../actions/tutorialActions";

import Swiper from "react-native-swiper";

import styles from "../styles/tutorialScreenStyle";

/*
* Handles the display of our
* tutorial section to users
*/
class TutorialScreen extends Component {

	static propTypes = {

		finishTutorial: React.PropTypes.func,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<Swiper style={styles.wrapper} activeDotColor={"#FFFFFF"} loop={false}>
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

//  Redux functions mapping
const mapDispatchToProps = dispatch => ({

	finishTutorial: () => dispatch(completeTutorial()),
});

//  Redux state mapping
const mapStateToProps = state => ({

	hasViewedTutorial: state.hasViewedTutorial,
});

//  Wire this component to redux with our state and dispatch mappings
export default connect (mapStateToProps, mapDispatchToProps)(TutorialScreen);