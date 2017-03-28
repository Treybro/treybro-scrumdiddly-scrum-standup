/**
 * @providesModule AppReducers
 */

import { combineReducers } from "redux";

import tutorialReducer from "TutorialReducer";
import welcomeReducer from "WelcomeReducer";
import yesterdayListReducer from "YesterdayListReducer";
import drawerReducer from "DrawerReducer";
import todayListReducer from "TodayListReducer";
import scrumHistoryReducer from "ScrumHistoryReducer";
import modalReducer from "ModalReducer";

const appReducers = combineReducers ({

	tutorialReducer,
	welcomeReducer,
	yesterdayListReducer,
	todayListReducer,
	drawerReducer,
	scrumHistoryReducer,
	modalReducer,
});

export default appReducers;