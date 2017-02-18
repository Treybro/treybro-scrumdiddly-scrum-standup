/**
 * @providesModule YesterdayModalContent
 */

 //	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	StyleSheet,
	Platform,
	TextInput,
} from "react-native";
import { connect } from "react-redux";
import { closeYesterdayModal } from "YesterdayModalActions";
import { addYesterdayItems } from "YesterdayListActions";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Allows the user to create a new
*	Yesterday Item.
*	TODO - get this into redux
*/
class YesterdayModalContent extends Component {

	//	Validate proptypes
	static propTypes = {

		closeModal: React.PropTypes.func,
		addYesterdayItems: React.PropTypes.func,
	};

	//	Default constructor
	constructor (props) {

		super (props);

		this.state = {

			text: "What did you do yesterday?",
		};
	}

	render () {

		return (

			<View style={styles.viewContainer}>
				<View style={styles.closeContainer}>
					<TouchableOpacity onPress={() => this.props.closeModal ()}>
						<Image source={getIconAsset ("removeIcon")} style={styles.closeIcon}/>
					</TouchableOpacity>
				</View>
				<View style={styles.contentView}>
					<TextInput
						value={this.state.text}
						style={styles.textInput}
						onChangeText={(text) => this.setState({text})}
						autoCapitalize={"sentences"}
						autoCorrect={false}
						autoFocus={false}
						maxLength={240}
						onFocus={() => this._clearText ()}
						returnKeyType={"done"}
						onSubmitEditing={(event) => {this._addYesterdayItem ()}}/>
				</View>
			</View>
		);
	}

	_clearText () {

		if (this.state.text === "What did you do yesterday?") {

			this.setState ({

				text: "",
			});
		}
	}

	/*
	*	Add an item to the users yesterday items
	*	This is passed to redux to handle the save
	*/
	_addYesterdayItem () {

		if (this.state.text !== "" && this.state.text !== undefined && this.state.text !== null && this.state.text !== "What did you do yesterday?") {

			/*
			*	Do some validation on the string or something
			*/
			this.props.addYesterdayItems (this.state.text);
			this.props.closeModal ();
		} else {

			/**
			*	TODO - return some sort of error
			*/
			console.log ("Can't save");
		}
	}
}

const styles = StyleSheet.create({

	viewContainer: {

		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		flexDirection: "column",
	},
	contentView: {

		flex: 1,
		margin: (Platform.OS === "ios") ? 50 : 50,
		backgroundColor: theme.pink,
		opacity: 1,
	},
	closeContainer: {

		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 22,
	},
	closeIcon: {

		tintColor: theme.white,
		marginRight: 22,
	},
	textInput: {

		color: theme.white,
	},
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	closeModal: () => dispatch (closeYesterdayModal ()),
	addYesterdayItems: (itemText) => dispatch (addYesterdayItems (itemText)),
});

export default connect (null,mapDispatchToProps)(YesterdayModalContent);
