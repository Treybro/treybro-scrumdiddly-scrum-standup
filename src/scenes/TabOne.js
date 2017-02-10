/**
 * @providesModule TabOne
 */

//	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Text,
	View,
	Image,
} from "react-native";

//	Import Scene style
import styles from "../styles/screenOneStyle";
//	Import NavBar Icons
import menuIcon from "../assets/images/icon-menu.png";

class TabOne extends Component {

	//	Validate proptypes
	static propTypes = {

		navigation: React.PropTypes.object,
	};

	static navigationOptions = {

		title: "First Tab",
		tabBar: {

			label: "One",
			icon: ({ tintColor }) => (

				<Image source={menuIcon} style={{tintColor: tintColor}}/>
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

export default TabOne;