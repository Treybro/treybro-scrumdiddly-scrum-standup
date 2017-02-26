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
	AsyncStorage,
	Platform,
} from "react-native";

import HeaderYesterday from "HeaderYesterday";
import HeaderToday from "HeaderToday";
import HeaderBlocker from "HeaderBlocker";
import DailyList from "DailyList";
import ListYesterday from "ListYesterday";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

//	TODO - get rid of this crap
let toDoItems = {
	"toDoItems": [
		{
			"id": 1,
			"completed": false,
			"itemText": "One",
		},
		{
			"id": 2,
			"completed": true,
			"itemText": "Two",
		},
		{
			"id": 3,
			"completed": false,
			"itemText": "Three",
		},
		{
			"id": 4,
			"completed": true,
			"itemText": "Four",
		},
		{
			"id": 5,
			"completed": false,
			"itemText": "Five",
		},
		{
			"id": 6,
			"completed": false,
			"itemText": "Six",
		},
		{
			"id": 7,
			"completed": false,
			"itemText": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu",
		},
	],
};

//	Placed here so nav has access to it immediatly.
const styles = StyleSheet.create({

	containerView: {

		flex: 1,
		backgroundColor: theme.white,
	},
	leftNavIconContainer: {

		height: 25,
		width: 25,
		marginLeft: (Platform.OS === "ios") ? 20 : 10,
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

		title: "Scrum Daily Items",
		header: {

			visible: true,
			title: "Scrum Daily Items",
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
				height: (Platform.OS === "ios") ? 75 : 75,
			},
			titleStyle: {

				color:theme.white
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
		//this._saveToDos ();
	}

	render () {

		return (

			<View style={styles.containerView}>
				<ScrollView>
					<HeaderYesterday />
					<ListYesterday />
					<HeaderToday />
					<DailyList />
					<HeaderBlocker />
					<DailyList />
				</ScrollView>
			</View>
		);
	}

	_saveToDos () {

		AsyncStorage.setItem("DailyTab", JSON.stringify(toDoItems));
	}
}

export default DailyTab;