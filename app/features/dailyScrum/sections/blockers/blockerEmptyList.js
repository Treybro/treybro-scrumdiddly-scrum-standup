/**
 * @providesModule EmptyBlockerList
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	Text,
	View,
	StyleSheet,
	Platform,
} from "react-native";

import theme from "AppTheme";

/*
*	When the list is empty, this will
*	be displayed
*/
export class EmptyBlockerList extends Component {

	constructor (props) {

		super (props);
	}

	render () {

		//	Standard view
		return (

			<View style={styles.containerView}>
				<Text style={styles.emptyText}>Your path is clear young padwan.</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	
	containerView: {

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

export default EmptyBlockerList;