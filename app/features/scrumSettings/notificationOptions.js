/**
 * @providesModule NotificationOptions
 */

import React, { Component } from "react";
import {

	View,
	StyleSheet,
	Text,
	Switch,
} from "react-native";
import { connect } from "react-redux";

import { toggleDailyReminders } from "ScrumSettingsActions";
import theme from "AppTheme";

/*
*	Allows the user to toggle notification options
*/
export class NotificationOptions extends Component {

	static propTypes = {

		toggleDailyReminders: React.PropTypes.func.isRequired,
		enableDailyReminders: React.PropTypes.bool.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.containerView}>
				<View style={styles.dailyReminders}>
					<Text style={styles.dailyRemindersText}>Daily Reminders</Text>
					<Switch 
						disabled={false}
						value={this.props.enableDailyReminders}
						onValueChange={(value) => this._toggleDailyReminders (value)}
						onTintColor={theme.lightGreen}/>
				</View>
			</View>
		);
	}

	_toggleDailyReminders (value) {

		this.props.toggleDailyReminders (value);
	}
}

const styles = StyleSheet.create({

	containerView: {

		flex: 1,
		backgroundColor: theme.white,
	},
	dailyReminders: {

		flex: 1,
		height: 70,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: theme.white,
		marginLeft: 20,
		marginRight: 20,
	},
	dailyRemindersText: {

		color: theme.darkGrey,
		fontSize: 16,
		fontWeight: "bold",
	},
});

/*
* Mapping for redux state.
*/
const mapStateToProps = state => ({

	enableDailyReminders: state.scrumSettingsReducer.enableDailyReminders,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	toggleDailyReminders: (toggle) => dispatch (toggleDailyReminders (toggle)),
});

export default connect (mapStateToProps, mapDispatchToProps)(NotificationOptions);