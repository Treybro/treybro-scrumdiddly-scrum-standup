/**
 * @providesModule BlockerHeader
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

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Displays the Blocker heading
*/
export class BlockerHeader extends Component {

	static propTypes = {
		
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
					<Text style={styles.yesterdayText}>I am blocked by...</Text>
				</View>
			);
		}

		return (

			<View style={styles.viewContainer}>
				<Text style={styles.yesterdayText}>Blockers...</Text>
				<TouchableOpacity 
					onPress={(this.props.headerType === "daily") ? () => {} : () => {}} 
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

export default BlockerHeader;