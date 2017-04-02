/**
 * @providesModule EmptyYesterdayList
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	Text,
	View,
	StyleSheet,
	Platform,
	TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import {

	toggleCreateYesterdayItem,
} from "YesterdayListActions";

import theme from "AppTheme";

/*
*	When the list is empty, this will
*	be displayed
*/
export class EmptyYesterdayList extends Component {

	static propTypes = {

		showToggle: React.PropTypes.bool.isRequired,
		toggleCreateYesterdayItem: React.PropTypes.func.isRequired,
		allowUserToAddItems: React.PropTypes.bool.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		//	Don't display if a user is creating an item
		if (this.props.showToggle === true) {

			return null;
		}

		//	Allow the user to add a yesterday item?
		if (this.props.allowUserToAddItems === false) {

			return (

				<View style={styles.containerView}>
					<Text style={styles.emptyText}>You have not completed any items since your last scrum</Text>
				</View>
			);
		}

		//	Standard view
		return (

			<TouchableOpacity onPress={() => this.props.toggleCreateYesterdayItem ()}>
				<View style={styles.containerView}>
					<Text style={styles.emptyText}>What have you achieved since your last standup?</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	
	containerView: {

		flex: 1,
		backgroundColor: theme.white,
		margin: 10,
		padding: 0,
	},
	emptyText: {

		fontFamily: (Platform.OS === "ios") ? "Helvetica" : "Roboto",
		color: theme.lightGrey,
		fontSize: (Platform.OS === "ios") ? 16 : 14,
		marginTop: (Platform.OS === "ios") ? 10 : 0,
		marginLeft: (Platform.OS === "ios") ? 20 : 20,
		marginRight: (Platform.OS === "ios") ? 20 : 20,
		alignSelf: "center",
	},
});

/*
* Mapping for redux state.
*/
const mapStateToProps = state => ({

	showToggle: state.yesterdayListReducer.toggleCreate,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	toggleCreateYesterdayItem: () => dispatch (toggleCreateYesterdayItem ()),
});

export default connect (mapStateToProps, mapDispatchToProps)(EmptyYesterdayList);