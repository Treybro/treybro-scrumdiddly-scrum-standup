/**
 * @providesModule ScrumHistoryList
 */

//	Main React Import
import React, { Component } from "react";
//	React native components
import {

	View,
	StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import {

	getScrumItemsForId,
} from "ScrumHistoryActions";

import theme from "AppTheme";

import ScrumHistoryListItem from "ScrumHistoryListItem";
import CreateScrumItem from "CreateScrumItem";
import EmptyScrumList from "EmptyScrumList";

class ScrumHistoryList extends Component {

	//	Validate proptypes
	static propTypes = {

		displayDate: React.PropTypes.object.isRequired,
		scrumItemID: React.PropTypes.number.isRequired,
		itemType: React.PropTypes.string.isRequired,
		getScrumItemsForId: React.PropTypes.func.isRequired,
		scrumYesterdayItems: React.PropTypes.array.isRequired,
		scrumTodayItems: React.PropTypes.array.isRequired,
	};

	//	Default constructor
	constructor (props) {

		super (props);
	}

	componentDidMount () {

		this.props.getScrumItemsForId (this.props.scrumItemID, this.props.itemType);
	}

	render () {

		//	Wanna display yesterday items?
		if (this.props.itemType === "yesterday") {

			// Do we have any items to display?
			if (this.props.scrumYesterdayItems === undefined || this.props.scrumYesterdayItems === null || this.props.scrumYesterdayItems.length === 0) {

				return (

					<View style={styles.card}>
						<CreateScrumItem 
							itemType={this.props.itemType}/>
						<EmptyScrumList
							itemType={this.props.itemType}
							displayDate={this.props.displayDate}/>
					</View>
				);
			}

			return (

				<View style={styles.containerView}>
					{
						this.props.scrumYesterdayItems.map ((yesterdayItem) => (

							<ScrumHistoryListItem 
								key={"list-item-yesterday-key-" + yesterdayItem.id}
								scrumId={this.props.scrumItemID}
								listItem={yesterdayItem}
								/>
						))
					}
				</View>
			);
		}

		// Do we have any items to display?
		if (this.props.scrumTodayItems === undefined || this.props.scrumTodayItems === null || this.props.scrumTodayItems.length === 0) {

			return (

				<View style={styles.card}>
					<CreateScrumItem 
						itemType={this.props.itemType}/>
					<EmptyScrumList
						itemType={this.props.itemType}
						displayDate={this.props.displayDate}/>
				</View>
			);
		}

		return (

			<View style={styles.containerView}>
				{
					this.props.scrumTodayItems.map ((todayItem) => (

						<ScrumHistoryListItem 
							key={"list-item-today-key-" + todayItem.id}
							scrumId={this.props.scrumItemID}
							listItem={todayItem}
							/>
					))
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({

	containerView: {

		flex: 1,
		backgroundColor: theme.white,
	},
});

/*
* Mapping for redux state.
*/
const mapStateToProps = state => ({

	scrumYesterdayItems: state.scrumHistoryReducer.scrumYesterdayItems,
	scrumTodayItems: state.scrumHistoryReducer.scrumTodayItems,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	getScrumItemsForId: (scrumId, itemType) => dispatch (getScrumItemsForId (scrumId, itemType)),
});

export default connect (mapStateToProps,mapDispatchToProps)(ScrumHistoryList);