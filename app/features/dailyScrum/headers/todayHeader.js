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

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Displays the Today Header
*/
export class TodayHeader extends Component {

	static propTypes = {

		toggleCreateTodayItem: React.PropTypes.func.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.viewContainer}>
				<Text style={styles.todayText}>Today I...</Text>
				<TouchableOpacity onPress={() => this.props.toggleCreateTodayItem ()} style={styles.addButton}>
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
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	toggleCreateTodayItem: () => dispatch (toggleCreateTodayItem ()),
});

export default connect (null, mapDispatchToProps)(TodayHeader);