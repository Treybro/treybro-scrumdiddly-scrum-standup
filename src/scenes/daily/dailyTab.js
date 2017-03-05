/**
 * @providesModule DailyTab
 */

//	Main React Import
import React, { Component } from "react";
//	React native components
import {

	View,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Platform,
} from "react-native";

import HeaderYesterday from "HeaderYesterday";
import HeaderToday from "HeaderToday";
import HeaderBlocker from "HeaderBlocker";
import ListYesterday from "ListYesterday";
import HeaderDate from "HeaderDate";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

//	Placed here so nav has access to it immediatly.
const styles = StyleSheet.create({

	containerView: {

		flex: 1,
		backgroundColor: theme.white,
	},
	leftNavIconContainer: {

		height: 25,
		width: 25,
		marginLeft: (Platform.OS === "ios") ? 20 : 15,
		alignItems: "center",
		justifyContent: "center",
	},
	leftNavIcon: {

		tintColor: theme.white,
		height: 15,
		width: 25,
	},
	tabBarIcon: {

		tintColor: theme.white,
	},
});

class DailyTab extends Component {

	//	Validate proptypes
	static propTypes = {

	};

	//	Navigation bar options
	static navigationOptions = {

		title: "Daily Scrum",
		header: {

			visible: true,
			right: () => {},
			left: (

				<View style={styles.leftNavIconContainer}>
					<TouchableOpacity onPress={() => {}}>
						<Image source={getIconAsset ("menuIcon")} style={styles.leftNavIcon} resizeMode={"stretch"}/>
					</TouchableOpacity>
				</View>
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
		tabBar: {

			label: "Daily",
			icon: () => (

				<Image source={getIconAsset ("clipboardIcon")} style={styles.tabBarIcon}/>
			),
		},
	};

	//	Default constructor
	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.containerView}>
				<HeaderDate />
				<ScrollView>
					<HeaderYesterday />
					<ListYesterday />
					<HeaderToday />
					<HeaderBlocker />
				</ScrollView>
			</View>
		);
	}
}

export default DailyTab;