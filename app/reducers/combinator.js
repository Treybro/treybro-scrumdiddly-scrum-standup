/**
 * @providesModule AppReducers
 */

import { combineReducers } from "redux";

import tutorialReducer from "./tutorialReducer";
import welcomeReducer from "./welcomeReducer";
import yesterdayListReducer from "YesterdayListReducer";
import drawerReducer from "DrawerReducer";
import todayListReducer from "TodayListReducer";

const appReducers = combineReducers ({

	tutorialReducer,
	welcomeReducer,
	yesterdayListReducer,
	todayListReducer,
	drawerReducer,
});

export default appReducers;