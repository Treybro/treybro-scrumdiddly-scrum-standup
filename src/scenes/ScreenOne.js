//	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Button,
} from "react-native";

class ScreenOne extends Component {

	//	Validate proptypes
	static propTypes = {

		navigation: React.PropTypes.object,
	};

	//	Default constructor
	constructor (props) {

		super (props);
	}

	render () {

		return (

			<Button
				title="Zippy"
				onPress={() => this.props.navigation.navigate ("ScreenThree")}
				label="Go to notifications"/>
		);
	}
}

export default ScreenOne;