/**
 * @providesModule BlockerHistoryActions
 */

import { AsyncStorage } from "react-native";
export const FETCH_SCRUM_BLOCKERS = "FETCH_SCRUM_BLOCKERS";
export const GET_SCRUM_BLOCKERS = "GET_SCRUM_BLOCKERS";
export const RECEIVE_SCRUM_BLOCKERS = "RECEIVE_SCRUM_BLOCKERS";


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
