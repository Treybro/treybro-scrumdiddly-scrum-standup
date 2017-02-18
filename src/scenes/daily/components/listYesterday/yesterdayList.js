/**
 * @providesModule ListYesterday
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	View,
	StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import {
	getYesterdayItems,
	addYesterdayItems,
	removeYesterdayItems,
	editYesterdayItems,
} from "YesterdayListActions";

import ListItemYesterday from "ListItemYesterday";

import theme from "AppTheme";
/*
*	Displays the list of Yesterdays Items
*/
export class ListYesterday extends Component {

	static propTypes = {

		yesterdaysItems: React.PropTypes.array,
		getYesterdayItems: React.PropTypes.func,
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

		return (

			<View style={styles.card}>
				{this._renderItems ()}
			</View>
		);
	}

	_renderItems () {

		let itemsToRender = [];
		if (this.props.yesterdaysItems !== null && this.props.yesterdaysItems !== undefined && this.props.yesterdaysItems.length > 0) {

			for (let i = 0; i < this.props.yesterdaysItems.length; i++) {

				let yesterdayItem = this.props.yesterdaysItems[i];
				let listItemKey = 'list-item-yesterday-key-' + i;
				itemsToRender.push (<ListItemYesterday key={listItemKey} yesterdayItem={yesterdayItem}/>);
			}
		}

		return itemsToRender;
	}
}

const styles = StyleSheet.create({
	
	card: {

		backgroundColor: theme.white,
		marginLeft: 10,
		marginRight: 10,
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
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	getYesterdayItems: () => dispatch (getYesterdayItems ()),
	addYesterdayItems: () => dispatch (addYesterdayItems ()),
	removeYesterdayItems: () => dispatch (removeYesterdayItems ()),
	editYesterdayItems: () => dispatch (editYesterdayItems ()),
});

export default connect (mapStateToProps,mapDispatchToProps)(ListYesterday);