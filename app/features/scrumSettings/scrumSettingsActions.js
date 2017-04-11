/**
 * @providesModule ScrumSettingsActions
 */

import { 
	AsyncStorage,
	Platform,
	PushNotificationIOS,
} from "react-native";
import PushNotification from "react-native-push-notification";
import moment from "moment";

export const RECEIVE_APP_SETTINGS = "RECEIVE_APP_SETTINGS";
export const SET_SCRUM_TIME = "SET_SCRUM_TIME";
export const SET_DAILY_REMINDERS = "SET_DAILY_REMINDERS";
export const SET_TUTORIAL_COMPLETED = "SET_TUTORIAL_COMPLETED";
export const REQUEST_PUSH_PERMISSIONS = "REQUEST_PUSH_PERMISSIONS";
export const CANCEL_PUSH_NOTIFICATIONS = "CANCEL_PUSH_NOTIFICATIONS";
export const SCHEDULE_PUSH_NOTIFICATIONS = "SCHEDULE_PUSH_NOTIFICATIONS";

PushNotification.configure ({

	requestPermissions: false,
	permissions: {

		alert: true,
		badge: true,
		sound: true,
	},
	popInitialNotification: true,

	onNotification: function (notification) {

		console.log( "NOTIFICATION : ", notification);
	},
});

/**
PushNotification.localNotification ({

	// Android Only Properties
	autoCancel: true, // (optional) default: true
	largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
	smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
	bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
	subText: "This is a subText", // (optional) default: none
	color: "red", // (optional) default: system default
	vibrate: true, // (optional) default: true
	vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
	tag: "some_tag", // (optional) add tag to message
	group: "group", // (optional) add group to message
	ongoing: false, // (optional) set whether this is an "ongoing" notification

	// iOS and Android properties
	title: "It's almost standup time!", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
	message: "Don't forget to fill out your scrum details.", // (required)
	playSound: true, // (optional) default: true
	soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
	repeatType: "time", // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
	repeatTime: 1000,
	date: new Date (Date.now() + (10 * 1000)),
});
**/

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
					hasViewedTutorial: false,
					userScrumTime: true,
					enableDailyReminders: true,
				};
			}

			if (userSettings.hasViewedTutorial === undefined || userSettings.hasViewedTutorial === null) {
				userSettings.hasViewedTutorial = false;
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

//	Tell the app if the user has completed the tutorial or not
export function setTutorialCompleted (toggle) {

	return {

		type: SET_TUTORIAL_COMPLETED,
		toggle,
	};
}

//	Ask app for push notification permissions
export function requestPermissions () {

	if (Platform.OS === "ios") {

		PushNotification.requestPermissions ();
		/**
		console.log ("Hello?");
		PushNotification.abandonPermissions ();
		PushNotification.requestPermissions ();
		PushNotification.checkPermissions ((permissions) => {

			console.log (permissions);
		});
		PushNotification.getApplicationIconBadgeNumber ((number) => {

			console.log (number);
		});
		**/
	}
	return {

		type: REQUEST_PUSH_PERMISSIONS,
	};
}

//	Cancel all push notifications
export function cancelPushNotifications () {

	PushNotification.cancelAllLocalNotifications ();
	return {

		type: CANCEL_PUSH_NOTIFICATIONS,
	};
}

//	Schedule daily notifications
export function schedulePushNotifications () {

	if (Platform.OS === "ios") {

		PushNotificationIOS.scheduleLocalNotification ({

			fireDate: moment ().format ("YYYY-MM-DDTHH:mm:ss.sssZ"),
			alertBody: "IOS Push message",
			repeatInterval: "minute",
		});
	} else {

		PushNotification.localNotificationSchedule ({

			message: "My Notification Message",
			repeatType: "time",
			repeatTime: 10000,
		});
	}

	return {

		type: SCHEDULE_PUSH_NOTIFICATIONS,
	};
}