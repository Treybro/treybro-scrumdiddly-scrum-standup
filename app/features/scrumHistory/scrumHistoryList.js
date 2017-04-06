/**
 * @providesModule ScrumHistoryList
 */

//	Main React Import
import React, { Component } from "react";
//	React native components
import {

	View,
	StyleSheet,
	Text,
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
		scrumItemScrumDate: React.PropTypes.string.isRequired,
		itemType: React.PropTypes.string.isRequired,
		getScrumItemsForId: React.PropTypes.func.isRequired,
		scrumYesterdayItems: React.PropTypes.array.isRequired,
		scrumTodayItems: React.PropTypes.array.isRequired,
		scrumBlockerItems: React.PropTypes.array.isRequired,
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
							itemType={this.props.itemType}
							scrumItemID={this.props.scrumItemID}
							scrumItemScrumDate={this.props.scrumItemScrumDate}/>
						<EmptyScrumList
							itemType={this.props.itemType}
							displayDate={this.props.displayDate}
							allowUserToAddItems={false}/>
					</View>
				);
			}

			return (

				<View style={styles.containerView}>
					<CreateScrumItem 
						itemType={this.props.itemType}
						scrumItemID={this.props.scrumItemID}
						scrumItemScrumDate={this.props.scrumItemScrumDate}/>
					{
						this.props.scrumYesterdayItems.map ((yesterdayItem) => (

							<ScrumHistoryListItem 
								key={"list-item-yesterday-key-" + yesterdayItem.id}
								scrumId={this.props.scrumItemID}
								listItem={yesterdayItem}
								userCanEditContents={false}
								/>
						))
					}
				</View>
			);
		} else if (this.props.itemType === "today") {

			// Do we have any items to display?
			if (this.props.scrumTodayItems === undefined || this.props.scrumTodayItems === null || this.props.scrumTodayItems.length === 0) {

				return (

					<View style={styles.card}>
						<CreateScrumItem 
							itemType={this.props.itemType}
							scrumItemID={this.props.scrumItemID}
							scrumItemScrumDate={this.props.scrumItemScrumDate}/>
						<EmptyScrumList
							itemType={this.props.itemType}
							displayDate={this.props.displayDate}
							allowUserToAddItems={true}/>
					</View>
				);
			}

			return (

				<View style={styles.containerView}>
					<CreateScrumItem 
						itemType={this.props.itemType}
						scrumItemID={this.props.scrumItemID}
						scrumItemScrumDate={this.props.scrumItemScrumDate}/>
					{
						this.props.scrumTodayItems.map ((todayItem) => (

							<ScrumHistoryListItem 
								key={"list-item-today-key-" + todayItem.id}
								scrumId={this.props.scrumItemID}
								listItem={todayItem}
								userCanEditContents={true}
								/>
						))
					}
				</View>
			);
		} else {

			// Do we have any items to display?
			if (this.props.scrumBlockerItems === undefined || this.props.scrumBlockerItems === null || this.props.scrumBlockerItems.length === 0) {

				return (

					<View style={styles.card}>
						<EmptyScrumList
							itemType={this.props.itemType}
							displayDate={this.props.displayDate}
							allowUserToAddItems={false}/>
					</View>
				);
			}

			return (

				<View style={styles.containerView}>
					{
						this.props.scrumBlockerItems.map ((blockerItem) => (

							<ScrumHistoryListItem 
								key={"list-item-blocker-key-" + blockerItem.id}
								scrumId={this.props.scrumItemID}
								listItem={blockerItem}
								userCanEditContents={false}
								/>
						))
					}
				</View>
			);
		}
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
	scrumBlockerItems: state.scrumHistoryReducer.scrumBlockerItems,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	getScrumItemsForId: (scrumId, itemType) => dispatch (getScrumItemsForId (scrumId, itemType)),
});

export default connect (mapStateToProps,mapDispatchToProps)(ScrumHistoryList);