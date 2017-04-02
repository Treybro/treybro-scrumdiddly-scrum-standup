/**
 * @providesModule ScrumHistory
 */

import React, { Component } from "react";
import {

	View,
	Text,
	StyleSheet,
	Platform,
} from "react-native";

import { connect } from "react-redux";
import {

	getScrumHistory,
	getScrumForDate,
	toggleCalendar,
} from "ScrumHistoryActions";

import ScrumHistoryItem from "ScrumHistoryItem";
import MenuButton from "MenuButton";
import CalendarButton from "CalendarButton";
import theme from "AppTheme";
import { customCalandarStyle } from "AppTheme";

import Calendar from "react-native-calendar";

/*
*	Displays the scrum history screen
*/
class ScrumHistory extends Component {

	static propTypes = {

		isLoadingHistory: React.PropTypes.bool.isRequired,
		eventDates: React.PropTypes.array.isRequired,
		getScrumHistory: React.PropTypes.func.isRequired,
		getScrumForDate: React.PropTypes.func.isRequired,
		selectedScrumItem: React.PropTypes.object.isRequired,
		isSearchingForScrum: React.PropTypes.bool.isRequired,
		displayCalendar: React.PropTypes.bool.isRequired,
		toggleCalendar: React.PropTypes.func.isRequired,
	};

	//	Navigation bar options
	static navigationOptions = {

		title: "Scrum History",
		header: {

			visible: true,
			right: (

				<CalendarButton />
			),
			left: (

				<MenuButton />
			),
			style: {

				backgroundColor:theme.pink,
				height: (Platform.OS === "ios") ? 75 : 55,
			},
			titleStyle: {

				color:theme.white,
				marginLeft: (Platform.OS === "ios") ? 0 : 30,
			},
			tintColor: {},
		},
	};

	constructor (props) {

		super (props);
	}

	componentDidMount () {

		//	Get the scrum history
		//	TODO - get this into app setup or something
		this.props.getScrumHistory ();
	}

	render () {

		//	Display loading view while we are loading the users history
		if (this.props.isLoadingHistory === true) {

			/*
			*	TODO - make a loading thingie
			*/
			return (

				<View stlye={styles.containerView}>
					<Text>Loading History</Text>
				</View>
			);
		}

		if (this.props.displayCalendar) {

			return (

				<View style={styles.containerView}>
					<Calendar
						ref="calendar"
						scrollEnabled={false}
						eventDates={this.props.eventDates}
						showControls={true}
						showEventIndicators={true}
						titleFormat={"MMMM YYYY"}
						onDateSelect={(date) => this._collapseCalendar (date)}
						customStyle={customCalandarStyle} />
				</View>
			);
		}

		return (

			<ScrumHistoryItem scrumItem={this.props.selectedScrumItem}/>
		);
	}

	_collapseCalendar (date) {

		this.props.getScrumForDate (date);
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

	isLoadingHistory: state.scrumHistoryReducer.isLoadingHistory,
	eventDates: state.scrumHistoryReducer.eventDates,
	selectedScrumItem: state.scrumHistoryReducer.selectedScrumItem,
	isSearchingForScrum: state.scrumHistoryReducer.isSearchingForScrum,
	displayCalendar: state.scrumHistoryReducer.displayCalendar,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	getScrumHistory: () => dispatch (getScrumHistory ()),
	getScrumForDate: (date) => dispatch (getScrumForDate (date)),
	toggleCalendar: () => dispatch (toggleCalendar ()),
});

export default connect (mapStateToProps,mapDispatchToProps)(ScrumHistory);