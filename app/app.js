/**
 * @providesModule App
 */

import React, { Component } from "react";
import {

	StyleSheet,
	View,
} from "react-native";
import { connect } from "react-redux";

import { getAppSettings } from "ScrumSettingsActions";
import { getScrumBlockers } from "BlockerHistoryActions";

import AppDrawer from "AppDrawer";
import LoadingScreen from "LoadingScreen";
import TutorialScreen from "TutorialScreen";

//	App modals
import DeleteScrumItemPopup from "DeleteScrumItemPopup";
import BlockedErrorPopup from "BlockedErrorPopup";
import CompletedErrorPopup from "CompletedErrorPopup";
import DeleteErrorPopup from "DeleteErrorPopup";
import BlockerPopup from "BlockerPopup";

/*
* App Root
* Handles navigation before entering the app itself
* ie. Displays loading/tutorial/welcome screen
*/
class App extends Component {

	static propTypes = {

		isLoadingAppSettings: React.PropTypes.bool.isRequired,
		hasViewedTutorial: React.PropTypes.bool.isRequired,
		getAppSettings: React.PropTypes.func.isRequired,
		getScrumBlockers: React.PropTypes.func.isRequired,
	};

	constructor (props) {

		super (props);
	}

	componentDidMount () {

		//	Get the users settings
		this.props.getAppSettings ();
		//	Get all the current blockers for the user
		this.props.getScrumBlockers ();
	}

	render () {

		//  Are we loading?
		if (this.props.isLoadingAppSettings === true) {

			return <LoadingScreen />;
		}

		//  First time app open?
		if (this.props.hasViewedTutorial === false) {

			return <TutorialScreen />;
		}

		//	Last option - show the app
		return (

			<View style={styles.containerView}>
				<DeleteScrumItemPopup />
				<BlockedErrorPopup />
				<CompletedErrorPopup />
				<DeleteErrorPopup />
				<BlockerPopup />
				<AppDrawer />
			</View>
		);
	}
}

const styles = StyleSheet.create({

	containerView: {

		flex: 1,
	},
});

/*
* Mapping for redux state.
* hasViewedTutorial is used throughout the entire app
* mapping it to redux so we can share the state across
* components.
*/
const mapStateToProps = state => ({

	isLoadingAppSettings: state.scrumSettingsReducer.isLoadingAppSettings,
	hasViewedTutorial: state.scrumSettingsReducer.hasViewedTutorial,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	getAppSettings: () => dispatch (getAppSettings ()),
	getScrumBlockers: () => dispatch (getScrumBlockers ()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);