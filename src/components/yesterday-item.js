/**
 * @providesModule YesterdayItem
 */

 //	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Text,
	View,
	Modal,
	TouchableHighlight,
} from "react-native";

import styles from "./yesterday-item.style";

/*
*	Allows the user to create a new
*	Yesterday Item.
*	TODO - get this into redux
*/
class YesterdayItem extends Component {

	//	Validate proptypes
	static propTypes = {

		closeModal: React.PropTypes.func.isRequired,
	};

	//	Default constructor
	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.viewContainer}>
				<View style={styles.contentView}>
					<Text>Hello World!</Text>
					<TouchableHighlight onPress={() => {

							this.props.closeModal();
						}}>
						<Text>Hide Modal</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

export default YesterdayItem;
