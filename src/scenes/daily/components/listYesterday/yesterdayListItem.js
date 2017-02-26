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
	Animated,
	Easing,
	TextInput,
	Platform,
	Keyboard,
} from "react-native";
import { connect } from "react-redux";
import {

	removeYesterdayItem,
	toggleCompleteYesterdayItem,
} from "YesterdayListActions";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Displays the list of Yesterdays Items
*/
export class ListItemYesterday extends Component {

	static propTypes = {

		yesterdayItem: React.PropTypes.object.isRequired,
		removeYesterdayItem: React.PropTypes.func,
		toggleCompleteYesterdayItem: React.PropTypes.func,
	};

	constructor (props) {

		super (props);
		this.state = {

			fadeHeight: new Animated.Value (0),
			showEditItems: false,
			editItem: false,
			text: this.props.yesterdayItem.itemText,
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
								editable={this.state.editItem}
								value={this.state.text}
								style={textInputStyle}
								onChangeText={(text) => this.setState({text:text})}
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

									if (event.nativeEvent.key === 'Enter') {

										Keyboard.dismiss ();
									}
								}}/>
						</View>
					</TouchableOpacity>
					<Animated.View style={[styles.editContents,{ height: this.state.fadeHeight}]}>
						<TouchableOpacity onPress={(this.state.editItem === false) ? () => this._editItem ()  : () => this._saveItem ()}>
							<Image 
								source={(this.state.editItem === false) ? getIconAsset ("editIcon") : getIconAsset ("tickIcon")} 
								resizeMode={"stretch"} 
								style={(this.state.editItem === false) ? styles.editIcon : styles.saveIcon} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this._deleteItem ()}>
							<Image source={getIconAsset ("binIcon")} resizeMode={"stretch"} style={styles.deleteIcon} />
						</TouchableOpacity>
					</Animated.View>
				</View>
			</View>
		);
	}

	/*
	*	Deletes the selected item
	*	gets dispatched to redux
	*/
	_deleteItem () {

		Animated.timing (

			this.state.fadeHeight, {

				toValue: 0,
				duration: 50,
				easing: Easing.inOut(Easing.ease),
			}).start (() => {

				this.setState ({

					showEditItems: false,
					editItem: false,
				}, () => {

					this.props.removeYesterdayItem (this.props.yesterdayItem.id);
				});
			}
		);
	}

	/*
	*	Allows the user to edit the item
	*	gets dispatched to redux
	*/
	_editItem () {

		this.setState ({

			editItem: !this.state.editItem,
		});
	}

	/*
	*	Closes the edit bar and saves the item
	*	TODO - add this to redux
	*/
	_saveItem () {

		let itemText = this.state.text.trim ();
		if (itemText !== undefined && itemText !== null && itemText.length > 0 && itemText.length <= 240) {

			Animated.timing (

				this.state.fadeHeight, {

					toValue: 0,
					duration: 50,
					easing: Easing.inOut(Easing.ease),
				}).start (() => {

					this.setState ({

						showEditItems: false,
						editItem: false,
					});
				}
			);
		} else {

			//	TODO - fancy animation and vibration or something
		}
	}

	/*
	*	Display the edit options for a list item
	*/
	_toggleEdit () {

		if (this.state.showEditItems === false) {

			Animated.timing (

				this.state.fadeHeight, {

					toValue: 50,
					duration: 50,
					easing: Easing.inOut (Easing.ease),
				}).start (() => {

					this.setState ({

						showEditItems: true,
					});
				}
			);
		} else {

			Animated.timing (

				this.state.fadeHeight, {

					toValue: 0,
					duration: 50,
					easing: Easing.inOut(Easing.ease),
				}).start (() => {

					this.setState ({

						showEditItems: false,
					});
				}
			);
		}
	}

	/*
	*	Toggle complete on/off
	*/
	_toggleCompleteItem () {

		let newState = !this.state.itemCompleted;
		this.setState ({

			itemCompleted: newState,
		}, () => {

			this.props.toggleCompleteYesterdayItem (this.props.yesterdayItem.id, newState);
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
		marginRight: (Platform.OS === "ios") ? 20 : 0,
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
	editContents: {

		flex: 1,
		alignItems: "flex-end",
		justifyContent: "flex-end",
		flexDirection: "row",
	},
	editIcon: {

		margin: 10,
		width: (Platform.OS === "ios") ? 28 : 24,
		height: (Platform.OS === "ios") ? 25 : 21,
		tintColor: theme.lightGrey,
	},
	saveIcon: {

		margin: 10,
		tintColor: theme.lightGrey,
		width: (Platform.OS === "ios") ? 30 : 24,
		height: (Platform.OS === "ios") ? 30 : 24,
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
	deleteIcon: {

		margin: 10,
		tintColor: theme.lightGrey,
		width: (Platform.OS === "ios") ? 24 : 14,
		height: (Platform.OS === "ios") ? 32 : 22,
	},
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	removeYesterdayItem: (itemId) => dispatch (removeYesterdayItem (itemId)),
	toggleCompleteYesterdayItem: (itemId, completedState) => dispatch (toggleCompleteYesterdayItem (itemId, completedState)),
});

export default connect (null, mapDispatchToProps)(ListItemYesterday);