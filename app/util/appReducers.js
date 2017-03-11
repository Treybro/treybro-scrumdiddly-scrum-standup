/**
 * @providesModule AppReducers
 */

import { combineReducers } from "redux";

import tutorialReducer from "TutorialReducer";
import welcomeReducer from "WelcomeReducer";
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