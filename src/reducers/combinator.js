/**
 * @providesModule AppReducers
 */

import { combineReducers } from "redux";

import tutorialReducer from "./tutorialReducer";
import drawerReducer from "./drawerReducer";
import welcomeReducer from "./welcomeReducer";
import yesterdayListReducer from "YesterdayListReducer";

const appReducers = combineReducers ({

	tutorialReducer,
	drawerReducer,
	welcomeReducer,
	yesterdayListReducer,
});

export default appReducers;