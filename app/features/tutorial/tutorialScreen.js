/**
 * @providesModule TutorialScreen
 */

import React, { Component } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { setTutorialCompleted } from "ScrumSettingsActions";

import Swiper from "react-native-swiper";

import theme from "AppTheme";

/*
* Handles the display of our
* tutorial section to users
*/
class TutorialScreen extends Component {

	static propTypes = {

		setTutorialCompleted: React.PropTypes.func.isRequired,
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
					<TouchableOpacity 
						onPress={() => this._completeTutorial ()} 
						style={styles.enterButton}>
						<Text>Get Started!</Text>
					</TouchableOpacity>
				</View>
			</Swiper>
		);
	}

	_completeTutorial () {

		this.props.setTutorialCompleted (true);
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

		backgroundColor: theme.blue,
		height: 30,
		width: 110,
		justifyContent: "center",
		alignItems: "center",
	},
});

//  Redux functions mapping
const mapDispatchToProps = dispatch => ({

	setTutorialCompleted: (toggle) => dispatch (setTutorialCompleted (toggle)),
});

//  Wire this component to redux with our state and dispatch mappings
export default connect (null, mapDispatchToProps)(TutorialScreen);