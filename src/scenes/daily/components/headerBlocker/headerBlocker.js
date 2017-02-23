/**
 * @providesModule HeaderBlocker
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	View,
	Text,
	StyleSheet,
	Platform,
	TouchableOpacity,
	Image,
} from "react-native";

import { connect } from "react-redux";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Displays the Blocker heading
*/
export class HeaderBlocker extends Component {

	static propTypes = {
		
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.viewContainer}>
				<Text style={styles.yesterdayText}>Blockers...</Text>
				<TouchableOpacity onPress={() => {}} style={styles.addButton}>
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

});

export default connect (null, mapDispatchToProps)(HeaderBlocker);