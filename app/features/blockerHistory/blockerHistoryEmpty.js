/**
 * @providesModule EmptyBlockerHistory
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
*	Displays the EmptyBlockerHistory
*/
export class EmptyBlockerHistory extends Component {

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.viewContainer}>
				<Text style={styles.emptyText}>Unresolved blockers will appear here, but for the moment you are in the clear!</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	viewContainer: {

		flex: 1,
		backgroundColor: theme.white,
		margin: 10,
		padding: 0,
	},
	emptyText: {

		fontFamily: (Platform.OS === "ios") ? "Helvetica" : "Roboto",
		color: theme.lightGrey,
		fontSize: (Platform.OS === "ios") ? 16 : 14,
		marginTop: (Platform.OS === "ios") ? 10 : 0,
		marginLeft: (Platform.OS === "ios") ? 20 : 20,
		marginRight: (Platform.OS === "ios") ? 20 : 20,
		alignSelf: "center",
	},
});

export default EmptyBlockerHistory;