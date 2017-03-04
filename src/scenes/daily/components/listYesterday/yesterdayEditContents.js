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
		itemCompleted: React.PropTypes.bool.isRequired,
		completeItem: React.PropTypes.func.isRequired,
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

		//	Only display something when we want to edit an item
		return (

			<Animated.View style={styles.editContents}>
				<TouchableOpacity onPress={() => this.props.completeItem ()}>
					<Image source={(this.props.itemCompleted === false) ? getIconAsset ("okIcon")  : getIconAsset ("okIcon")} 
							resizeMode={"stretch"} 
							style={(this.props.itemCompleted === false) ? styles.uncheckedIcon  : styles.checkedIcon} />
				</TouchableOpacity>
				<TouchableOpacity onPress={(this.state.editItem === false) ? () => this.props.editItem ()  : () => this.props.saveItem ()}>
					<Image 
						source={(this.props.editingItem === false) ? getIconAsset ("editIcon") : getIconAsset ("tickIcon")} 
						resizeMode={"stretch"} 
						style={(this.props.editingItem === false) ? styles.editIcon : styles.saveIcon} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.props.deleteItem ()}>
					<Image 
						source={(this.props.editingItem === false) ? getIconAsset ("binIcon") : getIconAsset ("cancelIcon")}
						resizeMode={"stretch"} 
						style={(this.props.editingItem === false) ? styles.deleteIcon : styles.cancelIcon} />
				</TouchableOpacity>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	
	editContents: {

		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		height: (Platform.OS === "ios") ? 50 : 50,
		backgroundColor: theme.veryLightGrey,
		paddingLeft: 20,
		paddingRight: 20,
	},
	editIcon: {

		width: (Platform.OS === "ios") ? 33 : 33,
		height: (Platform.OS === "ios") ? 30 : 30,
		tintColor: theme.lightGrey,
	},
	saveIcon: {

		tintColor: theme.lightGrey,
		width: (Platform.OS === "ios") ? 30 : 30,
		height: (Platform.OS === "ios") ? 30 : 30,
	},
	deleteIcon: {

		tintColor: theme.lightGrey,
		width: (Platform.OS === "ios") ? 22 : 22,
		height: (Platform.OS === "ios") ? 30 : 30,
	},
	cancelIcon: {

		tintColor: theme.lightGrey,
		width: (Platform.OS === "ios") ? 30 : 30,
		height: (Platform.OS === "ios") ? 30 : 30,
	},
	checkedIcon: {

		tintColor: theme.lightGrey,
		height: (Platform.OS === "ios") ? 30 : 30,
		width: (Platform.OS === "ios") ? 30 : 30,
	},
	uncheckedIcon: {

		tintColor: theme.lightGrey,
		height: (Platform.OS === "ios") ? 30 : 30,
		width: (Platform.OS === "ios") ? 30 : 30,
	},
});

export default EditContentsYesterday;