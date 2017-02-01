import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import toDoApp from "./reducers/tutorialReducer";
import toDoApp2 from "./reducers/drawerReducer";

import App from "./App";

const appReducers = combineReducers ({

	toDoApp,
	toDoApp2
})

let store = createStore(appReducers);

/*
* Responsible for configuring middleware
* to be used by the entire app
*
* TODO - create different component to handle the store
* creation process
*/
class Setup extends Component {

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

export default Setup;