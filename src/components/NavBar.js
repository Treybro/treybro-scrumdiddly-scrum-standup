//	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Text,
	View,
	Image,
	TouchableOpacity,
} from "react-native";

import styles from "../styles/navBarStyle";

class NavBar extends Component {

	//	Validate proptypes
	static propTypes = {

		navTitle: React.PropTypes.string.isRequired,
		navLeftIcon: React.PropTypes.number.isRequired,
		navRightIcon: React.PropTypes.number.isRequired,
	};

	render () {

		return (

			<View style={styles.navbar}>
				<TouchableOpacity onPress={this._pressMe}>
					<Image source={this.props.navLeftIcon} style={styles.navLeftIcon}/>
				</TouchableOpacity>
				<Text style={styles.title}>{this.props.navTitle}</Text>
				<TouchableOpacity onPress={this._pressMe}>
					<Image source={this.props.navRightIcon} style={styles.navRightIcon}/>
				</TouchableOpacity>
			</View>
		);
	}
}

export default NavBar;