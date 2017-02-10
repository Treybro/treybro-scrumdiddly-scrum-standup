/**
 * @providesModule App
 */

import React, { Component } from "react";
import { connect } from "react-redux";

import appSettings from "AppSettings";

import LoadingScreen from "LoadingScreen";
import WelcomeScreen from "WelcomeScreen";
import TutorialScreen from "TutorialScreen";
import RootNavigation from "RootTabNavigation";

/*
* App Root
* Handles navigation before entering the app itself
* ie. Displays loading/tutorial/welcome screen
*/
class App extends Component {

	static propTypes = {

		hasViewedTutorial: React.PropTypes.bool,
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
		return <RootNavigation />;
	}

	//  Tell the component to stop loading
	_stopLoading = () => {
		
		this.setState ({

			isLoading: false,
		});
	};
}

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