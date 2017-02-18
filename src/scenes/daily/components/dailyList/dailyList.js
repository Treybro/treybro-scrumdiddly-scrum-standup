/**
 * @providesModule DailyList
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	View,
	Text,
	StyleSheet,
} from "react-native";

import theme from "AppTheme";

/*
*	Displays the Today heading
*/
export class DailyList extends Component {

	static propTypes = {

	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.card}>
				<Text>
					dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
				</Text>
				<Text>
					dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
				</Text>
				<Text>
					dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
				</Text>
				<Text>
					dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
				</Text>
				<Text>
					dkwnadonaw pianwdpnawdopanwdop naowdnawopidnaw
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	
	card: {

		backgroundColor: theme.white,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 1,
		borderWidth: 0,
		shadowColor: theme.black,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 1,
		shadowRadius: 1.5,
		elevation: 1,
	},
});

export default DailyList;