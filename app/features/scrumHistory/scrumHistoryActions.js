/**
 * @providesModule ScrumHistoryActions
 */

import {

	AsyncStorage,
} from "react-native";
import moment from "moment";

export const FETCH_SCRUM_HISTORY = "FETCH_SCRUM_HISTORY";
export const RECEIVE_SCRUM_HISTORY = "RECEIVE_SCRUM_HISTORY";
export const FINDING_SCRUM_ITEM = "FINDING_SCRUM_ITEM";
export const FOUND_SCRUM_ITEM = "FOUND_SCRUM_ITEM";
export const TOGGLE_CALENDAR = "TOGGLE_CALENDAR";

//	Tell the app we are getting the scrum history
export function getScrumHistory () {

	return function (dispatch) {

		dispatch (fetchScrumHistory ());
		AsyncStorage.getItem ("scrumdiddly").then (function (results) {

			dispatch (receiveScrumHistory (results));
		}, function (err) {

			//	TODO - handle error message
			console.log (err);
		});
	};
}

//	Tell the app we are fetching the scrum history
export function fetchScrumHistory () {

	return {

		type: FETCH_SCRUM_HISTORY,
	};
}

//	Tell the app we have received the scrum history
export function receiveScrumHistory (results) {

	let scrumHistory = results;
	if (scrumHistory === undefined || scrumHistory === null || scrumHistory.length === 0) {

		scrumHistory = {

			"dailyscrums": [],
		};
	} else {

		scrumHistory = JSON.parse (scrumHistory);
	}
	let dailyScrums = scrumHistory.dailyscrums;

	let eventDates = [];

	//	Get a list of all the dates in which we created a scrum
	for (let i = 0; i < dailyScrums.length; i++) {

		let dailyScrum = dailyScrums[i];

		//	Used to dipsplay dates on the calandar
		let calandarDate = moment (dailyScrum.scrumDate, "DD-MM-YYYY");
		let displayDate = calandarDate.format ("YYYY-MM-DD");
		eventDates.push (displayDate);
	}

	return {

		type: RECEIVE_SCRUM_HISTORY,
		eventDates,
	};
}

//	Get a scrum for a specified date
export function getScrumForDate (date) {

	return function (dispatch) {

		dispatch (findingScrum ());
		AsyncStorage.getItem ("scrumdiddly").then (function (results) {

			let scrumHistory = results;
			if (scrumHistory === undefined || scrumHistory === null || scrumHistory.length === 0) {

				scrumHistory = {

					"dailyscrums": [],
				};
			} else {

				scrumHistory = JSON.parse (scrumHistory);
			}
			let dailyScrums = scrumHistory.dailyscrums;
			let suppliedDate = moment (date, "YYYY-MM-DD");
			let foundScrum = {};

			//	Iterate through the results
			for (let i = 0; i < dailyScrums.length; i++) {

				let scrum = dailyScrums[i];
				let originalDate = moment (scrum.scrumDate, "DD-MM-YYYY");

				let date1 = originalDate.format ("YYYY-MM-DD");
				let date2 = suppliedDate.format ("YYYY-MM-DD");

				//	Compare dates
				if (date1 === date2) {

					foundScrum = scrum;
				}
			}

			return dispatch (foundScrumItem (foundScrum, suppliedDate));
		}).then (function () {

			//	Tell the calandar to collapse after an item is selected
			dispatch (toggleCalendar ());
		}, function (err) {

			//	TODO - handle error message
			console.log (err);
		});
	};
}

//	Tell the app we are trying to find a scrum item
export function findingScrum () {

	// TODO - add this to reducer somewhere
	return {

		type: FINDING_SCRUM_ITEM,
	};
}

//	Tell the app we have found the scrum item
export function foundScrumItem (scrumItem, suppliedDate) {
	
	return {

		type: FOUND_SCRUM_ITEM,
		scrumItem,
		suppliedDate,
	};
}

//	Toggle the display of the calendar
export function toggleCalendar () {

	return {

		type: TOGGLE_CALENDAR,
	};
}