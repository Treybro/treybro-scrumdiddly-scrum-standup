/**
 * @providesModule TodayList
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
import {

	getTodayItems,
} from "TodayListActions";

import CreateTodayItem from "CreateTodayItem";
import TodayListItem from "TodayListItem";
import EmptyTodayList from "EmptyTodayList";

import theme from "AppTheme";

/*
*	Displays the list of Todays Items
*/
export class TodayList extends Component {

	static propTypes = {

		todaysItems: React.PropTypes.array,
		getTodayItems: React.PropTypes.func,
		displayCreateTodayItem: React.PropTypes.bool,
		isFetchingTodayItems: React.PropTypes.bool,
	};

	constructor (props) {

		super (props);

		/*
		*	TODO - get this into app setup or something
		*/
		//	Get a list of all the users today items
		this.props.getTodayItems ();
	}

	render () {

		//	Are we loading items?
		//	TODO - test this with a network request
		if (this.props.isFetchingTodayItems === true) {

			return (

				//	TODO - put a loading icon here or something
				<Text>Loading Items</Text>
			);
		}

		// Do we have any items to display?
		if (this.props.todaysItems === undefined || this.props.todaysItems === null || this.props.todaysItems.length === 0) {

			return (

				<View style={styles.card}>
					<CreateTodayItem />
					<EmptyTodayList />
				</View>
			);
		}

		//	Standard view
		return (

			<View style={styles.card}>
				<CreateTodayItem />
				{
					this.props.todaysItems.map ((todayItem) => (

						<TodayListItem key={"list-item-today-key-" + todayItem.id} todayItem={todayItem} />
					))
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	
	card: {

		backgroundColor: theme.white,
		marginLeft: (Platform.OS === "ios") ? 0 : 0,
		marginRight: (Platform.OS === "ios") ? 0 : 0,
		borderRadius: 1,
		borderWidth: 0,
		shadowColor: theme.black,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 1,
		shadowRadius: 1.5,
		elevation: 1,
	},
});

/*
* Mapping for redux state.
*/
const mapStateToProps = state => ({

	todaysItems: state.todayListReducer.todaysItems,
	isFetchingTodayItems: state.todayListReducer.isFetchingTodayItems,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	getTodayItems: () => dispatch (getTodayItems ()),
});

export default connect (mapStateToProps,mapDispatchToProps)(TodayList);