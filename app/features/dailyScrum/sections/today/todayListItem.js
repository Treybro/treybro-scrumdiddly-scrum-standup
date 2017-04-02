/**
 * @providesModule TodayListItem
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
} from "react-native";
import { connect } from "react-redux";
import { updateTodayItem } from "TodayListActions";
import { 
	showDeleteScrumItemModalTodayItem,
	showBlockedErrorModal,
	showCompletedErrorModal,
	showDeleteErrorModal,
} from "ModalActions";

import theme from "AppTheme";
import EditTodayContents from "EditTodayContents";

/*
*	Displays the list of Todays Items
*/
export class TodayListItem extends Component {

	static propTypes = {

		todayItem: React.PropTypes.object.isRequired,
		updateTodayItem: React.PropTypes.func.isRequired,
		showDeleteScrumItemModalTodayItem: React.PropTypes.func.isRequired,
		showBlockedErrorModal: React.PropTypes.func.isRequired,
		showCompletedErrorModal: React.PropTypes.func.isRequired,
		showDeleteErrorModal: React.PropTypes.func.isRequired,
	};

	constructor (props) {

		super (props);
		this.state = {

			showEditItems: false,
			editItem: false,
			originalText: this.props.todayItem.itemText,
			editedText: this.props.todayItem.itemText,
			height: (Platform.OS === "ios") ? 0 : 0,
			itemCompleted: this.props.todayItem.completed,
			itemBlocked: this.props.todayItem.blocked,
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
					<EditTodayContents 
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

		//	Can't delete an item if it's completed
		if (this.state.itemCompleted === true) {

			this.props.showDeleteErrorModal ("completed");
			return;
		}

		//	Can't delete an item if it's blocked
		if (this.state.itemBlocked === true) {

			this.props.showDeleteErrorModal ("blocked");
			return;
		}
		this.props.showDeleteScrumItemModalTodayItem (this.props.todayItem.id);
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
				if (itemText !== this.props.todayItem.itemText) {

					let item = this.props.todayItem;
					this.props.updateTodayItem (item.id, item.createdAt, itemText, this.state.itemCompleted, this.state.itemBlocked, true);
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

		//	Can't complete an item if it is blocked
		if (this.state.itemBlocked === true) {

			this.props.showBlockedErrorModal ();
		} else {

			let toggle = !this.state.itemCompleted;
			this.setState ({

				itemCompleted: toggle,
			}, () => {

				let item = this.props.todayItem;
				this.props.updateTodayItem (item.id, item.createdAt, item.itemText, toggle, this.state.itemBlocked, true);
			});
		}
	}

	/*
	* Toggle blocked on/off
	*/
	_toggleBlockItem () {

		//	Can't block an item if it is completed
		if (this.state.itemCompleted === true) {

			this.props.showCompletedErrorModal ();
		} else {

			let toggle = !this.state.itemBlocked;
			this.setState ({

				itemBlocked: toggle,
			}, () => {

				let item = this.props.todayItem;
				this.props.updateTodayItem (item.id, item.createdAt, item.itemText, this.state.itemCompleted, toggle, false);
			});
		}
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

	showDeleteErrorModal: (errorDescription) => dispatch (showDeleteErrorModal (errorDescription)),
	showCompletedErrorModal: () => dispatch (showCompletedErrorModal ()),
	showBlockedErrorModal: () => dispatch (showBlockedErrorModal ()),
	showDeleteScrumItemModalTodayItem: (todayItemId) => dispatch (showDeleteScrumItemModalTodayItem (todayItemId)),
	updateTodayItem: (originalItemId, itemCreatedAt, updatedText, updatedCompletedState, updatedBlockedState, updateCompletedItem) => dispatch (updateTodayItem (originalItemId, itemCreatedAt, updatedText, updatedCompletedState, updatedBlockedState, updateCompletedItem)),
});

export default connect (null, mapDispatchToProps)(TodayListItem);