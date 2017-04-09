/**
 * @providesModule TodayHeader
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	Platform,
} from "react-native";

import { connect } from "react-redux";
import { toggleCreateTodayItem } from "TodayListActions";
import { toggleCreateScrumItem } from "ScrumHistoryActions";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Displays the Today Header
*/
export class TodayHeader extends Component {

	static propTypes = {

		toggleCreateScrumItem: React.PropTypes.func.isRequired,
		toggleCreateTodayItemBool: React.PropTypes.bool.isRequired,
		toggleCreateTodayItem: React.PropTypes.func.isRequired,
		isEditable: React.PropTypes.bool.isRequired,
		headerType: React.PropTypes.string.isRequired,
		userScrumTime: React.PropTypes.bool.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		if (this.props.isEditable === false) {

			return (

				<View style={styles.viewContainer}>
					<Text style={styles.todayText}>{(this.props.userScrumTime === true) ? "Today I..." : "Tomorrow I will..."}</Text>
				</View>
			);
		}

		return (

			<View style={styles.viewContainer}>
				<Text style={styles.todayText}>{(this.props.userScrumTime === true) ? "Today I..." : "Tomorrow I will..."}</Text>
				<TouchableOpacity 
					onPress={(this.props.headerType === "daily") ? () => this.props.toggleCreateTodayItem () : () => this.props.toggleCreateScrumItem ("today", !this.props.toggleCreateTodayItemBool)} 
					style={styles.addButton}>
					<Image source={getIconAsset ("pencilIcon")} style={styles.addButtonImage}/>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	viewContainer: {

		flex: 1,
		height: (Platform.OS === "ios") ? 70 : 70,
		backgroundColor: theme.white,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	todayText: {

		color: theme.lightBlue,
		marginLeft: (Platform.OS === "ios") ? 20 : 20,
		marginRight: 10,
		fontSize: 18,
		fontWeight: "bold",
	},
	addButton: {

		marginLeft: (Platform.OS === "ios") ? 10 : 10,
		marginRight: (Platform.OS === "ios") ? 10 : 10,
		height: (Platform.OS === "ios") ? 50 : 50,
		width: (Platform.OS === "ios") ? 50 : 50,
		backgroundColor: theme.white,
		justifyContent: "center",
		alignItems: "flex-end",
	},
	addButtonImage: {

		tintColor: theme.lightBlue,
		height: (Platform.OS === "ios") ? 20 : 20,
		width: (Platform.OS === "ios") ? 20 : 20,
		marginLeft: (Platform.OS === "ios") ? 10 : 10,
		marginRight: (Platform.OS === "ios") ? 10 : 10,
	},
});

/*
* Mapping for redux state.
*/
const mapStateToProps = state => ({

	toggleCreateTodayItemBool: state.scrumHistoryReducer.toggleCreateTodayItem,
	userScrumTime: state.scrumSettingsReducer.userScrumTime,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	toggleCreateTodayItem: () => dispatch (toggleCreateTodayItem ()),
	toggleCreateScrumItem: (itemType, toggle) => dispatch (toggleCreateScrumItem (itemType, toggle)),
});

export default connect (mapStateToProps, mapDispatchToProps)(TodayHeader);