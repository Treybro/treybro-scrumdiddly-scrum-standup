import React, { Component } from "react";
import {
	View,
	Text,
	TouchableHighlight,
} from "react-native";

import styles from "../styles/welcomeScreenStyle";

const styleSettings = require ("../settings/styleSettings");

/*
* Responsible for displaying the welcome screen
* to the user.
* TODO - May ask for login details here?
*/
class WelcomeScreen extends Component {

	constructor (props) {

		super (props);
		this.state = {

			enterButtonPressed: false,
		};
	}

	render () {

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

		return (<Text>Yo</Text>);
	}

	_onPressButton = () => {

		this.setState ({

			enterButtonPressed: true,
		});
	}
}

export default WelcomeScreen;