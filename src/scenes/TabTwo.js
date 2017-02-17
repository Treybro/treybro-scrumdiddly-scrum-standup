/**
 * @providesModule TabTwo
 */
 
//	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Button,
	Image,
} from "react-native";

import getIconAsset from "IconAssets";

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

			<Button
				title="Do Dah"
				onPress={() => this.props.navigation.goBack ()}
				label="Go to notifications"/>
		);
	}
}

export default TabTwo;