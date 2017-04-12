/**
 * @providesModule SelectedScrumItem
 */

//	Main React Import
import React, { Component } from "react";
//	React native components
import {

	View,
	StyleSheet,
	ScrollView,
} from "react-native";
import { connect } from "react-redux";

import theme from "AppTheme";
import moment from "moment";

import DateHeader from "DateHeader";
import YesterdayHeader from "YesterdayHeader";
import TodayHeader from "TodayHeader";
import BlockerHeader from "BlockerHeader";
import ScrumHistoryList from "ScrumHistoryList";

class SelectedScrumItem extends Component {

	//	Validate proptypes
	static propTypes = {

		selectedScrumItem: React.PropTypes.object.isRequired,
		displayDate: React.PropTypes.object.isRequired,
	};

	//	Default constructor
	constructor (props) {

		super (props);
	}

	componentDidMount () {

		//	Check for an empty object
		if (Object.keys (this.props.selectedScrumItem).length === 0 && this.props.constructor === Object) {

			this.setState ({

				displayDetails: true,
			});
		} else {

			this.setState ({
				
				emptyObject: false,
				displayDetails: true,
			});
		}
	}

	render () {

		//	Set the date displayString
		let suppliedDate = moment (this.props.displayDate, "YYYY-MM-DD");
		let displayDate = suppliedDate.format ("MMM Do") + " Items";

		//	Display the scrum information
		return (

			<View style={styles.containerView}>
				<DateHeader displayTitle={displayDate}/>
				<ScrollView>
					<YesterdayHeader 
						headerType={"history"}
						isEditable={false}/>
					<ScrumHistoryList 
						scrumItemID={this.props.selectedScrumItem.scrumId} 
						scrumItemScrumDate={this.props.selectedScrumItem.scrumDate}
						itemType={"yesterday"}
						displayDate={this.props.displayDate}/>
					<TodayHeader 
						headerType={"history"}
						isEditable={true}/>
					<ScrumHistoryList 
						scrumItemID={this.props.selectedScrumItem.scrumId} 
						scrumItemScrumDate={this.props.selectedScrumItem.scrumDate}
						itemType={"today"}
						displayDate={this.props.displayDate}/>
					<BlockerHeader 
						headerType={"history"}
						isEditable={false}/>
					<ScrumHistoryList 
						scrumItemID={this.props.selectedScrumItem.scrumId} 
						scrumItemScrumDate={this.props.selectedScrumItem.scrumDate}
						itemType={"blocker"}
						displayDate={this.props.displayDate}/>
				</ScrollView>
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

	displayDate: state.scrumHistoryReducer.selectedScrumDate,
	selectedScrumItem: state.blockerHistoryReducer.selectedScrumItem,
});

export default connect (mapStateToProps,null)(SelectedScrumItem);