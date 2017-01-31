import React, { Component } from "react";
//	React native components
import {
	View,
	Text,
	TouchableHighlight,
} from "react-native";

//	Root Nav component
import RootNavigation from "../nav/RootNavigation";

//	Styles for this component
import styles from "../styles/welcomeScreenStyle";

//	Main app style configuration
const styleSettings = require ("../settings/styleSettings");

/*
* Responsible for displaying the welcome screen
* to the user.
* TODO - May ask for login details here?
*/
class WelcomeScreen extends Component {

	//	Default constructor
	constructor (props) {

		super (props);
		// TODO redux should hande this
		this.state = {

			enterButtonPressed: false,
		};
	}

	//	Main Render
	render () {

		//	If the user hasn't actually entered the app yet
		if (this.state.enterButtonPressed === false) {

			return (

				<View style={styles.containerView}>
					<Text style={styles.welcomeText}>Welcome to Scrumdiddly!</Text>
					<TouchableHighlight underlayColor={styleSettings.lightBlue} onPress={this._onPressButton} style={styles.enterButton}>
						<Text style={styles.enterButtonText}>Enter</Text>
					</TouchableHighlight>
				</View>
			);
		}

		//	Where the main app starts
		return <RootNavigation />;
	}

	//	TODO redux should handle this
	_onPressButton = () => {

		this.setState ({

			enterButtonPressed: true,
		});
	}
}

export default WelcomeScreen;