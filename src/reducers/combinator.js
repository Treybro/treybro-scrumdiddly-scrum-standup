/**
 * @providesModule AppReducers
 */

import { combineReducers } from "redux";

import tutorialReducer from "./tutorialReducer";
import drawerReducer from "./drawerReducer";
import welcomeReducer from "./welcomeReducer";

const appReducers = combineReducers ({

	tutorialReducer,
	drawerReducer,
	welcomeReducer
});

export default appReducers;