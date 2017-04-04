/**
 * @providesModule BlockerList
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

	getBlockerItems,
} from "TodayListActions";

import BlockerListItem from "BlockerListItem";
import EmptyBlockerList from "EmptyBlockerList";

import theme from "AppTheme";

/*
*	Displays the list of Todays blocked items
*/
export class BlockerList extends Component {

	static propTypes = {

		blockerItems: React.PropTypes.array.isRequired,
		getBlockerItems: React.PropTypes.func.isRequired,
		displayCreateTodayItem: React.PropTypes.bool,
		isFetchingBlockerItems: React.PropTypes.bool,
	};

	constructor (props) {

		super (props);

		/*
		*	TODO - get this into app setup or something
		*/
		//	Get a list of all the users today items
		this.props.getBlockerItems ();
	}

	render () {

		//	Are we loading items?
		//	TODO - test this with a network request
		if (this.props.isFetchingBlockerItems === true) {

			return (

				//	TODO - put a loading icon here or something
				<Text>Loading Items</Text>
			);
		}

		// Do we have any items to display?
		if (this.props.blockerItems === undefined || this.props.blockerItems === null || this.props.blockerItems.length === 0) {

			return (

				<View style={styles.card}>
					<EmptyBlockerList />
				</View>
			);
		}
		
		//	Standard view
		return (

			<View style={styles.card}>
				{
					this.props.blockerItems.map ((blockerItem) => (

						<BlockerListItem key={"list-item-blocker-key-" + blockerItem.id} blockerItem={blockerItem} />
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
	},
});

/*
* Mapping for redux state.
*/
const mapStateToProps = state => ({

	blockerItems: state.todayListReducer.blockerItems,
	isFetchingBlockerItems: state.todayListReducer.isFetchingBlockerItems,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	getBlockerItems: () => dispatch (getBlockerItems ()),
});

export default connect (mapStateToProps,mapDispatchToProps)(BlockerList);