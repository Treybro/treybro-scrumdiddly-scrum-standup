/**
 * @providesModule ScrumTimeHeader
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	View,
	Text,
	StyleSheet,
	Platform,
} from "react-native";

import theme from "AppTheme";

/*
*	Displays the ScrumTimeHeader
*/
export class ScrumTimeHeader extends Component {


	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.viewContainer}>
				<Text style={styles.headerText}>Scrum Time</Text>
				<Text style={styles.scrumTimeDescription}>When does your daily scrum take place?</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	viewContainer: {

		flex: 1,
		height: (Platform.OS === "ios") ? 70 : 70,
		backgroundColor: theme.white,
		flexDirection: "column",
		justifyContent: "center",
		borderBottomWidth: 1,
		borderBottomColor: theme.lightGrey,
	},
	headerText: {

		color: theme.lightBlue,
		paddingLeft: (Platform.OS === "ios") ? 20 : 20,
		paddingRight: 10,
		fontSize: 20,
		fontWeight: "bold",
	},
	scrumTimeDescription: {

		marginTop: 10,
		paddingLeft: 20,
		fontSize: 12,
		color: theme.darkGrey,
	},
});

export default ScrumTimeHeader;