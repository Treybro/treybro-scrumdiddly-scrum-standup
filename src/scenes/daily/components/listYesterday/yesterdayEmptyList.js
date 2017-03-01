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
} from "react-native";

import { connect } from "react-redux";

import theme from "AppTheme";

/*
*	When the list is empty, this will
*	be displayed
*/
export class EmptyYesterdayList extends Component {

	static propTypes = {

		showToggle: React.PropTypes.bool.isRequired,
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

			<View style={styles.containerView}>
				<Text style={styles.emptyText}>Add some items that you have completed since your last standup!</Text>
			</View>
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

export default connect (mapStateToProps, null)(EmptyYesterdayList);