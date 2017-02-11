/**
 * @providesModule Yesterday
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	View,
	Text,
	TouchableOpacity,
	Image,
} from "react-native";

import styles from "./yesterday.style";
import addIcon from "../assets/images/icon-add.png";

/*
*	Displays the Yesterday heading
*/
export class Yesterday extends Component {

	static propTypes = {

		showModal: React.PropTypes.func,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.viewContainer}>
				<Text style={styles.yesterdayText}>Yesterday I...</Text>
				<TouchableOpacity onPress={() => {this.props.showModal ()}} style={styles.addButton}>
					<Image source={addIcon} style={styles.addButtonImage}/>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Yesterday;