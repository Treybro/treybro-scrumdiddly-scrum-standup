/**
 * @providesModule AppSetup
 */

import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import appReducers from "AppReducers";

import App from "App";

const store = createStore(appReducers);

/*
* Responsible for configuring middleware
* to be used by the entire app
*
* TODO - create different component to handle the store
* creation process
*/
class AppSetup extends Component {

	constructor (props) {

		super (props);
	}

	render () {

		return (

			//  Redux provider for our app
			<Provider store={store}>
				{/* Our app root component */}
				<App />
			</Provider>
		);
	}
}

export default AppSetup;