/**
 * @providesModule ListItem
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
export class ListItem extends Component {

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
			</View>
		);
	}
}

const styles = StyleSheet.create({
	
});

export default ListItem;