/**
 * @providesModule ScrumSettingsReducer
 */

import {

	SET_SCRUM_TIME,
	RECEIVE_APP_SETTINGS,
} from "ScrumSettingsActions";

//  Default state to prepare for null
const scrumSettingsState = {

	userScrumTime: true,
};

const scrumSettingsReducer = (state = scrumSettingsState, action) => {

	switch (action.type) {

	case RECEIVE_APP_SETTINGS : {

		return {

			userScrumTime: action.userSettings.userScrumTime,
		};
	}
	case SET_SCRUM_TIME : {

		return {

			...state,
			userScrumTime: action.toggle,
		};
	}
	default:
		return state;
	}
};

export default scrumSettingsReducer;