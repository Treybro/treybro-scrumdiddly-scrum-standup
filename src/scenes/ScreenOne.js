//	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Text,
	View,
} from "react-native";
import NavBar from "../components/NavBar";

//	Import Scene style
import styles from "../styles/screenOneStyle";
//	Import NavBar Icons
import menuIcon from "../assets/images/icon-menu.png";
import addIcon from "../assets/images/icon-add.png";

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
				<NavBar navTitle="Screen One" navLeftIcon={menuIcon} navRightIcon={addIcon}/>
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