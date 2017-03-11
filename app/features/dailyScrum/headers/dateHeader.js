/**
 * @providesModule DateHeader
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	View,
	Text,
	StyleSheet,
} from "react-native";

import theme from "AppTheme";

/*
*	Displays the Date header
*/
export class DateHeader extends Component {

	static propTypes = {

	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.viewContainer}>
				<Text style={styles.yesterdayText}>Todays Items</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	viewContainer: {

		backgroundColor: theme.veryLightGrey,
		height: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	yesterdayText: {

		color: theme.darkGrey,
		fontWeight: "bold",
	},
});

export default DateHeader;