/**
 * @providesModule BlockerHistory
 */

import React, { Component } from "react";
import {

	View,
	Text,
	StyleSheet,
	Platform,
	Image,
	ListView,
} from "react-native";
import { connect } from "react-redux";

import moment from "moment";
import MenuButton from "MenuButton";
import theme from "AppTheme";
import getIconAsset from "IconAssets";

import BlockerHistoryHeader from "BlockerHistoryHeader";
import BlockerHistoryListItem from "BlockerHistoryListItem";
import DateHeader from "DateHeader";
import EmptyBlockerHistory from "EmptyBlockerHistory";

/*
*	Displays the BlockerHistory screen
*/
export class BlockerHistory extends Component {

	static propTypes = {

		currentBlockers: React.PropTypes.array.isRequired,
	};

	//	Navigation bar options
	static navigationOptions = {

		title: "Scrum Blockers",
		header: {

			visible: true,
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
		drawer: () => ({
			icon: ({ tintColor }) => (
				<Image
					source={getIconAsset ("blockerIcon")}
					style={[styles.icon, {tintColor: tintColor}]} />
			),
		}),
	};

	constructor (props) {

		super (props);

		const ds = new ListView.DataSource ({

			rowHasChanged: (r1, r2) => r1 !== r2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
		});

		this.state = {

			ds: ds,
			dataSource: ds.cloneWithRowsAndSections([]),
		};
	}

	componentDidMount () {

		let currentBlockersMap = {};
		this.props.currentBlockers.forEach ((blocker) => {

			if (!currentBlockersMap[blocker.createdAt]) {
				currentBlockersMap[blocker.createdAt] = [];
			}

			currentBlockersMap[blocker.createdAt].push (blocker.itemText);
		});

		this.setState ({

			dataSource: this.state.ds.cloneWithRowsAndSections (currentBlockersMap),
		});
	}

	componentWillReceiveProps (nextProps) {

		if (nextProps.currentBlockers !== undefined && nextProps.currentBlockers !== null) {

			let currentBlockersMap = {};
			nextProps.currentBlockers.forEach ((blocker) => {

				if (!currentBlockersMap[blocker.createdAt]) {
					currentBlockersMap[blocker.createdAt] = [];
				}

				currentBlockersMap[blocker.createdAt].push (blocker.itemText);
			});
			this.setState ({

				dataSource: this.state.ds.cloneWithRowsAndSections (currentBlockersMap),
			});
		}
	}

	render () {

		if (this.props.currentBlockers !== undefined && this.props.currentBlockers !== null && this.props.currentBlockers.length === 0) {

			return (

				<View style={styles.containerView}>
					<DateHeader displayTitle={"Current Blockers"}/>
					<EmptyBlockerHistory />
				</View>
			);
		}

		return (

			<View style={styles.containerView}>
				<DateHeader displayTitle={"Current Blockers"}/>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData) => this._renderRow (rowData)}
					renderSectionHeader={(sectionData, sectionID) => this._renderSection (sectionData, sectionID)} />
			</View>
		);
	}

	_renderSection (sectionData, sectionID) {

		//	Set the date displayString
		let today = moment ().format ("YYYY-MM-DD");
		let suppliedDate = moment (sectionID, "DD-MM-YYYY");
		let displayDate = suppliedDate.format ("MMM Do") + " Blockers";
		if (moment (today).isSame (moment (sectionID, "DD-MM-YYYY"))) {

			displayDate = "Todays Blockers";
		}

		return (

			<BlockerHistoryHeader displayDate={displayDate} />
		);
	}

	_renderRow (rowData) {

		return (

			<BlockerHistoryListItem itemText={rowData} />
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

	currentBlockers: state.blockerHistoryReducer.currentBlockers,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

});

export default connect (mapStateToProps, mapDispatchToProps)(BlockerHistory);