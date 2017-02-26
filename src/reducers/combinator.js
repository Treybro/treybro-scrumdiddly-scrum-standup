/**
 * @providesModule AppReducers
 */

import { combineReducers } from "redux";

import tutorialReducer from "./tutorialReducer";
import welcomeReducer from "./welcomeReducer";
import yesterdayListReducer from "YesterdayListReducer";

const appReducers = combineReducers ({

	tutorialReducer,
	welcomeReducer,
	yesterdayListReducer,
});

export default appReducers;