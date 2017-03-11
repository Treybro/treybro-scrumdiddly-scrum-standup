/**
 * @providesModule YesterdayListItem
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Platform,
	Keyboard,
	Alert,
} from "react-native";
import { connect } from "react-redux";
import {

	deleteYesterdayItem,
	toggleCompleteYesterdayItem,
	updateYesterdayItem,
} from "YesterdayListActions";

import theme from "AppTheme";
import EditYesterdayContents from "EditYesterdayContents";

/*
*	Displays the list of Yesterdays Items
*/
export class YesterdayListItem extends Component {

	static propTypes = {

		yesterdayItem: React.PropTypes.object.isRequired,
		deleteYesterdayItem: React.PropTypes.func,
		toggleCompleteYesterdayItem: React.PropTypes.func,
		editYesterdayItem: React.PropTypes.func,
		updateYesterdayItem: React.PropTypes.func,
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
			itemBlocked: false,
			canSave: false,
		};
	}

	render () {

		let textInputStyle = [this._determineStyle (), {height: (Platform.OS === "ios") ? Math.max (40, this.state.height) : Math.max(50, this.state.height)}];
		let borderStyle = this._determineBorderStyle ();
		return (
			
			<View style={styles.containerView}>
				<View style={styles.contentContainer}>
					<TouchableOpacity activeOpacity={1}onPress={() => this._toggleEdit ()}>
						<View style={borderStyle}>
							<TextInput
								ref='editItemTextInput'
								pointerEvents={(this.state.editItem === false) ? "none": "auto"}
								editable={this.state.editItem}
								value={(this.state.editItem === false) ? this.state.originalText : this.state.editedText}
								style={textInputStyle}
								onChangeText={(text) => this._determineSaveState (text)}
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
					<EditYesterdayContents 
						toggle={this.state.showEditItems}
						editingItem={this.state.editItem}
						deleteItem={(this.state.editItem === false) ? () => this._deleteAlert () : () => this._cancelEditItem ()}
						itemCompleted={this.state.itemCompleted}
						itemBlocked={this.state.itemBlocked}
						completeItem={() => this._toggleCompleteItem ()}
						blockItem={() => this._toggleBlockItem ()}
						editItem={() => this._editItem ()}
						saveItem={() => this._saveItem ()}
						canSaveItem={this.state.canSave} />
				</View>
			</View>
		);
	}

	/*
	*	Determines if we can save the item or not
	*/
	_determineSaveState (text) {

		/*
		*	Set the text regardless of it being valid or not
		*	Display purposes only
		*/
		this.setState ({

			editedText: text,
		}, ()=> {

			let itemText = text.trim ();
			if (itemText !== undefined && itemText !== null && itemText.length > 0 && itemText.length <= 240) {

				this.setState ({

					canSave: true,
				});
			} else {

				this.setState ({

					canSave: false,
				});
			}
		});
	}

	/*
	*	Asks the user to delete or not
	*/
	_deleteAlert () {

		Alert.alert (

			"Delete Scrum Item?",
			"Are you sure you would like to delete this scrum item?",
			[{

				text: "Cancel", onPress: () => {},
			}, {

				text: "OK", onPress: () => this._deleteItem ()},
			], { 

				cancelable: false,
			});
	}

	/*
	*	Deletes the selected item
	*	gets dispatched to redux
	*/
	_deleteItem () {
		
		this.setState ({

			showEditItems: false,
			editItem: false,
			canSave: false,
		}, () => {

			this.props.deleteYesterdayItem (this.props.yesterdayItem.id);
		});
	}

	/*
	*	Allows the user to edit the item
	*	gets dispatched to redux
	*/
	_editItem () {

		this.setState ({

			editItem: !this.state.editItem,
		}, () => {

			//	Only focus when we want to edit the item
			if (this.state.editItem === true) {

				this.refs.editItemTextInput.focus ();
			}
		});
	}

	/*
	*	Cancels the editing of the item
	*	Reset text back to original text
	*/
	_cancelEditItem () {
	
		this.setState ({

			editedText: this.state.originalText,
			editItem: !this.state.editItem,
			canSave: false,
		});
	}

	/*
	*	Closes the edit bar and saves the item
	*	TODO - add this to redux
	*/
	_saveItem () {

		let itemText = this.state.editedText.trim ();
		if (itemText !== undefined && itemText !== null && itemText.length > 0 && itemText.length <= 240) {

			this.setState ({

				originalText: itemText,
				editItem: !this.state.editItem,
				editedText: itemText,
				canSave: false,
			}, () => {

				//	Do we need to save the item?
				if (itemText !== this.props.yesterdayItem.itemText) {

					this.props.updateYesterdayItem (this.props.yesterdayItem.id, itemText, this.props.yesterdayItem.completed);
				}
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

	/*
	* Toggle blocked on/off
	*/
	_toggleBlockItem () {

		let toggle = !this.state.itemBlocked;
		this.setState ({

			itemBlocked: toggle,
		}, () => {

			// TODO - tell redux
		});
	}

	/*
	*	Detects the correct border style based on priority
	*/
	_determineBorderStyle () {

		let style;

		//	When the item not completed or blocked
		if (this.state.itemCompleted === false && this.state.itemBlocked === false) {

			style = styles.textContainer;
		}

		//	Blocked items take precedence
		if (this.state.itemBlocked === true) {

			style = [styles.textContainer, {borderRightWidth: 5, borderRightColor: theme.lightOrange}];
		}

		//	Display item completed only if the item isn't blocked
		if (this.state.itemCompleted === true && this.state.itemBlocked === false) {

			style = [styles.textContainer, {borderRightWidth: 5, borderRightColor: theme.lightGreen}];
		}

		return style;
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
		color: theme.darkerGrey,
		marginLeft: (Platform.OS === "ios") ? 20 : 20,
		marginRight: (Platform.OS === "ios") ? 20 : 20,
		marginTop: (Platform.OS === "ios") ? 10 : 0,
		marginBottom: (Platform.OS === "ios") ? 10 : 0,
	},
	completedListItemText: {

		fontSize: (Platform.OS === "ios") ? 16 : 12,
		fontFamily: (Platform.OS === "ios") ? "Helvetica" : "Roboto",
		color: theme.lightGrey,
		marginLeft: (Platform.OS === "ios") ? 20 : 20,
		marginRight: (Platform.OS === "ios") ? 20 : 20,
		marginTop: (Platform.OS === "ios") ? 10 : 0,
		marginBottom: (Platform.OS === "ios") ? 10 : 0,
	},
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	deleteYesterdayItem: (itemId) => dispatch (deleteYesterdayItem (itemId)),
	toggleCompleteYesterdayItem: (itemId, completedState) => dispatch (toggleCompleteYesterdayItem (itemId, completedState)),
	updateYesterdayItem: (originalItemId, updatedText, updatedCompletedState) => dispatch (updateYesterdayItem (originalItemId, updatedText, updatedCompletedState)),
});

export default connect (null, mapDispatchToProps)(YesterdayListItem);