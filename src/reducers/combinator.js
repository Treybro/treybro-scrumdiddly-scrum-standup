/**
 * @providesModule AppReducers
 */

import { combineReducers } from "redux";

import tutorialReducer from "./tutorialReducer";
import drawerReducer from "./drawerReducer";
import welcomeReducer from "./welcomeReducer";
import yesterdayModalReducer from "YesterdayModalReducer";

const appReducers = combineReducers ({

	tutorialReducer,
	drawerReducer,
	welcomeReducer,
	yesterdayModalReducer,
});

export default appReducers;