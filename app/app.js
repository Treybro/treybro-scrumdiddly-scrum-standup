/**
 * @providesModule App
 */

import React, { Component } from "react";
import {

	StyleSheet,
	View,
} from "react-native";
import { connect } from "react-redux";

import appSettings from "AppSettings";

import AppDrawer from "AppDrawer";
import LoadingScreen from "LoadingScreen";
import WelcomeScreen from "WelcomeScreen";
import TutorialScreen from "TutorialScreen";

//	App modals
import DeleteScrumItemPopup from "DeleteScrumItemPopup";

/*
* App Root
* Handles navigation before entering the app itself
* ie. Displays loading/tutorial/welcome screen
*/
class App extends Component {

	static propTypes = {

		hasViewedTutorial: React.PropTypes.bool.isRequired,
		enterButtonPressed: React.PropTypes.bool.isRequired,
	};

	constructor (props) {

		super (props);
		//  Spoof loading screen
		//  TODO add this to redux - reducer/action
		this.state = {

			isLoading: true,
		};

		//  Set timer for loading screen
		var intervalReference = setInterval (() => {

			this._stopLoading ();
			//  Cancel the loading timer
			clearInterval(intervalReference);
		}, appSettings.appLoadingTime);
	}

	render () {

		//  Are we loading?
		if (this.state.isLoading === true) {

			return <LoadingScreen />;
		}

		//  First time app open?
		if (this.props.hasViewedTutorial === false) {

			return <TutorialScreen />;
		}

		//	Display welcome screen?
		if (this.props.enterButtonPressed === false) {

			return <WelcomeScreen />;
		}

		//	Last option - show the app
		return (

			<View style={styles.containerView}>
				<DeleteScrumItemPopup />
				<AppDrawer />
			</View>
		);
	}

	//  Tell the component to stop loading
	_stopLoading = () => {
		
		this.setState ({

			isLoading: false,
		});
	};
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

	hasViewedTutorial: state.tutorialReducer.hasViewedTutorial,
	enterButtonPressed: state.welcomeReducer.enterButtonPressed,
});

export default connect(mapStateToProps)(App);