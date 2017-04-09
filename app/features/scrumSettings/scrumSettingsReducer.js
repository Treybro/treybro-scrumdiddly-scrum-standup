/**
 * @providesModule ScrumSettingsReducer
 */

import {

	SET_SCRUM_TIME,
	SET_DAILY_REMINDERS,
	SET_TUTORIAL_COMPLETED,
	RECEIVE_APP_SETTINGS,
} from "ScrumSettingsActions";

//  Default state to prepare for null
const scrumSettingsState = {

	isLoadingAppSettings: true,
	hasViewedTutorial: false,
	userScrumTime: true,
	enableDailyReminders: true,
};

const scrumSettingsReducer = (state = scrumSettingsState, action) => {

	switch (action.type) {

	case RECEIVE_APP_SETTINGS : {

		return {

			...state,
			isLoadingAppSettings: false,
			userScrumTime: action.userSettings.userScrumTime,
			enableDailyReminders: action.userSettings.enableDailyReminders,
			hasViewedTutorial: action.userSettings.hasViewedTutorial,
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
	case SET_TUTORIAL_COMPLETED : {

		return {
			...state,
			hasViewedTutorial: action.toggle,
		};
	}
	default:
		return state;
	}
};

export default scrumSettingsReducer;