/**
 * @providesModule CreateTodayItem
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
	TextInput,
	Platform,
	Keyboard,
} from "react-native";
import { connect } from "react-redux";
import {

	toggleCreateTodayItem,
	saveTodayItem,
} from "TodayListActions";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Allows the user to add a Today Item
*/
export class CreateTodayItem extends Component {

	static propTypes = {

		showToggle: React.PropTypes.bool,
		saveTodayItem: React.PropTypes.func.isRequired,
		toggleCreateTodayItem: React.PropTypes.func.isRequired,
	};

	constructor (props) {

		super (props);
		this.state = {

			text: "",
			height: 0,
			canSave: false,
		};
	}

	render () {

		//	Don't need to display anything
		if (this.props.showToggle === false) {

			return null;
		}

		return (
			
			<View style={styles.containerView}>
				<View style={styles.contentContainer}>
					<View style={styles.textContainer}>
						<TextInput
							placeholder={"eg. Will fix all the things!!"}
							editable={this.props.showToggle}
							value={this.state.text}
							style={[styles.listItemText,{height: Math.max(35, this.state.height)}]}
							onChangeText={(text) => this._determineSaveState (text)}
							autoCapitalize={"sentences"}
							autoCorrect={false}
							autoFocus={true}
							maxLength={240}
							onFocus={() => {}}
							returnKeyType={(Platform.OS === "ios") ? "done" : "done"}
							multiline={true}
							underlineColorAndroid={theme.lightGrey}
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
					<Animated.View style={[styles.editContents]}>
						<TouchableOpacity onPress={() => this._cancelItem ()}>
							<Image 
								source={getIconAsset ("cancelIcon")} 
								resizeMode={"stretch"} 
								style={styles.deleteIcon} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this._saveItem ()}>
							<Image 
								source={getIconAsset ("tickIcon")} 
								resizeMode={"stretch"} 
								style={(this.state.canSave === false) ? styles.saveIcon : [styles.saveIcon, {tintColor: theme.lightGreen}]} />
						</TouchableOpacity>
					</Animated.View>
				</View>
			</View>
		);
	}

	/*
	*	Determines if we can save or not
	*/
	_determineSaveState (text) {

		/*
		*	Set the text regardless of it being valid or not
		*	Display purposes only
		*/
		this.setState ({

			text: text,
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
	*	Save a new today item
	*/
	_saveItem () {

		let itemText = this.state.text.trim ();
		if (itemText !== undefined && itemText !== null && itemText.length > 0 && itemText.length <= 240) {

			this.props.saveTodayItem (itemText);
			this.setState ({

				text: "",
				canSave: false,
			}, () => {

				this.props.toggleCreateTodayItem ();
			});
		} else {

			//	TODO - fancy animation and vibration or something
		}
	}

	/*
	*	Cancel the today item
	*/
	_cancelItem () {

		this.setState ({

			text: "",
			canSave: false,
		}, () => {

			this.props.toggleCreateTodayItem ();
		});
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

		padding: 0,
	},
	listItemText: {

		fontFamily: (Platform.OS === "ios") ? "Helvetica" : "Roboto",
		color: theme.black,
		fontSize: (Platform.OS === "ios") ? 14 : 12,
		marginLeft: (Platform.OS === "ios") ? 20 : 20,
		marginRight: (Platform.OS === "ios") ? 20 : 20,
		marginTop: (Platform.OS === "ios") ? 10 : 0,
	},
	editContents: {

		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
		flexDirection: "row",
	},
	saveIcon: {

		marginLeft: (Platform.OS === "ios") ? 20 : 20,
		marginRight: (Platform.OS === "ios") ? 20 : 20,
		marginTop: (Platform.OS === "ios") ? 10 : 10,
		marginBottom: (Platform.OS === "ios") ? 5 : 5,
		tintColor: theme.darkGrey,
		width: (Platform.OS === "ios") ? 30 : 30,
		height: (Platform.OS === "ios") ? 30 : 30,
	},
	deleteIcon: {

		marginLeft: (Platform.OS === "ios") ? 20 : 20,
		marginRight: (Platform.OS === "ios") ? 20 : 20,
		marginTop: (Platform.OS === "ios") ? 10 : 10,
		marginBottom: (Platform.OS === "ios") ? 5 : 5,
		tintColor: theme.lightRed,
		width: (Platform.OS === "ios") ? 30 : 30,
		height: (Platform.OS === "ios") ? 30 : 30,
	},
});

/*
* Mapping for redux state.
*/
const mapStateToProps = state => ({

	showToggle: state.todayListReducer.toggleCreate,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	saveTodayItem: (itemText) => dispatch (saveTodayItem (itemText)),
	toggleCreateTodayItem: () => dispatch (toggleCreateTodayItem ()),
});

export default connect (mapStateToProps, mapDispatchToProps)(CreateTodayItem);