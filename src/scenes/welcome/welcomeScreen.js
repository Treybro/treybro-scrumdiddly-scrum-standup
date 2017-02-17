/**
 * @providesModule WelcomeScreen
 */

import React, { Component } from "react";
//	React native components
import {
	View,
	Text,
	TouchableHighlight,
	StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { enterButtonPressed } from "WelcomeActions";

import theme from "AppTheme";

/*
* Responsible for displaying the welcome screen
* to the user.
* TODO - May ask for login details here?
*/
class WelcomeScreen extends Component {

	static propTypes = {

		enterApp: React.PropTypes.func,
	};

	//	Default constructor
	constructor (props) {

		super (props);
	}

	//	Main Render
	render () {

		return (

			<View style={styles.containerView}>
				<Text style={styles.welcomeText}>Welcome to Scrumdiddly!</Text>
				<TouchableHighlight underlayColor={theme.lightBlue} onPress={this.props.enterApp} style={styles.enterButton}>
					<Text style={styles.enterButtonText}>Enter</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	containerView: {

		flex: 1,
		backgroundColor: theme.pink,
		justifyContent: "center",
		alignItems: "center",
	},
	welcomeText: {

		fontSize: 25,
		color: theme.white,
		width: 250,
	},
	enterButton: {

		backgroundColor: theme.blue,
		width: 250,
		height: 50,
		marginTop: 10,
	},
	enterButtonText: {

		color: theme.white,
		marginLeft: 10,
	},
});

//  Redux functions mapping
const mapDispatchToProps = dispatch => ({

	enterApp: () => dispatch(enterButtonPressed()),
});

export default connect (null, mapDispatchToProps)(WelcomeScreen);