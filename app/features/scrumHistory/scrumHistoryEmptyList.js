/**
 * @providesModule EmptyScrumList
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	Text,
	View,
	StyleSheet,
	Platform,
	TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import {

	toggleCreateScrumItem,
} from "ScrumHistoryActions";

import theme from "AppTheme";
import moment from "moment";

/*
*	When the scrum list is empty, this will
*	be displayed
*/
export class EmptyScrumList extends Component {

	static propTypes = {

		itemType: React.PropTypes.string.isRequired,
		displayDate: React.PropTypes.object.isRequired,
		toggleCreateYesterdayItem: React.PropTypes.bool.isRequired,
		toggleCreateTodayItem: React.PropTypes.bool.isRequired,
		toggleCreateScrumItem: React.PropTypes.func.isRequired,
		allowUserToAddItems: React.PropTypes.bool.isRequired,
	};

	constructor (props) {

		super (props);

		let displayDate;
		if (this.props.itemType === "yesterday") {

			displayDate = moment(this.props.displayDate).subtract (1, "days").format ("MMMM Do");
		} else {

			displayDate = moment(this.props.displayDate).format ("MMMM Do");
		}
		this.state = {

			newDisplayDate: displayDate,
		};
	}

	componentDidMount () {

		//	Need to reset after view is refreshed to kick redux
		if (this.props.toggleCreateTodayItem === true) {

			this.props.toggleCreateScrumItem (this.props.itemType, false);
		}

		if (this.props.toggleCreateYesterdayItem === true) {

			this.props.toggleCreateScrumItem (this.props.itemType, false);
		}
	}

	render () {

		//	Tell the user to add a yesterday item
		if (this.props.itemType === "yesterday") {

			//	Don't display if a user is creating an item
			if (this.props.toggleCreateYesterdayItem === true) {

				return null;
			}

			if (this.props.allowUserToAddItems === false) {

				return (

					<View style={styles.containerView}>
						<Text style={styles.emptyText}>Completed items from {this.state.newDisplayDate} will be displayed here.</Text>
					</View>
				);	
			}

			return (

				<TouchableOpacity onPress={() => this.props.toggleCreateScrumItem (this.props.itemType, true)}>
					<View style={styles.containerView}>
						<Text style={styles.emptyText}>You did not complete anything on {this.state.newDisplayDate}, add an item to show how busy you were!</Text>
					</View>
				</TouchableOpacity>
			);
		}

		//	Don't display if a user is creating an item
		if (this.props.toggleCreateTodayItem === true) {

			return null;
		}

		if (this.props.allowUserToAddItems === false) {

			return (

				<View style={styles.containerView}>
					<Text style={styles.emptyText}>You did not complete anything on {this.state.newDisplayDate}, add an item to show how busy you were!</Text>
				</View>
			);	
		}

		//	Standard view
		return (

			<TouchableOpacity onPress={() => this.props.toggleCreateScrumItem (this.props.itemType, true)}>
				<View style={styles.containerView}>
					<Text style={styles.emptyText}>You did not complete anything on {this.state.newDisplayDate}, add an item to show how busy you were!</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	
	containerView: {

		flex: 1,
		backgroundColor: theme.white,
		margin: 10,
		padding: 0,
	},
	emptyText: {

		fontFamily: (Platform.OS === "ios") ? "Helvetica" : "Roboto",
		color: theme.lightGrey,
		fontSize: (Platform.OS === "ios") ? 16 : 14,
		marginTop: (Platform.OS === "ios") ? 10 : 0,
		marginLeft: (Platform.OS === "ios") ? 20 : 20,
		marginRight: (Platform.OS === "ios") ? 20 : 20,
		alignSelf: "center",
	},
});

/*
* Mapping for redux state.
*/
const mapStateToProps = state => ({

	toggleCreateYesterdayItem: state.scrumHistoryReducer.toggleCreateYesterdayItem,
	toggleCreateTodayItem: state.scrumHistoryReducer.toggleCreateTodayItem,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	toggleCreateScrumItem: (itemType, toggle) => dispatch (toggleCreateScrumItem (itemType, toggle)),
});

export default connect (mapStateToProps, mapDispatchToProps)(EmptyScrumList);