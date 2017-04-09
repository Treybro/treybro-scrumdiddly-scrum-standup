/**
 * @providesModule ScrumSettings
 */

import React, { Component } from "react";
import {

	View,
	StyleSheet,
	Platform,
	ScrollView,
	Image,
} from "react-native";

import MenuButton from "MenuButton";
import theme from "AppTheme";
import getIconAsset from "IconAssets";

import ScrumTimeHeader from "ScrumTimeHeader";
import ScrumTimeOptions from "ScrumTimeOptions";
import NotificationsHeader from "NotificationsHeader";
import CurrentAppSettingsHeader from "CurrentAppSettingsHeader";

/*
*	Displays the settings screen
*/
export class ScrumSettings extends Component {

	static propTypes = {

	};

	//	Navigation bar options
	static navigationOptions = {

		title: "Settings",
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
					source={getIconAsset ("settingsIcon")}
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
				<CurrentAppSettingsHeader />
				<ScrollView>
					<ScrumTimeHeader />
					<ScrumTimeOptions />
					<NotificationsHeader />
				</ScrollView>
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

export default ScrumSettings;