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
} from "react-native";

import HeaderYesterday from "HeaderYesterday";
import HeaderToday from "HeaderToday";
import HeaderBlocker from "HeaderBlocker";
import DailyList from "DailyList";
import YesterdayModal from "YesterdayModal";
import TodayModal from "TodayModal";
import BlockerModal from "BlockerModal";
import ListYesterday from "ListYesterday";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

class DailyTab extends Component {

	//	Validate proptypes
	static propTypes = {

		navigation: React.PropTypes.object,
	};

	//	Navigation bar options
	static navigationOptions = {

		title: "Scrum Daily Items",
		header: {

			visible: true,
			title: "Scrum Daily Items",
			right: () => {},
			left: () => {},
			style: {backgroundColor:theme.pink},
			titleStyle: {color:theme.white},
			tintColor: {},
		},
		tabBar: {

			label: "Daily",
			icon: ({ tintColor }) => (

				<Image source={getIconAsset ("clipboardIcon")} style={{tintColor: tintColor}}/>
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
				<YesterdayModal />
				<TodayModal />
				<BlockerModal />
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

	toggleModal (visible) {
		
		this.setState({showModal: visible});
	}
}

const styles = StyleSheet.create({

	containerView: {

		flex: 1,
		backgroundColor: theme.white,
	},
});

export default DailyTab;