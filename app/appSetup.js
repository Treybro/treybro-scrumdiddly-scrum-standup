/**
 * @providesModule AppSetup
 */

import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "ConfigureStore";

import App from "App";

const reduxStore = configureStore ();

/*
* Responsible for configuring middleware
* to be used by the entire app
*/
class AppSetup extends Component {

	constructor (props) {

		super (props);
	}

	render () {

		return (

			//  Redux provider for our app
			<Provider store={reduxStore}>
				{/* Our app root component */}
				<App />
			</Provider>
		);
	}
}

export default AppSetup;