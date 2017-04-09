/**
 * @providesModule AppReducers
 */

import { combineReducers } from "redux";

import yesterdayListReducer from "YesterdayListReducer";
import drawerReducer from "DrawerReducer";
import todayListReducer from "TodayListReducer";
import scrumHistoryReducer from "ScrumHistoryReducer";
import modalReducer from "ModalReducer";
import scrumSettingsReducer from "ScrumSettingsReducer";

const appReducers = combineReducers ({
	
	yesterdayListReducer,
	todayListReducer,
	drawerReducer,
	scrumHistoryReducer,
	modalReducer,
	scrumSettingsReducer,
});

export default appReducers;