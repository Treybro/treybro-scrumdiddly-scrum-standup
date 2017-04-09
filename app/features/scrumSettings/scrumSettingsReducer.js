/**
 * @providesModule ScrumSettingsReducer
 */

import {

	SET_SCRUM_TIME,
	SET_DAILY_REMINDERS,
	RECEIVE_APP_SETTINGS,
} from "ScrumSettingsActions";

//  Default state to prepare for null
const scrumSettingsState = {

	userScrumTime: true,
	enableDailyReminders: true,
};

const scrumSettingsReducer = (state = scrumSettingsState, action) => {

	switch (action.type) {

	case RECEIVE_APP_SETTINGS : {
		
		return {

			...state,
			userScrumTime: action.userSettings.userScrumTime,
			enableDailyReminders: action.userSettings.enableDailyReminders,
		};
	}
	case SET_SCRUM_TIME : {

		return {

			...state,
			userScrumTime: action.toggle,
		};
	}
	case SET_DAILY_REMINDERS : {

		return {

			...state,
			enableDailyReminders: action.toggle,
		};
	}
	default:
		return state;
	}
};

export default scrumSettingsReducer;