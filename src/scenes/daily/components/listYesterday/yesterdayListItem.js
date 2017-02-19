/**
 * @providesModule ListItemYesterday
 */
//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	Image,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Animated,
	Easing,
} from "react-native";
import { connect } from "react-redux";
import { removeYesterdayItems } from "YesterdayListActions";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Displays the list of Yesterdays Items
*/
export class ListItemYesterday extends Component {

	static propTypes = {

		yesterdayItem: React.PropTypes.object.isRequired,
		removeYesterdayItems: React.PropTypes.func,
	};

	constructor (props) {

		super (props);
		this.state = {

			fadeHeight: new Animated.Value (0),
			showEditItems: false,
		};
	}

	render () {

		return (
			
			<View style={styles.containerView}>
				<TouchableOpacity onPress={() => this._toggleEdit (!this.state.showEditItems)}>
					<View style={styles.textContainer}>
						<Text style={styles.listItemText}>
							{this.props.yesterdayItem.itemText}
						</Text>
					</View>
				</TouchableOpacity>
				<Animated.View style={{
					height: this.state.fadeHeight,
					flex: 1,
					alignItems: "flex-end",
					justifyContent: "flex-end",
					flexDirection: "row",
				}}>
					<TouchableOpacity onPress={() => this._deleteItem ()}>
						<Image source={getIconAsset ("editIcon")} resizeMode={"stretch"} style={styles.editIcon} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this._deleteItem ()}>
						<Image source={getIconAsset ("removeIcon")} resizeMode={"stretch"} style={styles.editIcon} />
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

		this.props.removeYesterdayItems (this.props.yesterdayItem.id)
	}

	/*
	*	Display the edit options for a list item
	*/
	_toggleEdit (toggle) {

		if (toggle == true) {

			Animated.timing (

				this.state.fadeHeight, {

				toValue: 40,
				duration: 50,
				easing: Easing.inOut (Easing.ease),
			}).start ();

			this.setState ({

				showEditItems: toggle,
			});
		} else {

			Animated.timing (

				this.state.fadeHeight, {

				toValue: 0,
				duration: 50,
				easing: Easing.inOut(Easing.ease),
			}).start ();

			this.setState ({

				showEditItems: toggle,
			});
		}
	}
}

const styles = StyleSheet.create({

	containerView: {

		borderBottomWidth: 1,
		borderColor: theme.lightGrey,
		flexWrap: "wrap",
	},
	textContainer: {

	},
	listItemText: {

		margin: 10,
		fontFamily: "Roboto",
		color: theme.black,
	},
	editContainer: {

		flex: 1,
		alignItems: "flex-end",
		justifyContent: "flex-end",
		flexDirection: "row",
	},
	editIcon: {

		margin: 10,
		width: 18,
		height: 17,
		tintColor: theme.lightGrey,
	},
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	removeYesterdayItems: (itemId) => dispatch (removeYesterdayItems (itemId)),
});

export default connect (null, mapDispatchToProps)(ListItemYesterday);