/**
 * @providesModule LoadingScreen
 */

import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
} from "react-native";

import theme from "AppTheme";

/*
* Responsible for displaying the main app
* loading screen/animations/transitions
*/
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

const styles = StyleSheet.create({

	containerView: {

		flex: 1,
		backgroundColor: theme.pink,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {

		color: theme.white,
	},
});

export default LoadingScreen;