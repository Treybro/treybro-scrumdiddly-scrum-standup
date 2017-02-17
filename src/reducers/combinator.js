/**
 * @providesModule AppReducers
 */

import { combineReducers } from "redux";

import tutorialReducer from "./tutorialReducer";
import drawerReducer from "./drawerReducer";
import welcomeReducer from "./welcomeReducer";
import yesterdayModalReducer from "YesterdayModalReducer";
import todayModalReducer from "TodayModalReducer";
import blockerModalReducer from "BlockerModalReducer";

const appReducers = combineReducers ({

	tutorialReducer,
	drawerReducer,
	welcomeReducer,
	yesterdayModalReducer,
	todayModalReducer,
	blockerModalReducer,
});

export default appReducers;