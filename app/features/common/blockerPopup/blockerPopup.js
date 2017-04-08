/**
 * @providesModule BlockerPopup
 */

//	Main React Import
import React, { Component } from "react";
//	React native components
import {

	View,
	StyleSheet,
	Text,
	Modal,
	TouchableOpacity,
	TextInput,
	Platform,
	Keyboard,
} from "react-native";
import { connect } from "react-redux";

import { hideBlockerModal } from "ModalActions";
import { updateTodayItem } from "TodayListActions";
import { updateScrumItem } from "ScrumHistoryActions";

import theme from "AppTheme";

class BlockerPopup extends Component {

	//	Validate proptypes
	static propTypes = {

		showBlockerModal: React.PropTypes.bool.isRequired,
		hideBlockerModal: React.PropTypes.func.isRequired,
		selectedScrumItemObject: React.PropTypes.object.isRequired,
		updateTodayItem: React.PropTypes.func.isRequired,
		updateScrumItem: React.PropTypes.func.isRequired,
	};

	//	Default constructor
	constructor (props) {

		super (props);
		this.state = {

			editedText: "",
			canSave: false,
		};
	}

	render () {

		if (this.props.showBlockerModal === false) {

			return null;
		}

		return (

			<Modal
				animationType={"fade"}
				transparent={true}
				visible={this.props.showBlockerModal}
				onRequestClose={() => this._hideModal ()}>
				<View style={styles.containerView}>
					<View style={styles.blockerView}>
						<Text style={styles.headerText}>What's blocking you?</Text>
						<TextInput
								ref='editItemTextInput'
								pointerEvents={"auto"}
								editable={true}
								placeholder={"eg. Jim put my stapler in jello again...."}
								value={this.state.editedText}
								style={styles.textInputText}
								onChangeText={(text) => this._determineSaveState (text)}
								autoCapitalize={"sentences"}
								autoCorrect={false}
								autoFocus={true}
								maxLength={240}
								onFocus={() => {}}
								returnKeyType={(Platform.OS === "ios") ? "done" : "done"}
								multiline={true}
								underlineColorAndroid={theme.lightGrey}
								enablesReturnKeyAutomatically={true}
								onKeyPress={(event) => {

									if (event.nativeEvent.key === "Enter") {

										Keyboard.dismiss ();
									}
								}}/>
						<View style={styles.buttonContainer}>
							<TouchableOpacity 
								onPress={() => this._hideModal ()}
								style={styles.cancelButton}>
								<Text style={styles.cancelButtonText}>CANCEL</Text>
							</TouchableOpacity>
							<TouchableOpacity 
								onPress={(this.state.canSave === false) ? () => {} : () => this._blockItem ()}
								style={styles.okButton}>
								<Text style={(this.state.canSave === false) ? styles.okButtonText : [styles.okButtonText, {color: theme.lightGreen}]}>SAVE</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	//	Hides the modal
	_hideModal () {

		this.setState ({

			editedText: "",
			canSave: false,
		});
		this.props.hideBlockerModal ();
	}

	//	Blocks the item
	_blockItem () {

		let itemText = this.state.editedText.trim ();
		if (itemText !== undefined && itemText !== null && itemText.length > 0 && itemText.length <= 240) {

			this.setState ({

				editedText: "",
				canSave: false,
			}, () => {

				let scrumObject = this.props.selectedScrumItemObject;

				if (scrumObject.scrumItemSection === "today") {

					this.props.updateTodayItem (scrumObject.scrumItemId, scrumObject.scrumItemCreatedAt, scrumObject.scrumItemItemText, scrumObject.scrumItemCompleted, true, false, true, itemText);
				} else {
					
					this.props.updateScrumItem (scrumObject.originalScrumId, scrumObject.scrumItemId, scrumObject.scrumItemCreatedAt, "today", scrumObject.scrumItemItemText, scrumObject.scrumItemCompleted, true, false, true, itemText);
				}
				this.props.hideBlockerModal ();
			});
		} else {

			//	TODO - fancy animation and vibration or something
		}
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
}

const styles = StyleSheet.create({

	containerView: {

		flex: 1,
		backgroundColor: "rgba(33,33,33,0.4)",
		alignItems: "center",
		justifyContent: "center",
	},
	blockerView: {

		width: 250,
		height: 250,
		backgroundColor: theme.white,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	headerText: {

		color: theme.blue,
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 15,
	},
	buttonContainer: {

		backgroundColor: theme.white,
		height: 50,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		flexDirection: "row",
	},
	cancelButton: {

		width: 125,
		height: 50,
		backgroundColor: theme.white,
		alignItems: "center",
		justifyContent: "center",
		borderBottomLeftRadius: 10,
	},
	cancelButtonText: {

		color: theme.darkGrey,
		fontSize: 14,
		fontWeight: "bold",
	},
	okButton: {

		width: 125,
		height: 50,
		backgroundColor: theme.white,
		alignItems: "center",
		justifyContent: "center",
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
	},
	okButtonText: {

		color: theme.darkGrey,
		fontSize: 14,
		fontWeight: "bold",
	},
	textInputText: {

		textAlignVertical: "top",
		height: 150,
		fontSize: (Platform.OS === "ios") ? 16 : 12,
		fontFamily: (Platform.OS === "ios") ? "Helvetica" : "Roboto",
		color: theme.darkerGrey,
		marginLeft: (Platform.OS === "ios") ? 20 : 20,
		marginRight: (Platform.OS === "ios") ? 20 : 20,
		marginTop: (Platform.OS === "ios") ? 10 : 0,
		marginBottom: (Platform.OS === "ios") ? 10 : 0,
	},
});

const mapStateToProps = state => ({

	showBlockerModal: state.modalReducer.showBlockerModal,
	selectedScrumItemObject: state.modalReducer.selectedScrumItemObject,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	hideBlockerModal: () => dispatch (hideBlockerModal ()),
	updateTodayItem: (originalItemId, itemCreatedAt, updatedText, updatedCompletedState, updatedBlockedState, updateCompletedItem, updateBlockerItem, blockerItemText) => dispatch (updateTodayItem (originalItemId, itemCreatedAt, updatedText, updatedCompletedState, updatedBlockedState, updateCompletedItem, updateBlockerItem, blockerItemText)),
	updateScrumItem: (scrumID, itemId, itemCreatedAt, itemType, updatedText, updatedCompletedState, updatedBlockedState, updateCompletedItem, updateBlockerItem, blockerItemText) => dispatch (updateScrumItem (scrumID, itemId, itemCreatedAt, itemType, updatedText, updatedCompletedState, updatedBlockedState, updateCompletedItem, updateBlockerItem, blockerItemText)),
});

export default connect(mapStateToProps,mapDispatchToProps)(BlockerPopup);