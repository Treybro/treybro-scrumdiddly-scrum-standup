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
	Platform,
} from "react-native";

import { connect } from "react-redux";
import {

	setDrawerNav,
} from "DrawerActions";

import MenuButton from "MenuButton";
import DateHeader from "DateHeader";
import YesterdayHeader from "YesterdayHeader";
import TodayHeader from "TodayHeader";
import BlockerHeader from "BlockerHeader";
import YesterdayList from "YesterdayList";
import TodayList from "TodayList";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

class DailyTab extends Component {

	//	Validate proptypes
	static propTypes = {

		setDrawerNav: React.PropTypes.func.isRequired,
		navigation: React.PropTypes.object.isRequired,
	};

	//	Navigation bar options
	static navigationOptions = {

		title: "Daily Scrum",
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
		this.props.setDrawerNav (this.props.navigation);
	}

	render () {

		return (

			<View style={styles.containerView}>
				<DateHeader displayTitle={"Todays Items"}/>
				<ScrollView>
					<YesterdayHeader 
						headerType={"daily"}
						isEditable={true}/>
					<YesterdayList />
					<TodayHeader 
						headerType={"daily"}
						isEditable={true}/>
					<TodayList />
					<BlockerHeader
						headerType={"daily"}
						isEditable={false}/>
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
	tabBarIcon: {

		tintColor: theme.white,
	},
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	setDrawerNav: (navItem) => dispatch (setDrawerNav (navItem)),
});

export default connect (null, mapDispatchToProps)(DailyTab);