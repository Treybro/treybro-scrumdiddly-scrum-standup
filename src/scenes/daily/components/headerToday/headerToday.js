/**
 * @providesModule HeaderToday
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	View,
	Text,
	StyleSheet,
	Platform,
	TouchableOpacity,
	Image,
} from "react-native";

import theme from "AppTheme";
import addIcon from "../../../../assets/images/icon-add.png";

/*
*	Displays the HeaderToday heading
*/
export class HeaderToday extends Component {

	static propTypes = {

		showModal: React.PropTypes.func.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.viewContainer}>
				<Text style={styles.yesterdayText}>Today I...</Text>
				<TouchableOpacity onPress={this._showModal} style={styles.addButton}>
					<Image source={addIcon} style={styles.addButtonImage}/>
				</TouchableOpacity>
			</View>
		);
	}

	_showModal = () => {

		this.props.showModal ();
	}
}

const styles = StyleSheet.create({

	viewContainer: {

		flex: 1,
		height: (Platform.OS === "ios") ? 50 : 50,
		backgroundColor: theme.white,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	yesterdayText: {

		color: theme.lightBlue,
		marginLeft: 10,
		marginRight: 10,
	},
	addButton: {

		marginLeft: 10,
		marginRight: 10,
	},
	addButtonImage: {

		tintColor: theme.lightBlue,
	},
});

export default HeaderToday;