/**
 * @providesModule ListItemYesterday
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	Image,
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Platform,
	Keyboard,
} from "react-native";
import { connect } from "react-redux";
import {

	deleteYesterdayItem,
	toggleCompleteYesterdayItem,
} from "YesterdayListActions";

import theme from "AppTheme";
import getIconAsset from "IconAssets";
import EditContentsYesterday from "EditContentsYesterday";

/*
*	Displays the list of Yesterdays Items
*/
export class ListItemYesterday extends Component {

	static propTypes = {

		yesterdayItem: React.PropTypes.object.isRequired,
		deleteYesterdayItem: React.PropTypes.func,
		toggleCompleteYesterdayItem: React.PropTypes.func,
	};

	constructor (props) {

		super (props);
		this.state = {

			showEditItems: false,
			editItem: false,
			originalText: this.props.yesterdayItem.itemText,
			editedText: this.props.yesterdayItem.itemText,
			height: (Platform.OS === "ios") ? 0 : 0,
			itemCompleted: this.props.yesterdayItem.completed,
		};
	}

	render () {

		let textInputStyle = [this._determineStyle (), {height: (Platform.OS === "ios") ? Math.max (40, this.state.height) : Math.max(40, this.state.height)}];
		return (
			
			<View style={styles.containerView}>
				<View style={styles.completedContainer}>
					<TouchableOpacity onPress={() => this._toggleCompleteItem ()}>
						<Image source={(this.state.itemCompleted === false) ? getIconAsset ("uncheckedIcon")  : getIconAsset ("checkIcon")} 
								resizeMode={"stretch"} 
								style={(this.state.itemCompleted === false) ? styles.uncheckedIcon  : styles.checkedIcon} />
					</TouchableOpacity>
				</View>
				<View style={styles.contentContainer}>
					<TouchableOpacity onPress={() => this._toggleEdit ()}>
						<View style={styles.textContainer}>
							<TextInput
								pointerEvents={(this.state.editItem === false) ? "none": "auto"}
								editable={this.state.editItem}
								value={(this.state.editItem === false) ? this.state.originalText : this.state.editedText}
								style={textInputStyle}
								onChangeText={(text) => this.setState({editedText:text})}
								autoCapitalize={"sentences"}
								autoCorrect={false}
								autoFocus={false}
								maxLength={240}
								onFocus={() => {}}
								returnKeyType={(Platform.OS === "ios") ? "done" : "done"}
								multiline={true}
								underlineColorAndroid={(this.state.editItem === false) ? "transparent" : theme.lightGrey}
								onContentSizeChange={(event) => {
									this.setState({height: event.nativeEvent.contentSize.height});
								}}
								enablesReturnKeyAutomatically={true}
								onKeyPress={(event) => {

									if (event.nativeEvent.key === "Enter") {

										Keyboard.dismiss ();
									}
								}}/>
						</View>
					</TouchableOpacity>
					{/* TODO - Refactor this garbage */}
					<EditContentsYesterday 
						toggle={this.state.showEditItems}
						editingItem={this.state.editItem}
						deleteItem={(this.state.editItem === false) ? () => this._deleteItem () : () => this._cancelEditItem ()}
						editItem={() => this._editItem ()}
						saveItem={() => this._saveItem ()}/>
				</View>
			</View>
		);
	}

	/*
	*	Deletes the selected item
	*	gets dispatched to redux
	*/
	_deleteItem () {

		this.setState ({

			showEditItems: false,
			editItem: false,
		}, () => {

			this.props.deleteYesterdayItem (this.props.yesterdayItem.id);
		});
	}

	/*
	*	Allows the user to edit the item
	*	gets dispatched to redux
	*/
	_editItem () {

		let itemText = this.state.editedText.trim ();
		if (itemText !== undefined && itemText !== null && itemText.length > 0 && itemText.length <= 240) {

			this.setState ({

				originalText: this.state.editedText,
				editItem: !this.state.editItem,
			});
		} else {

			//	TODO - fancy animation and vibration or something
		}
	}

	/*
	*	Cancels the editing of the item
	*	Reset text back to original text
	*/
	_cancelEditItem () {
	
		this.setState ({

			editedText: this.state.originalText,
			editItem: !this.state.editItem,
		}, () => this._toggleEdit ());
	}

	/*
	*	Closes the edit bar and saves the item
	*	TODO - add this to redux
	*/
	_saveItem () {

		let itemText = this.state.text.trim ();
		if (itemText !== undefined && itemText !== null && itemText.length > 0 && itemText.length <= 240) {

			this.setState ({

				showEditItems: false,
				editItem: false,
			});
		} else {

			//	TODO - fancy animation and vibration or something
		}
	}

	/*
	*	Display the edit options for a list item
	*/
	_toggleEdit () {

		let toggle = !this.state.showEditItems;
		this.setState ({

			showEditItems: toggle,
		});
	}

	/*
	*	Toggle complete on/off
	*/
	_toggleCompleteItem () {

		let toggle = !this.state.itemCompleted;
		this.setState ({

			itemCompleted: toggle,
		}, () => {

			this.props.toggleCompleteYesterdayItem (this.props.yesterdayItem.id, toggle);
		});
	}

	_determineStyle () {

		if (this.state.itemCompleted === true) {

			return styles.completedListItemText;
		} else {

			return styles.listItemText;
		}
	}
}

const styles = StyleSheet.create({

	containerView: {

		borderBottomWidth: 1,
		borderColor: theme.lightGrey,
		flexWrap: "wrap",
		flexDirection: "row",
	},
	completedContainer: {

		height: 50,
		width: 50,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
	},
	contentContainer: {

		flex: 1,
	},
	textContainer: {

		margin: 0,
		padding: 0,
		backgroundColor: theme.white,
	},
	listItemText: {

		fontSize: (Platform.OS === "ios") ? 16 : 12,
		fontFamily: (Platform.OS === "ios") ? "Helvetica" : "Roboto",
		color: theme.black,
		marginLeft: (Platform.OS === "ios") ? 0 : 0,
		marginRight: (Platform.OS === "ios") ? 20 : 20,
		marginTop: (Platform.OS === "ios") ? 10 : 0,
		marginBottom: (Platform.OS === "ios") ? 10 : 0,
	},
	completedListItemText: {

		fontSize: (Platform.OS === "ios") ? 16 : 12,
		fontFamily: (Platform.OS === "ios") ? "Helvetica" : "Roboto",
		color: theme.lightGrey,
		marginLeft: (Platform.OS === "ios") ? 0 : 0,
		marginRight: (Platform.OS === "ios") ? 20 : 0,
		marginTop: (Platform.OS === "ios") ? 10 : 0,
		marginBottom: (Platform.OS === "ios") ? 10 : 0,
	},
	checkedIcon: {

		margin: 10,
		tintColor: theme.lightGrey,
		height: (Platform.OS === "ios") ? 25 : 25,
		width: (Platform.OS === "ios") ? 25 : 25,
	},
	uncheckedIcon: {

		margin: 10,
		tintColor: theme.lightGrey,
		height: (Platform.OS === "ios") ? 25 : 25,
		width: (Platform.OS === "ios") ? 25 : 25,
	},
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	deleteYesterdayItem: (itemId) => dispatch (deleteYesterdayItem (itemId)),
	toggleCompleteYesterdayItem: (itemId, completedState) => dispatch (toggleCompleteYesterdayItem (itemId, completedState)),
});

export default connect (null, mapDispatchToProps)(ListItemYesterday);