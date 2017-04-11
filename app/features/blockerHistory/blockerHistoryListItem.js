/**
 * @providesModule BlockerHistoryListItem
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
*	Displays the BlockerHistoryListItem
*/
export class BlockerHistoryListItem extends Component {

	static propTypes = {

		itemText: React.PropTypes.string.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.containerView}>
				<View style={styles.itemTextContainer}>
					<Text style={styles.itemText}>{this.props.itemText}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	containerView: {

		flex: 1,
		backgroundColor: theme.white,
		borderBottomWidth: 1,
		borderColor: theme.lightGrey,
	},
	itemTextContainer: {

		minHeight: 40,
		justifyContent: "center",
		borderRightWidth: 5, 
		borderRightColor: theme.lightOrange,
	},
	itemText: {

		fontSize: (Platform.OS === "ios") ? 16 : 12,
		fontFamily: (Platform.OS === "ios") ? "Helvetica" : "Roboto",
		color: theme.darkerGrey,
		marginLeft: (Platform.OS === "ios") ? 20 : 20,
		marginRight: (Platform.OS === "ios") ? 20 : 20,
		marginTop: (Platform.OS === "ios") ? 10 : 0,
		marginBottom: (Platform.OS === "ios") ? 10 : 0,
	},
});

export default BlockerHistoryListItem;