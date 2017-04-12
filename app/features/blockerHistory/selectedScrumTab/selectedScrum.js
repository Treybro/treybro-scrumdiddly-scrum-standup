/**
 * @providesModule SelectedScrum
 */

import React, { Component } from "react";
import {

	View,
	StyleSheet,
	Platform,
	Image,
	Text,
} from "react-native";
import BackButton from "BackButton";
import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Displays the Selected Scrum
*/
export class SelectedScrum extends Component {

	static propTypes = {
		
	};

	//	Navigation bar options
	static navigationOptions = {

		title: "Scrum Blockers",
		header: {

			visible: true,
			left: (

				<BackButton />
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
		tabBar: () => ({

			visible: false,
		}),
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.containerView}>
				<Text>Hello</Text>
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

export default SelectedScrum;