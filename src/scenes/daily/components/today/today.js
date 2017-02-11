/**
 * @providesModule Today
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	View,
	Text,
} from "react-native";

import styles from "./today.style";

/*
*	Displays the Today heading
*/
export class Today extends Component {

	static propTypes = {

	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.viewContainer}>
				<Text style={styles.todayText}>Today I will...</Text>
			</View>
		);
	}
}

export default Today;