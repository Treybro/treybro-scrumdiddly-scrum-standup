/**
 * @providesModule TabTwo
 */
 
//	Main React Import
import React, { Component } from "react";
//	React native components
import {

	Text,
	View,
	Image,
} from "react-native";

import getIconAsset from "IconAssets";
import scrumHistory from "../testData/sampleScrumHistory";

class TabTwo extends Component {

	//	Validate proptypes
	static propTypes = {

		navigation: React.PropTypes.object,
	};

	static navigationOptions = {

		title: "Second Tab",
		tabBar: {

			label: "Two",
			icon: ({ tintColor }) => (

				<Image source={getIconAsset ("calendarIcon")} style={{tintColor: tintColor}}/>
			),
		},
	};

	//	Default constructor
	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View>
				{this._renderItems ()}
			</View>
		);
	}

	_renderItems () {

		let dailyScrums = scrumHistory.dailyscrums;
		let returnItems = [];
		for (let i = 0; i < dailyScrums.length; i++) {

			returnItems.push (<Text key={i}>{dailyScrums[i].scrumDate}</Text>);
		}
		return returnItems;
	}
}

export default TabTwo;