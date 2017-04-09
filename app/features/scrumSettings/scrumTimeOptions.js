/**
 * @providesModule ScrumTimeOptions
 */

import React, { Component } from "react";
import {

	View,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

import theme from "AppTheme";

import { toggleScrumTime } from "ScrumSettingsActions";

/*
*	Displays the scrum time options
*	to allow the user to choose
*/
export class ScrumTimeOptions extends Component {

	static propTypes = {

		userScrumTime: React.PropTypes.bool.isRequired,
		toggleScrumTime: React.PropTypes.func.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.containerView}>
				<TouchableOpacity 
					onPress={() => this._morningPicked ()}
					style={styles.morningButton}>
					<Text style={(this.props.userScrumTime === true) ? [styles.morningText, {color: theme.lightGreen}] : styles.morningText}>Morning</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					onPress={() => this._eveningPicked ()}
					style={styles.eveningButton}>
					<Text style={(this.props.userScrumTime === true) ? styles.eveningText : [styles.eveningText, {color: theme.lightGreen}]}>Evening</Text>
				</TouchableOpacity>
			</View>
		);
	}

	_morningPicked () {

		this.props.toggleScrumTime (true);
	}

	_eveningPicked () {

		this.props.toggleScrumTime (false);
	}
}

const styles = StyleSheet.create({

	containerView: {

		flex: 1,
		height: 50,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	morningButton: {

		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	morningText: {

		color: theme.darkGrey,
		fontSize: 18,
		fontWeight: "bold",
	},
	eveningButton: {

		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	eveningText: {

		color: theme.darkGrey,
		fontSize: 18,
		fontWeight: "bold",
	},
});

/*
* Mapping for redux state.
*/
const mapStateToProps = state => ({

	userScrumTime: state.scrumSettingsReducer.userScrumTime,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	toggleScrumTime: (toggle) => dispatch (toggleScrumTime (toggle)),
});

export default connect (mapStateToProps, mapDispatchToProps)(ScrumTimeOptions);