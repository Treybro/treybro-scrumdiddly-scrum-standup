/**
 * @providesModule HistoryListItem
 */

import React, { Component } from "react";
import {

	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
} from "react-native";

import theme from "AppTheme";

/*
*	Displays the scrum history list item
*/
class HistoryListItem extends Component {

	static propTypes = {

		historyDetails: React.PropTypes.string.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<TouchableOpacity onPress={() => console.log ("Pressed")}>
				<View style={styles.containerView}>
					<Text style={styles.displayText}>{this.props.historyDetails}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({

	containerView: {

		height: (Platform.OS === "ios") ? 50 : 50,
		flex: 1,
		backgroundColor: theme.white,
		justifyContent: "center",
		borderBottomColor: theme.lightGrey,
		borderBottomWidth: 0.5,
	},
	displayText: {

		fontSize: (Platform.OS === "ios") ? 16 : 16,
		fontFamily: (Platform.OS === "ios") ? "Helvetica" : "Roboto",
		color: theme.darkerGrey,
		marginLeft: (Platform.OS === "ios") ? 20 : 20,
		marginRight: (Platform.OS === "ios") ? 20 : 20,
	},
});

export default HistoryListItem;