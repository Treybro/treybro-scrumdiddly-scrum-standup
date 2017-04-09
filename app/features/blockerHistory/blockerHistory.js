/**
 * @providesModule BlockerHistory
 */

import React, { Component } from "react";
import {

	View,
	Text,
	StyleSheet,
	Platform,
	Image,
} from "react-native";

import MenuButton from "MenuButton";
import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Displays the BlockerHistory screen
*/
export class BlockerHistory extends Component {

	static propTypes = {

	};

	//	Navigation bar options
	static navigationOptions = {

		title: "Scrum Blockers",
		header: {

			visible: true,
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
		drawer: () => ({
			icon: ({ tintColor }) => (
				<Image
					source={getIconAsset ("blockerIcon")}
					style={[styles.icon, {tintColor: tintColor}]} />
			),
		}),
	};

	constructor (props) {

		super (props);
	}

	componentDidMount () {

	}

	render () {

		return (

			<View style={styles.containerView}>
				<Text>Blocker History</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	containerView: {

		flex: 1,
		backgroundColor: theme.white,
	},
});

export default BlockerHistory;