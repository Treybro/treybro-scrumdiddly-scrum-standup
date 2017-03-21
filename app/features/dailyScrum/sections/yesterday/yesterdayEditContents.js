/**
 * @providesModule EditYesterdayContents
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	View,
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
export class EditYesterdayContents extends Component {

	static propTypes = {

		toggle: React.PropTypes.bool.isRequired,
		editingItem: React.PropTypes.bool.isRequired,
		deleteItem: React.PropTypes.func.isRequired,
		editItem: React.PropTypes.func.isRequired,
		saveItem: React.PropTypes.func.isRequired,
		itemCompleted: React.PropTypes.bool.isRequired,
		itemBlocked: React.PropTypes.bool.isRequired,
		completeItem: React.PropTypes.func.isRequired,
		blockItem: React.PropTypes.func.isRequired,
		canSaveItem: React.PropTypes.bool.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		if (this.props.toggle === false) {

			return null;
		}

		//	If we are editing the item, don't show the complete button
		if (this.props.editingItem === true) {

			return (

				<View style={styles.editContents}>
					<View style={styles.blankView}>
					</View>
					<TouchableOpacity onPress={() => this.props.deleteItem ()}>
						<Image 
							source={getIconAsset ("cancelIcon")}
							resizeMode={"stretch"} 
							style={styles.cancelIcon} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.props.saveItem ()}>
						<Image 
							source={getIconAsset ("tickIcon")} 
							resizeMode={"stretch"} 
							style={(this.props.canSaveItem === false) ? styles.saveIcon : [styles.saveIcon, {tintColor: theme.lightGreen}]} />
					</TouchableOpacity>
				</View>
			);
		}

		//	Only display something when we want to edit an item
		return (

			<View style={styles.editContents}>
				<TouchableOpacity onPress={() => this.props.completeItem ()}>
					<Image source={getIconAsset ("okIcon")} 
							resizeMode={"stretch"} 
							style={(this.props.itemCompleted === false) ? styles.checkedIcon  : [styles.checkedIcon,{tintColor : theme.lightGreen}]} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.props.blockItem ()}>
					<Image 
						source={getIconAsset ("blockerIcon")}
						resizeMode={"stretch"} 
						style={(this.props.itemBlocked === false) ? styles.blockerIcon  : [styles.blockerIcon,{tintColor : theme.lightOrange}]} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.props.editItem ()}>
					<Image 
						source={getIconAsset ("editIcon")} 
						resizeMode={"stretch"} 
						style={styles.editIcon} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.props.deleteItem ()}>
					<Image 
						source={getIconAsset ("binIcon")}
						resizeMode={"stretch"} 
						style={styles.deleteIcon} />
				</TouchableOpacity>
			</View>
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
		tintColor: theme.darkGrey,
	},
	blockerIcon: {

		width: (Platform.OS === "ios") ? 30 : 30,
		height: (Platform.OS === "ios") ? 30 : 30,
		tintColor: theme.darkGrey,
	},
	saveIcon: {

		tintColor: theme.darkGrey,
		width: (Platform.OS === "ios") ? 30 : 30,
		height: (Platform.OS === "ios") ? 30 : 30,
	},
	deleteIcon: {

		tintColor: theme.darkGrey,
		width: (Platform.OS === "ios") ? 22 : 22,
		height: (Platform.OS === "ios") ? 30 : 30,
	},
	cancelIcon: {

		tintColor: theme.lightRed,
		width: (Platform.OS === "ios") ? 30 : 30,
		height: (Platform.OS === "ios") ? 30 : 30,
	},
	checkedIcon: {

		tintColor: theme.darkGrey,
		height: (Platform.OS === "ios") ? 30 : 30,
		width: (Platform.OS === "ios") ? 30 : 30,
	},
	blankView: {

		width: (Platform.OS === "ios") ? 30 : 30,
		height: (Platform.OS === "ios") ? 30 : 30,
	},
});

export default EditYesterdayContents;