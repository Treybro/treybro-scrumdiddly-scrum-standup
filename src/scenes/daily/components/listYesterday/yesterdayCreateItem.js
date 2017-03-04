/**
 * @providesModule CreateYesterdayItem
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

	toggleCreateYesterdayItem,
} from "YesterdayListActions";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

import {

	saveYesterdayItem,
} from "YesterdayListActions";

/*
*	Allows the user to add a Yesterday Item
*/
export class CreateYesterdayItem extends Component {

	static propTypes = {

		showToggle: React.PropTypes.bool,
		saveYesterdayItem: React.PropTypes.func.isRequired,
		toggleCreateYesterdayItem: React.PropTypes.func.isRequired,
	};

	constructor (props) {

		super (props);
		this.state = {

			text: "",
			height: 0,
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
							placeholder={"Fixed that bug that was bugging everyone..."}
							editable={this.props.showToggle}
							value={this.state.text}
							style={[styles.listItemText,{height: Math.max(35, this.state.height)}]}
							onChangeText={(text) => this.setState({text:text})}
							autoCapitalize={"sentences"}
							autoCorrect={false}
							autoFocus={false}
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
						<TouchableOpacity onPress={() => this._saveItem ()}>
							<Image 
								source={getIconAsset ("tickIcon")} 
								resizeMode={"stretch"} 
								style={styles.saveIcon} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this._cancelItem ()}>
							<Image 
								source={getIconAsset ("cancelIcon")} 
								resizeMode={"stretch"} 
								style={styles.deleteIcon} />
						</TouchableOpacity>
					</Animated.View>
				</View>
			</View>
		);
	}

	/*
	*	Save a new yesterday item
	*/
	_saveItem () {

		let itemText = this.state.text.trim ();
		if (itemText !== undefined && itemText !== null && itemText.length > 0 && itemText.length <= 240) {

			this.props.saveYesterdayItem (itemText);
			this.setState ({

				text: "",
			}, () => {

				this.props.toggleCreateYesterdayItem ();
			});
		} else {

			//	TODO - fancy animation and vibration or something
		}
	}

	/*
	*	Cancel the yesterday item
	*/
	_cancelItem () {

		this.setState ({

			text: "",
		}, () => {

			this.props.toggleCreateYesterdayItem ();
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

		margin: 10,
		padding: 0,
	},
	listItemText: {

		fontFamily: (Platform.OS === "ios") ? "Helvetica" : "Roboto",
		color: theme.black,
		fontSize: (Platform.OS === "ios") ? 12 : 12,
		marginLeft: (Platform.OS === "ios") ? 20 : 0,
		marginRight: (Platform.OS === "ios") ? 20 : 0,
		marginTop: (Platform.OS === "ios") ? 10 : 0,
	},
	editContents: {

		flex: 1,
		alignItems: "flex-end",
		justifyContent: "flex-end",
		flexDirection: "row",
	},
	saveIcon: {

		margin: (Platform.OS === "ios") ? 10 : 10,
		tintColor: theme.lightGrey,
		width: (Platform.OS === "ios") ? 30 : 30,
		height: (Platform.OS === "ios") ? 30 : 30,
	},
	deleteIcon: {

		margin: (Platform.OS === "ios") ? 10 : 10,
		tintColor: theme.lightGrey,
		width: (Platform.OS === "ios") ? 30 : 30,
		height: (Platform.OS === "ios") ? 30 : 30,
	},
});

/*
* Mapping for redux state.
*/
const mapStateToProps = state => ({

	showToggle: state.yesterdayListReducer.toggleCreate,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	saveYesterdayItem: (itemText) => dispatch (saveYesterdayItem (itemText)),
	toggleCreateYesterdayItem: () => dispatch (toggleCreateYesterdayItem ()),
});

export default connect (mapStateToProps, mapDispatchToProps)(CreateYesterdayItem);