/**
 * @providesModule ListYesterday
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

	getYesterdayItems,
} from "YesterdayListActions";

import CreateYesterdayItem from "CreateYesterdayItem";
import ListItemYesterday from "ListItemYesterday";

import theme from "AppTheme";

/*
*	Displays the list of Yesterdays Items
*/
export class ListYesterday extends Component {

	static propTypes = {

		yesterdaysItems: React.PropTypes.array,
		getYesterdayItems: React.PropTypes.func,
		displayCreateYesterdayItem: React.PropTypes.bool,
		isFetchingYesterdayItems: React.PropTypes.bool,
	};

	constructor (props) {

		super (props);

		/*
		*	TODO - get this into app setup or something
		*/
		//	Get a list of all the users yesterday items
		this.props.getYesterdayItems ();
	}

	render () {

		if (this.props.isFetchingYesterdayItems === true) {

			return (

				//	TODO - put a loading icon here or something
				<Text>Loading Items</Text>
			);
		}
		return (

			<View style={styles.card}>
				<CreateYesterdayItem />
				{
					this.props.yesterdaysItems.map ((yesterDayItem) => (

						<ListItemYesterday key={"list-item-yesterday-key-" + yesterDayItem.id} yesterdayItem={yesterDayItem} />
					))
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	
	card: {

		backgroundColor: theme.white,
		marginLeft: (Platform.OS === "ios") ? 0 : 10,
		marginRight: (Platform.OS === "ios") ? 0 : 10,
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

	yesterdaysItems: state.yesterdayListReducer.yesterdaysItems,
	isFetchingYesterdayItems: state.yesterdayListReducer.isFetchingYesterdayItems,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	getYesterdayItems: () => dispatch (getYesterdayItems ()),
});

export default connect (mapStateToProps,mapDispatchToProps)(ListYesterday);