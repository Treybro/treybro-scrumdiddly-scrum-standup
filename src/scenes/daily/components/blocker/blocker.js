/**
 * @providesModule Blocker
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	View,
	Text,
} from "react-native";

import styles from "./blocker.style";

/*
*	Displays the Blocker heading
*/
export class Blocker extends Component {

	static propTypes = {

	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.viewContainer}>
				<Text style={styles.blockerText}>Blockers ...</Text>
			</View>
		);
	}
}

export default Blocker;