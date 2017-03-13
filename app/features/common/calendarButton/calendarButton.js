/**
 * @providesModule CalendarButton
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	Image,
	View,
	StyleSheet,
	TouchableOpacity,
	Platform,
} from "react-native";
import { connect } from "react-redux";
import {

	toggleCalendar,
} from "ScrumHistoryActions";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Allows the user to toggle the calander on/off
*/
export class CalendarButton extends Component {

	static propTypes = {

		toggleCalendar: React.PropTypes.func.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<TouchableOpacity onPress={() => this._toggleCalendar ()}>
				<View style={styles.rightNavIconContainer}>
					<Image source={getIconAsset ("calendarIcon")} style={styles.rightNavIcon} resizeMode={"stretch"}/>
				</View>
			</TouchableOpacity>
		);
	}

	_toggleCalendar () {

		this.props.toggleCalendar ();
	}
}

const styles = StyleSheet.create({

	rightNavIconContainer: {

		height: 50,
		width: 50,
		marginRight: (Platform.OS === "ios") ? 10 : 5,
		alignItems: "center",
		justifyContent: "center",
	},
	rightNavIcon: {

		tintColor: theme.white,
		height: 20,
		width: 20,
	},
});

const mapStateToProps = state => ({

});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	toggleCalendar: () => dispatch (toggleCalendar ()),
});

export default connect (mapStateToProps, mapDispatchToProps)(CalendarButton);