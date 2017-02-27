/**
 * @providesModule EditContentsYesterday
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	Animated,
	TouchableOpacity,
	StyleSheet,
	Image,
	Platform,
} from "react-native";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Displays the Today heading
*/
export class EditContentsYesterday extends Component {

	static propTypes = {

		toggle: React.PropTypes.bool.isRequired,
		editingItem: React.PropTypes.bool.isRequired,
		deleteItem: React.PropTypes.func.isRequired,
		editItem: React.PropTypes.func.isRequired,
		saveItem: React.PropTypes.func.isRequired,
	};

	constructor (props) {

		super (props);
		this.state = {

			fadeHeight: new Animated.Value (0),
			editItem: false,
			height: (Platform.OS === "ios") ? 0 : 0,
		};
	}

	render () {

		if (this.props.toggle === false) {

			return null;
		}
		return (

			<Animated.View style={styles.editContents}>
				<TouchableOpacity onPress={(this.state.editItem === false) ? () => this.props.editItem ()  : () => this.props.saveItem ()}>
					<Image 
						source={(this.props.editingItem === false) ? getIconAsset ("editIcon") : getIconAsset ("tickIcon")} 
						resizeMode={"stretch"} 
						style={(this.props.editingItem === false) ? styles.editIcon : styles.saveIcon} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.props.deleteItem ()}>
					<Image source={getIconAsset ("binIcon")} resizeMode={"stretch"} style={styles.deleteIcon} />
				</TouchableOpacity>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	
	editContents: {

		flex: 1,
		alignItems: "flex-end",
		justifyContent: "flex-end",
		flexDirection: "row",
		height: 50,
	},
	editIcon: {

		margin: 10,
		width: (Platform.OS === "ios") ? 33 : 33,
		height: (Platform.OS === "ios") ? 30 : 30,
		tintColor: theme.lightGrey,
	},
	saveIcon: {

		margin: 10,
		tintColor: theme.lightGrey,
		width: (Platform.OS === "ios") ? 30 : 30,
		height: (Platform.OS === "ios") ? 30 : 30,
	},
	deleteIcon: {

		margin: 10,
		tintColor: theme.lightGrey,
		width: (Platform.OS === "ios") ? 22 : 22,
		height: (Platform.OS === "ios") ? 30 : 30,
	},
});

export default EditContentsYesterday;