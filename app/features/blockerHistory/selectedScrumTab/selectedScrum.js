/**
 * @providesModule SelectedScrum
 */

import React, { Component } from "react";
import {
	
	StyleSheet,
	Platform,
	Image,
} from "react-native";
import { connect } from "react-redux";

import BackButton from "BackButton";
import theme from "AppTheme";
import getIconAsset from "IconAssets";

import SelectedScrumItem from "SelectedScrumItem";

/*
*	Displays the Selected Scrum
*/
export class SelectedScrum extends Component {

	static propTypes = {
		
		displayDetails: React.PropTypes.bool.isRequired,
	};

	//	Navigation bar options
	static navigationOptions = {

		title: "Scrum Blockers",
		header: {

			visible: true,
			left: (

				<BackButton />
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
		tabBar: () => ({

			visible: false,
		}),
	};

	constructor (props) {

		super (props);
	}

	render () {

		if (this.props.displayDetails === false) {

			return null;
		}

		return (

			<SelectedScrumItem />
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

	displayDetails: state.blockerHistoryReducer.displayDetails,
});

export default connect (mapStateToProps, null)(SelectedScrum);