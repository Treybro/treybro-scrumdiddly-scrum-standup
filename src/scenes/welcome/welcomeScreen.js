/**
 * @providesModule WelcomeScreen
 */

import React, { Component } from "react";
//	React native components
import {
	View,
	Text,
	TouchableHighlight,
} from "react-native";
import { connect } from "react-redux";
import { enterButtonPressed } from "WelcomeActions";

//	Styles for this component
import styles from "./welcomeScreen.style";

//	Main app style configuration
const styleSettings = require ("AppTheme");

/*
* Responsible for displaying the welcome screen
* to the user.
* TODO - May ask for login details here?
*/
class WelcomeScreen extends Component {

	static propTypes = {

		enterApp: React.PropTypes.func,
	};

	//	Default constructor
	constructor (props) {

		super (props);
	}

	//	Main Render
	render () {

		return (

			<View style={styles.containerView}>
				<Text style={styles.welcomeText}>Welcome to Scrumdiddly!</Text>
				<TouchableHighlight underlayColor={styleSettings.lightBlue} onPress={this.props.enterApp} style={styles.enterButton}>
					<Text style={styles.enterButtonText}>Enter</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

//  Redux functions mapping
const mapDispatchToProps = dispatch => ({

	enterApp: () => dispatch(enterButtonPressed()),
});

export default connect (null, mapDispatchToProps)(WelcomeScreen);