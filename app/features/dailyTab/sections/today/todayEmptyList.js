/**
 * @providesModule EmptyTodayList
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

	toggleCreateTodayItem,
} from "TodayListActions";

import theme from "AppTheme";

/*
*	When the list is empty, this will
*	be displayed
*/
export class EmptyTodayList extends Component {

	static propTypes = {

		showToggle: React.PropTypes.bool.isRequired,
		toggleCreateTodayItem: React.PropTypes.func.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		//	Don't display if a user is creating an item
		if (this.props.showToggle === true) {

			return null;
		}

		//	Standard view
		return (

			<TouchableOpacity onPress={() => this.props.toggleCreateTodayItem ()}>
				<View style={styles.containerView}>
					<Text style={styles.emptyText}>What will you achieve before your next standup?</Text>
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

	showToggle: state.todayListReducer.toggleCreate,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	toggleCreateTodayItem: () => dispatch (toggleCreateTodayItem ()),
});

export default connect (mapStateToProps, mapDispatchToProps)(EmptyTodayList);