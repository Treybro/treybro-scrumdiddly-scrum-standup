/**
 * @providesModule ScrumSettingsActions
 */

import { AsyncStorage } from "react-native";
export const RECEIVE_APP_SETTINGS = "RECEIVE_APP_SETTINGS";
export const SET_SCRUM_TIME = "SET_SCRUM_TIME";
export const SET_DAILY_REMINDERS = "SET_DAILY_REMINDERS";

//	Get the users settings
export function getAppSettings () {

	return function (dispatch) {

		return AsyncStorage.getItem ("scrumdiddly").then (function (results) {
			
			//	Convert to JSON object
			let appSavedStates = results;
			if (appSavedStates === undefined || appSavedStates === null || appSavedStates.length === 0) {

				appSavedStates = {

					"dailyscrums": [],
					"userSettings": {},
				};
			} else {

				appSavedStates = JSON.parse (appSavedStates);
			}
			let userSettings = appSavedStates.userSettings;

			//	Validate settings
			if (userSettings === undefined || userSettings === null) {

				userSettings = {
					userScrumTime: true,
					enableDailyReminders: true,
				};
			}

			if (userSettings.userScrumTime === undefined || userSettings.userScrumTime === null) {
				userSettings.userScrumTime = true;
			}

			if (userSettings.enableDailyReminders === undefined || userSettings.enableDailyReminders === null) {
				userSettings.enableDailyReminders = true;
			}

			dispatch (receiveAppSettings (userSettings));
		});
	};
}

//	Receive the app settings
export function receiveAppSettings (userSettings) {

	return {

		type: RECEIVE_APP_SETTINGS,
		userSettings,
	};
}

//	Toggle the display time
export function toggleScrumTime (toggle) {

	return function (dispatch) {

		dispatch (setScrumTime (toggle));
		return AsyncStorage.getItem ("scrumdiddly").then (function (results) {
			
			//	Convert to JSON object
			let appSavedStates = results;
			if (appSavedStates === undefined || appSavedStates === null || appSavedStates.length === 0) {

				appSavedStates = {

					"dailyscrums": [],
					"userSettings": {},
				};
			} else {

				appSavedStates = JSON.parse (appSavedStates);
			}
			let userSettings = appSavedStates.userSettings;

			if (userSettings === undefined || userSettings === null) {

				userSettings = {
					userScrumTime: toggle,
				};
			} else {

				userSettings.userScrumTime = toggle;
			}

			appSavedStates.userSettings = userSettings;

			return AsyncStorage.mergeItem ("scrumdiddly", JSON.stringify (appSavedStates));
		}).then (function () {

			console.log ("User Settings Saved");
		});
	};
}

//	Set morning/evening
export function setScrumTime (toggle) {

	return {

		type: SET_SCRUM_TIME,
		toggle,
	};
}

//	Toggle the enableDailyReminders
export function toggleDailyReminders (toggle) {

	return function (dispatch) {

		dispatch (setDailyReminders (toggle));
		return AsyncStorage.getItem ("scrumdiddly").then (function (results) {
			
			//	Convert to JSON object
			let appSavedStates = results;
			if (appSavedStates === undefined || appSavedStates === null || appSavedStates.length === 0) {

				appSavedStates = {

					"dailyscrums": [],
					"userSettings": {},
				};
			} else {

				appSavedStates = JSON.parse (appSavedStates);
			}
			let userSettings = appSavedStates.userSettings;

			if (userSettings === undefined || userSettings === null) {

				userSettings = {
					enableDailyReminders: toggle,
				};
			} else {

				userSettings.enableDailyReminders = toggle;
			}

			appSavedStates.userSettings = userSettings;

			return AsyncStorage.mergeItem ("scrumdiddly", JSON.stringify (appSavedStates));
		}).then (function () {

			console.log ("User Settings Saved");
		});
	};
}

//	Set the enableDailyReminders toggle
export function setDailyReminders (toggle) {

	return {

		type: SET_DAILY_REMINDERS,
		toggle,
	};
}