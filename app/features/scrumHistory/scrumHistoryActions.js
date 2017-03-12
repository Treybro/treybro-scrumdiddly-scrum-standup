/**
 * @providesModule ScrumHistoryActions
 */

import {

	AsyncStorage,
} from "react-native";
import moment from "moment";

export const FETCH_SCRUM_HISTORY = "FETCH_SCRUM_HISTORY";
export const RECEIVE_SCRUM_HISTORY = "RECEIVE_SCRUM_HISTORY";

//	Tell the app we are getting the scrum history
export function getScrumHistory () {

	return function (dispatch) {

		dispatch (fetchScrumHistory ());
		return AsyncStorage.getItem ("scrumdiddly").then (function (results) {

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

	let scrumHistory = JSON.parse (results);
	let dailyScrums = scrumHistory.dailyscrums;

	let eventDates = [];
	let scrumData = {};

	//	Get a list of all the dates in which we created a scrum
	for (let i = 0; i < dailyScrums.length; i++) {

		let dailyScrum = dailyScrums[i];

		//	Keep a list of sections in Month format (eg. January, February etc...)
		let date = moment (dailyScrum.scrumDate, "DD-MM-YYYY");
		let month = date.format ("MMMM");

		// Only add it if we don't already have it
		if (!scrumData[month]) {

			scrumData[month] = [];
		}

		let displayDate = date.format ("MMMM Do");
		scrumData[month].push (displayDate);

		//	Used to dipsplay dates on the calandar
		let calandarDate = moment (dailyScrum.scrumDate, "DD-MM-YYYY");
		let displayDate2 = calandarDate.format ("YYYY-MM-DD");
		eventDates.push (displayDate2);
	}

	return {

		type: RECEIVE_SCRUM_HISTORY,
		scrumData,
		eventDates,
	};
}