//	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Text,
	View,
	Image,
} from "react-native";

//	Styles for this component
import styles from "../styles/drawerHeaderStyle";

//	TODO REMOVE ME - after getting login details
const profileImage = require ('../assets/images/profile-image.png');

/*
*	Responsible for displaying the
*	top section of the drawer
*/
class DrawerHeader extends Component {

	//	Default constructor
	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.headerContainer}>
				<Image source={profileImage} style={styles.headerImage}/>
				<Text style={styles.headerText}>Place Holder Username</Text>
			</View>
		);
	}
}

export default DrawerHeader;