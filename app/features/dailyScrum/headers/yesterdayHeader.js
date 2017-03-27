/**
 * @providesModule YesterdayHeader
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
import { toggleCreateYesterdayItem } from "YesterdayListActions";
import { toggleCreateScrumItem } from "ScrumHistoryActions";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Displays the Yesterday Header
*/
export class YesterdayHeader extends Component {

	static propTypes = {

		toggleCreateYesterdayItem: React.PropTypes.func.isRequired,
		toggleCreateYesterdayItemBool: React.PropTypes.bool.isRequired,
		toggleCreateScrumItem: React.PropTypes.func.isRequired,
		isEditable: React.PropTypes.bool.isRequired,
		headerType: React.PropTypes.string.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		if (this.props.isEditable === false) {

			return (

				<View style={styles.viewContainer}>
					<Text style={styles.yesterdayText}>Yesterday I...</Text>
				</View>
			);
		}

		return (

			<View style={styles.viewContainer}>
				<Text style={styles.yesterdayText}>Yesterday I...</Text>
				<TouchableOpacity 
					onPress={(this.props.headerType === "daily") ? () => this.props.toggleCreateYesterdayItem () : () => this.props.toggleCreateScrumItem ("yesterday", !this.props.toggleCreateYesterdayItemBool)} 
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
	yesterdayText: {

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

	toggleCreateYesterdayItemBool: state.scrumHistoryReducer.toggleCreateYesterdayItem,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	toggleCreateYesterdayItem: () => dispatch (toggleCreateYesterdayItem ()),
	toggleCreateScrumItem: (itemType, toggle) => dispatch (toggleCreateScrumItem (itemType, toggle)),
});

export default connect (mapStateToProps, mapDispatchToProps)(YesterdayHeader);