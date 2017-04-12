/**
 * @providesModule BlockerHistoryActions
 */

import { AsyncStorage } from "react-native";
export const FETCH_SCRUM_BLOCKERS = "FETCH_SCRUM_BLOCKERS";
export const GET_SCRUM_BLOCKERS = "GET_SCRUM_BLOCKERS";
export const RECEIVE_SCRUM_BLOCKERS = "RECEIVE_SCRUM_BLOCKERS";
export const SET_NAVIGATION_BACK = "SET_NAVIGATION_BACK";
export const FINDING_SCRUM_ITEM = "FINDING_SCRUM_ITEM";
export const SELECTED_SCRUM_ITEM = "SELECTED_SCRUM_ITEM";

// Set the nav back object
export function setNavigationBack (backNavigation) {

	return {

		type: SET_NAVIGATION_BACK,
		backNavigation,
	};
}

//	Fetch all scrum blockers
export function fetchScrumBlocker () {

	return function (dispatch) {

		dispatch (getScrumBlockers ());
	};
}

//	Get all current blockers
export function getScrumBlockers () {

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
			let dailyScrums = appSavedStates.dailyscrums;
			let currentBlockers = [];

			//	Find all current blockers
			for (let i = 0; i < dailyScrums.length; i++) {

				//	Find blockers within each scrum
				let scrum = dailyScrums[i];
				for (let j = 0; j < scrum.scrumItems.length; j++) {

					let scrumItem = scrum.scrumItems[j];
					if (scrumItem.itemType === "blocker") {

						currentBlockers.push (scrumItem);
					}
				}
			}

			dispatch (fetchScrumBlockers (currentBlockers));
		});
	};
}

//	Receive all scrum blockers
export function fetchScrumBlockers (currentBlockers) {

	return {

		type: RECEIVE_SCRUM_BLOCKERS,
		currentBlockers,
	};
}

//	Tell the app we selected a scrum item
export function selectScrumItem (itemId) {

	return function (dispatch) {

		dispatch (findingScrumItem ());
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
			let dailyScrums = appSavedStates.dailyscrums;
			let foundScrum = {};

			//	Find the scrum associated with the blocker item
			for (let i = 0; i < dailyScrums.length; i++) {

				//	Find blockers within each scrum
				let scrum = dailyScrums[i];
				for (let j = 0; j < scrum.scrumItems.length; j++) {

					let scrumItem = scrum.scrumItems[j];
					if (scrumItem.id === itemId) {

						foundScrum = scrum;
					}
				}
			}

			dispatch (selectedScrum (foundScrum));
		});
	};
}

export function findingScrumItem () {

	return {

		type: FINDING_SCRUM_ITEM,
	};
}

export function selectedScrum (scrum) {

	return {

		type: SELECTED_SCRUM_ITEM,
		scrum,
	};
}
