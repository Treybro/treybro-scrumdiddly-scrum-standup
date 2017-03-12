/**
 * @providesModule HistorySectionHeader
 */

import React, { Component } from "react";
import {

	View,
	Text,
	StyleSheet,
	Platform,
} from "react-native";

import theme from "AppTheme";

/*
*	Displays the scrum history section header
*/
class HistorySectionHeader extends Component {

	static propTypes = {

		headerText: React.PropTypes.string.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.viewContainer}>
				<Text style={styles.headerText}>{this.props.headerText}</Text>
			</View>
		);
	}
}


const styles = StyleSheet.create({

	viewContainer: {

		height: (Platform.OS === "ios") ? 50 : 50,
		backgroundColor: theme.lightBlue,
		justifyContent: "center",
		alignItems: "center",
	},
	headerText: {

		color: theme.white,
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default HistorySectionHeader;