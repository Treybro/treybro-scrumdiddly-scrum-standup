//	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Button,
} from "react-native";

class ScreenTwo extends Component {

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
				title="Do Dah"
				onPress={() => this.props.navigation.goBack ()}
				label="Go to notifications"/>
		);
	}
}

export default ScreenTwo;