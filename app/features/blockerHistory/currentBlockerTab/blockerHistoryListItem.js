/**
 * @providesModule BlockerHistoryListItem
 */

import React, { Component } from "react";
import {

	View,
	Text,
	StyleSheet,
	Platform,
	TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

import { selectScrumItem } from "BlockerHistoryActions";
import theme from "AppTheme";

/*
*	Displays the BlockerHistoryListItem
*/
export class BlockerHistoryListItem extends Component {

	static propTypes = {

		itemText: React.PropTypes.string.isRequired,
		itemId: React.PropTypes.number.isRequired,
		navigation: React.PropTypes.object.isRequired,
		selectScrumItem: React.PropTypes.func.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.containerView}>
				<TouchableOpacity onPress={() => this._selectScrumItem ()}>
					<View style={styles.itemTextContainer}>
						<Text style={styles.itemText}>{this.props.itemText}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	//	Selects the scrumItem
	_selectScrumItem () {

		this.props.selectScrumItem (this.props.itemId);
		this.props.navigation.navigate ("TabTwo");
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

		minHeight: 60,
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

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	selectScrumItem: (itemId) => dispatch (selectScrumItem (itemId)),
});

export default connect (null, mapDispatchToProps)(BlockerHistoryListItem);