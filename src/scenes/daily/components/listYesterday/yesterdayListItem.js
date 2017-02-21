/**
 * @providesModule ListItemYesterday
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {
	Text,
	Image,
	View,
	StyleSheet,
	TouchableOpacity,
	Animated,
	Easing,
	TextInput,
} from "react-native";
import { connect } from "react-redux";
import { 
	removeYesterdayItems, 
	beginEditYesterdayItem,
	finishEditYesterdayItem,
} from "YesterdayListActions";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Displays the list of Yesterdays Items
*/
export class ListItemYesterday extends Component {

	static propTypes = {

		yesterdayItem: React.PropTypes.object.isRequired,
		removeYesterdayItems: React.PropTypes.func,
		beginEditYesterdayItem: React.PropTypes.func,
		finishEditYesterdayItem: React.PropTypes.func,
	};

	constructor (props) {

		super (props);
		this.state = {

			fadeHeight: new Animated.Value (0),
			showEditItems: false,
			editItem: false,
			text: this.props.yesterdayItem.itemText,
			height: 0,
			itemCompleted: false,
		};
	}

	render () {

		return (
			
			<View style={styles.containerView}>
				<TouchableOpacity onPress={() => this._toggleEdit ()}>
					<View style={styles.textContainer}>
						<TextInput
							editable={this.state.editItem}
							value={this.state.text}
							style={[styles.listItemText,{height: Math.max(35, this.state.height)}]}
							onChangeText={(text) => this.setState({text:text})}
							autoCapitalize={"sentences"}
							autoCorrect={false}
							autoFocus={false}
							maxLength={240}
							onFocus={() => {}}
							returnKeyType={"done"}
							onSubmitEditing={() => {}}
							multiline={true}
							underlineColorAndroid={(this.state.editItem === false) ? "transparent" : theme.lightGrey}
							onContentSizeChange={(event) => {
								this.setState({height: event.nativeEvent.contentSize.height});
							}} />
					</View>
				</TouchableOpacity>
				<Animated.View style={[styles.editContents,{ height: this.state.fadeHeight}]}>
					<TouchableOpacity onPress={(this.state.editItem === false) ? () => this._editItem ()  : () => this._saveItem ()}>
						<Image 
							source={(this.state.editItem === false) ? getIconAsset ("editIcon") : getIconAsset ("tickIcon")} 
							resizeMode={"stretch"} 
							style={(this.state.editItem === false) ? styles.editIcon : styles.saveIcon} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this._completeItem ()}>
						<Image source={(this.state.itemCompleted === false) ? getIconAsset ("uncheckedIcon")  : getIconAsset ("checkIcon")} 
								resizeMode={"stretch"} 
								style={(this.state.itemCompleted === false) ? styles.uncheckedIcon  : styles.checkedIcon} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this._deleteItem ()}>
						<Image source={getIconAsset ("binIcon")} resizeMode={"stretch"} style={styles.deleteIcon} />
					</TouchableOpacity>
				</Animated.View>
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

					this.props.removeYesterdayItems (this.props.yesterdayItem.id);
					this.props.finishEditYesterdayItem ();
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

					this.props.finishEditYesterdayItem ();
				});
			}
		);
	}

	/*
	*	Display the edit options for a list item
	*/
	_toggleEdit () {

		if (this.state.showEditItems === false) {

			Animated.timing (

				this.state.fadeHeight, {

					toValue: 40,
					duration: 50,
					easing: Easing.inOut (Easing.ease),
				}).start (() => {

					this.setState ({

						showEditItems: true,
					});

					this.props.beginEditYesterdayItem ();
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

					this.props.finishEditYesterdayItem ();
				}
			);
		}
	}

	/*
	*	Mark an item that is completed
	*/
	_completeItem () {

		this.setState ({

			itemCompleted: !this.state.itemCompleted,
		});
	}
}

const styles = StyleSheet.create({

	containerView: {

		borderBottomWidth: 1,
		borderColor: theme.lightGrey,
		flexWrap: "wrap",
	},
	textContainer: {

		margin: 0,
		padding: 0,
	},
	listItemText: {

		margin: 10,
		fontFamily: "Roboto",
		color: theme.black,
	},
	editContents: {

		flex: 1,
		alignItems: "flex-end",
		justifyContent: "flex-end",
		flexDirection: "row",
	},
	editIcon: {

		margin: 10,
		width: 24,
		height: 21,
		tintColor: theme.lightGrey,
	},
	saveIcon: {

		margin: 10,
		tintColor: theme.darkGreen,
		width: 24,
		height: 24,
	},
	checkedIcon: {

		margin: 10,
		tintColor: theme.lightGrey,
		width: 25,
		height: 21,
	},
	uncheckedIcon: {

		margin: 10,
		tintColor: theme.lightGrey,
		width: 21,
		height: 21,
	},
	deleteIcon: {

		margin: 10,
		tintColor: theme.lightGrey,
		width: 14,
		height: 22,
	},
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	removeYesterdayItems: (itemId) => dispatch (removeYesterdayItems (itemId)),
	beginEditYesterdayItem: () => dispatch (beginEditYesterdayItem ()),
	finishEditYesterdayItem: () => dispatch (finishEditYesterdayItem ()),
});

export default connect (null, mapDispatchToProps)(ListItemYesterday);