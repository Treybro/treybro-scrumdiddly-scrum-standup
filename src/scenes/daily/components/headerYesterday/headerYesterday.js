/**
 * @providesModule HeaderYesterday
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

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Displays the HeaderYesterday heading
*/
export class HeaderYesterday extends Component {

	static propTypes = {

		toggleCreateYesterdayItem: React.PropTypes.func.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.viewContainer}>
				<Text style={styles.yesterdayText}>Yesterday I...</Text>
				<TouchableOpacity onPress={() => this.props.toggleCreateYesterdayItem ()} style={styles.addButton}>
					<Image source={getIconAsset ("pencilIcon")} style={styles.addButtonImage}/>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	viewContainer: {

		flex: 1,
		height: (Platform.OS === "ios") ? 50 : 50,
		backgroundColor: theme.white,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	yesterdayText: {

		color: theme.lightBlue,
		marginLeft: 10,
		marginRight: 10,
	},
	addButton: {

		marginLeft: 10,
		marginRight: 10,
	},
	addButtonImage: {

		tintColor: theme.lightBlue,
		height: 15,
		width: 15,
	},
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	toggleCreateYesterdayItem: () => dispatch (toggleCreateYesterdayItem ()),
});

export default connect (null, mapDispatchToProps)(HeaderYesterday);