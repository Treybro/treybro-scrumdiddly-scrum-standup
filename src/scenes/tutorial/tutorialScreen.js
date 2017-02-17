/**
 * @providesModule TutorialScreen
 */

import React, { Component } from "react";
import {
	View,
	Text,
	TouchableHighlight,
	StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { completeTutorial } from "TutorialActions";

import Swiper from "react-native-swiper";

import theme from "AppTheme";

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

const styles = StyleSheet.create({

	wrapper: {

	},
	slide1: {

		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.pink,
	},
	slide2: {

		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.pink,
	},
	slide3: {

		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.pink,
	},
	text: {

		color: theme.white,
		fontSize: 30,
		fontWeight: "bold",
	},
	enterButton: {

		backgroundColor: theme.darkGrey,
		height: 30,
		width: 110,
		justifyContent: "center",
		alignItems: "center",
	},
});

//  Redux functions mapping
const mapDispatchToProps = dispatch => ({

	finishTutorial: () => dispatch(completeTutorial()),
});

//  Wire this component to redux with our state and dispatch mappings
export default connect (null, mapDispatchToProps)(TutorialScreen);