/**
 * @providesModule BlockerListItem
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	View,
	StyleSheet,
	TextInput,
	Platform,
	Keyboard,
} from "react-native";

import theme from "AppTheme";

/*
*	Displays the blocker item information
*/
export class BlockerListItem extends Component {

	static propTypes = {

		blockerItem: React.PropTypes.object.isRequired,
	};

	constructor (props) {

		super (props);
		this.state = {

			itemBlocked: this.props.blockerItem.blocked,
			height: (Platform.OS === "ios") ? 0 : 0,
		};
	}

	render () {

		let textInputStyle = [styles.listItemText, {height: (Platform.OS === "ios") ? Math.max (40, this.state.height) : Math.max(50, this.state.height)}];
		let borderStyle = this._determineBorderStyle ();
		return (
			
			<View style={styles.containerView}>
				<View style={styles.contentContainer}>
					<View style={borderStyle}>
						<TextInput
							ref='editItemTextInput'
							pointerEvents={"none"}
							editable={false}
							value={this.props.blockerItem.itemText}
							style={textInputStyle}
							onChangeText={() => {}}
							autoCapitalize={"sentences"}
							autoCorrect={false}
							autoFocus={false}
							maxLength={240}
							onFocus={() => {}}
							returnKeyType={(Platform.OS === "ios") ? "done" : "done"}
							multiline={true}
							underlineColorAndroid={"transparent"}
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
				</View>
			</View>
		);
	}

	/*
	*	Detects the correct border style based on priority
	*/
	_determineBorderStyle () {

		let style;

		//	Blocked items take precedence
		if (this.state.itemBlocked === true) {

			style = [styles.textContainer, {borderRightWidth: 5, borderRightColor: theme.lightOrange}];
		}

		return style;
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
});

export default BlockerListItem;