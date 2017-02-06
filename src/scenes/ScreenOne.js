//	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Text,
	View,
	Button,
	Image,
	TouchableOpacity,
} from "react-native";

import styles from "../styles/screenOneStyle";

import icon from "../assets/images/icon-add.png";

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

			<View style={styles.containerView}>
				<View style={styles.navbar}>
					<Text style={styles.title}>Hello</Text>
					<TouchableOpacity onPress={this._pressMe}>
						<Image source={icon}/>
					</TouchableOpacity>
				</View>
				<View style={styles.card}>
					<Text>
						dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
					</Text>
				</View>
				<View style={styles.card}>
					<Text>
						dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
					</Text>
				</View>
				<View style={styles.card}>
					<Text>
						dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
					</Text>
				</View>
				<View style={styles.card}>
					<Text>
						dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
					</Text>
				</View>
				<View style={styles.card}>
					<Text>
						dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
					</Text>
				</View>
			</View>
		);
	}

	_pressMe = () => {

		console.log ("Hello");
	}
}

export default ScreenOne;