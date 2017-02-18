/**
 * @providesModule ListItemYesterday
 */
//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	Text,
	View,
	StyleSheet,
} from "react-native";

import theme from "AppTheme";
/*
*	Displays the list of Yesterdays Items
*/
export class ListItemYesterday extends Component {

	static propTypes = {

		yesterdayItem: React.PropTypes.object.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (
			
			<View style={styles.containerView}>
				<Text style={styles.listItem}>
					{this.props.yesterdayItem.itemText}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	containerView: {

		borderBottomWidth: 1,
		borderColor: theme.lightGrey,
	},
	listItem: {

		flex: 1,
		margin: 10,
		fontFamily: "Roboto",
		color: theme.black,
	},
});

export default ListItemYesterday;