/**
 * @providesModule ScrumHistoryItem
 */

//	Main React Import
import React, { Component } from "react";
//	React native components
import {

	View,
	StyleSheet,
	Text,
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

class ScrumHistoryItem extends Component {

	//	Validate proptypes
	static propTypes = {

		scrumItem: React.PropTypes.object.isRequired,
		displayDate: React.PropTypes.object.isRequired,
	};

	//	Default constructor
	constructor (props) {

		super (props);

		this.state = {

			emptyObject: true,
			displayDetails: false,
		};
	}

	componentDidMount () {

		//	Check for an empty object
		if (Object.keys (this.props.scrumItem).length === 0 && this.props.constructor === Object) {

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

		//	Have we decided to display the scrum info?
		if (this.state.displayDetails === false) {

			return (

				//	TODO add animation or something to show loading
				<View style={styles.containerView}>
					<Text>Loading scrum information</Text>
				</View>
			);
		}

		//	Set the date displayString
		let suppliedDate = moment (this.props.displayDate, "YYYY-MM-DD");
		let displayDate = suppliedDate.format ("MMM Do") + " Items";

		//	Has a scrum actually been selected?
		if (this.state.emptyObject === true) {

			return (

				<View style={styles.containerView}>
					<DateHeader displayTitle={displayDate}/>
					<Text>No scrum selected</Text>
				</View>
			);
		}

		//	Display the scrum information
		return (

			<View style={styles.containerView}>
				<DateHeader displayTitle={displayDate}/>
				<ScrollView>
					<YesterdayHeader 
						headerType={"history"}
						isEditable={false}/>
					<ScrumHistoryList 
						scrumItemID={this.props.scrumItem.scrumId} 
						scrumItemScrumDate={this.props.scrumItem.scrumDate}
						itemType={"yesterday"}
						displayDate={this.props.displayDate}/>
					<TodayHeader 
						headerType={"history"}
						isEditable={true}/>
					<ScrumHistoryList 
						scrumItemID={this.props.scrumItem.scrumId} 
						scrumItemScrumDate={this.props.scrumItem.scrumDate}
						itemType={"today"}
						displayDate={this.props.displayDate}/>
					<BlockerHeader 
						headerType={"history"}
						isEditable={false}/>
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
});

export default connect (mapStateToProps,null)(ScrumHistoryItem);