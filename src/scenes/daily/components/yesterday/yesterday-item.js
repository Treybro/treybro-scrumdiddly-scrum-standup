/**
 * @providesModule YesterdayItem
 */

 //	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Text,
	View,
	TouchableOpacity,
	Image,
} from "react-native";

import styles from "./yesterday-item.style";

import closeIcon from "../../../../assets/images/icon-remove.png";

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
				<View style={styles.closeContainer}>
					<TouchableOpacity onPress={this._closeModal}>
						<Image source={closeIcon} style={styles.closeIcon}/>
					</TouchableOpacity>
				</View>
				<View style={styles.contentView}>
					<Text>Hello World!</Text>
				</View>
			</View>
		);
	}

	_closeModal = () => {

		this.props.closeModal ();
	}
}

export default YesterdayItem;
