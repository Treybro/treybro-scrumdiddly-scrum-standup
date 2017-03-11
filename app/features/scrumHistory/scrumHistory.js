/**
 * @providesModule ScrumHistory
 */

import React, { Component } from "react";
import {

	View,
	Text,
	StyleSheet,
	Platform,
} from "react-native";

import MenuButton from "MenuButton";
import theme from "AppTheme";

/*
*	Displays the scrum history screen
*/
class ScrumHistory extends Component {

	//	Navigation bar options
	static navigationOptions = {

		title: "Scrum History",
		header: {

			visible: true,
			right: () => {},
			left: (

				<MenuButton />
			),
			style: {

				backgroundColor:theme.pink,
				height: (Platform.OS === "ios") ? 75 : 55,
			},
			titleStyle: {

				color:theme.white,
				marginLeft: (Platform.OS === "ios") ? 0 : 30,
			},
			tintColor: {},
		},
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.containerView}>
				<Text>Scrum History</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	containerView: {

		flex: 1,
	},
});

export default ScrumHistory;