/**
 * @providesModule ScrumHistory
 */

import React, { Component } from "react";
import {

	View,
	Text,
	StyleSheet,
	Platform,
	ListView,
} from "react-native";

import { connect } from "react-redux";
import {

	getScrumHistory,
} from "ScrumHistoryActions";

import MenuButton from "MenuButton";
import theme from "AppTheme";
import { customCalandarStyle } from "AppTheme";

import HistoryListItem from "HistoryListItem";
import HistorySectionHeader from "HistorySectionHeader";

import Calendar from "react-native-calendar";

/*
*	Displays the scrum history screen
*/
class ScrumHistory extends Component {

	static propTypes = {

		isLoadingHistory: React.PropTypes.bool.isRequired,
		scrumData: React.PropTypes.object.isRequired,
		eventDates: React.PropTypes.array.isRequired,
		getScrumHistory: React.PropTypes.func.isRequired,
	};

	//	Navigation bar options
	static navigationOptions = {

		title: "Scrum History",
		header: {

			visible: true,
			right: () => {},
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
		const ds = new ListView.DataSource ({

			rowHasChanged: (r1, r2) => r1 !== r2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
		});

		this.state = {

			ds: ds,
			dataSource: ds.cloneWithRowsAndSections (this.props.scrumData),
		};
	}

	componentDidMount () {

		//	Get the scrum history
		//	TODO - get this into app setup or something
		this.props.getScrumHistory ();
	}

	componentWillReceiveProps (nextProps) {

		this.setState ({

			dataSource: this.state.ds.cloneWithRowsAndSections (nextProps.scrumData),
		});
	}

	render () {

		//	Display loading view while we are loading the users history
		if (this.props.isLoadingHistory === true) {

			return (

				<View stlye={styles.containerView}>
					<Text>Loading History</Text>
				</View>
			);
		}

		return (

			<View style={styles.containerView}>
				<View style={styles.calandarContainer}>
					<Calendar
						ref="calendar"
						eventDates={this.props.eventDates}
						showControls={true}
						showEventIndicators={true}
						titleFormat={"MMMM YYYY"}
						onDateSelect={(date) => console.log (date)}
						customStyle={customCalandarStyle} />
				</View>
			</View>
		);

		return (

			<View style={styles.containerView}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData) => <HistoryListItem historyDetails={rowData} />}
					renderSectionHeader={(sectionData, sectionID) => <HistorySectionHeader headerText={sectionID} />} />
			</View>
		);
	}
}

const styles = StyleSheet.create({

	containerView: {

		flex: 1,
		backgroundColor: theme.white,
	},
	calandarContainer: {

		flex: 1,
	},
});

/*
* Mapping for redux state.
*/
const mapStateToProps = state => ({

	isLoadingHistory: state.scrumHistoryReducer.isLoadingHistory,
	scrumData: state.scrumHistoryReducer.scrumData,
	eventDates: state.scrumHistoryReducer.eventDates,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	getScrumHistory: () => dispatch (getScrumHistory ()),
});

export default connect (mapStateToProps,mapDispatchToProps)(ScrumHistory);