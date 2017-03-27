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
export const FETCH_SCRUM_ITEMS = "FETCH_SCRUM_ITEMS";
export const RECEIVE_SCRUM_ITEMS = "RECEIVE_SCRUM_ITEMS";
export const UPDATE_SCRUM_ITEM = "UPDATE_SCRUM_ITEM";	//	TODO - add this to reducer
export const UPDATING_SCRUM_ITEM = "UPDATING_SCRUM_ITEM";	// TODO - add this to reducer
export const UPDATED_SCRUM_ITEM = "UPDATED_SCRUM_ITEM";
export const TOGGLE_CREATE_SCRUM_YESTERDAY_ITEM = "TOGGLE_CREATE_SCRUM_YESTERDAY_ITEM";
export const TOGGLE_CREATE_SCRUM_TODAY_ITEM = "TOGGLE_CREATE_SCRUM_TODAY_ITEM";
export const REMOVE_SCRUM_YESTERDAY_ITEM = "REMOVE_SCRUM_YESTERDAY_ITEM";
export const REMOVE_SCRUM_TODAY_ITEM = "REMOVE_SCRUM_TODAY_ITEM";
export const SAVE_SCRUM_ITEM = "SAVE_SCRUM_ITEM";
export const ADD_SCRUM_ITEM = "ADD_SCRUM_ITEM";

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

//	Tell the app to get a list of items for a given scrum
export function getScrumItemsForId (scrumId, itemType) {

	return function (dispatch) {

		dispatch (fetchScrumItems ());
		AsyncStorage.getItem ("scrumdiddly").then (function (results) {

			dispatch (receiveScrumItems (scrumId, itemType, results));
		}, function (err) {

			//	TODO - handle error message
			console.log (err);
		});
	};
}

//	Tell the app we are fetching the list of scrum items
export function fetchScrumItems () {

	return {

		type: FETCH_SCRUM_ITEMS,
	};
}

//	Receive the scrum items for a given scrum
export function receiveScrumItems (scrumId, itemType, results) {

	//	Convert to JSON object
	let savedScrums = results;
	if (savedScrums === undefined || savedScrums === null || savedScrums.length === 0) {

		savedScrums = {

			"dailyscrums": [],
		};
	} else {

		savedScrums = JSON.parse (savedScrums);
	}

	let dailyScrums = savedScrums.dailyscrums;
	//	Return a list of items marked as yesterday
	let foundScrumItems = [];

	// Do we have any saved scrums?
	if (dailyScrums !== undefined && dailyScrums !== null && dailyScrums.length > 0) {

		//	Iterate over all saved scrums
		for (let i = 0; i < dailyScrums.length; i++) {

			let scrum = dailyScrums[i];
			if (scrum.scrumId === scrumId) {

				//	Does the scrum have any items to display?
				if (scrum.scrumItems !== null && scrum.scrumItems !== undefined && scrum.scrumItems.length > 0) {

					let scrumItems = scrum.scrumItems;
					// Find scrum items marked as the itemType
					for (let j = 0; j < scrumItems.length; j++) {

						let scrumItem = scrumItems[j];
						if (scrumItem.itemType === itemType) {

							//	Add this item to be diplayed
							foundScrumItems.push (scrumItem);
						}
					}
				}
			}
		}
	}

	return {

		type: RECEIVE_SCRUM_ITEMS,
		foundScrumItems,
		itemType,
	};
}

//	Update a give scrum item
export function updateScrumItem (scrumID, itemId, itemType, updatedText, updatedCompletedState, updatedBlockedState) {

	return function (dispatch) {

		//	Tell the app we are updating items
		dispatch (updatingScrumItem ());
		return AsyncStorage.getItem ("scrumdiddly").then (function (results) {

			let resultsObject = JSON.parse(results);
			let savedScrums = resultsObject.dailyscrums;

			//	Iterate through the saved scrums
			for (let i = 0; i < savedScrums.length; i++) {

				let scrum = savedScrums[i];
				//	Update the item
				if (scrum.scrumId === scrumID) {

					let scrumItems = scrum.scrumItems;
					for (let j = 0; j < scrumItems.length; j++) {

						let scrumItem = scrumItems[j];
						if (scrumItem.id === itemId) {

							//	Update the item
							scrumItem.itemText = updatedText;
							scrumItem.completed = updatedCompletedState;
							scrumItem.blocked = updatedBlockedState;
							scrumItem.itemType = itemType;
						}
					}
				}
			}
			resultsObject.dailyscrums = savedScrums;
			return AsyncStorage.mergeItem ("scrumdiddly", JSON.stringify (resultsObject));
		}).then (function () {

			console.log ("Item Updated");
			dispatch (updatedScrumItem ());
		}, function (err) {

			//	TODO - handle error message
			console.log (err);
		});
	};
}

//	Tell the app we are updating a scrum item
export function updatingScrumItem () {

	return {

		type: UPDATING_SCRUM_ITEM,
	};
}

//	Tell the app we have finished updating the scrum item
export function updatedScrumItem () {

	return {

		type: UPDATED_SCRUM_ITEM,
	};
}

//	Tell the app to delete a scrum item
export function deleteScrumItem (scrumId, itemId, itemType) {

	return function (dispatch) {

		dispatch (removeScrumItem (scrumId, itemId, itemType));
		return AsyncStorage.getItem ("scrumdiddly").then (function (results) {

			let resultsObject = JSON.parse(results);
			let savedScrums = resultsObject.dailyscrums;

			//	Iterate through the saved scrums
			for (let i = 0; i < savedScrums.length; i++) {

				let scrum = savedScrums[i];
				//	Remove the scrum from todays scrum
				if (scrum.scrumId === scrumId) {

					let scrumItems = scrum.scrumItems;
					for (let j = 0; j < scrumItems.length; j++) {

						let scrumItem = scrumItems[j];
						if (scrumItem.id === itemId) {

							scrumItems.splice(j, 1);
						}
					}
				}
			}
			resultsObject.dailyscrums = savedScrums;
			return AsyncStorage.mergeItem ("scrumdiddly", JSON.stringify (resultsObject));
		}).then (function () {

			console.log ("Item Removed");
		}, function (err) {

			//	TODO - handle error message
			console.log (err);
		});
	};
}

//	Tell the app were removing a scrum item
export function removeScrumItem (scrumId, itemId, itemType) {

	if (itemType === "yesterday") {

		return {

			type: REMOVE_SCRUM_YESTERDAY_ITEM,
			scrumId,
			itemId,
		};
	} else {

		return {

			type: REMOVE_SCRUM_TODAY_ITEM,
			scrumId,
			itemId,
		};
	}
}

//	Toggles the create scrum item on/off
export function toggleCreateScrumItem (itemType, toggle) {

	if (itemType === "yesterday") {

		return {

			type: TOGGLE_CREATE_SCRUM_YESTERDAY_ITEM,
			toggle,
		};
	} else {

		return {

			type: TOGGLE_CREATE_SCRUM_TODAY_ITEM,
			toggle,
		};
	}
}

//	Tell the app to save a list item for a given scrum
export function saveScrumItem (scrumId, itemType, itemText) {

	return function (dispatch) {

		return AsyncStorage.getItem ("scrumdiddly").then (function (results) {

			//	Convert to JSON object
			let savedScrums = results;
			if (savedScrums === undefined || savedScrums === null) {

				savedScrums = {

					"dailyscrums": [],
				};
			} else {

				savedScrums = JSON.parse(savedScrums);
			}
			let dailyScrums = savedScrums.dailyscrums;

			if (dailyScrums === undefined || dailyScrums === null) {

				//	Create empty array to store new scrum
				dailyScrums = [];
			}

			let timestampId = moment ().valueOf ();
			let createdDate = moment ().format ("DD-MM-YYYY");

			//	Create a new scrum item
			let newScrumItem = {

				"id": timestampId,
				"createdAt": createdDate,
				"itemText": itemText,
				"completed": false,
				"blocked": false,
				"itemType": itemType,
			};
			//	Add the new item to the current displayed items
			dispatch (addScrumItem (newScrumItem));

			//	Is this our first scrum?
			if (dailyScrums.length > 0) {

				let scrumFound = false;
				//	Iterate over all the saved scrums
				for (let i = 0; i < dailyScrums.length; i++) {

					let scrum = dailyScrums[i];
					//	Are we saving to the correct scrum?
					if (scrum.scrumId === scrumId) {

						let scrumItems = dailyScrums[i].scrumItems;
						scrumItems.push (newScrumItem);
						scrumFound = true;
					}
				}

				//	First item in a new scrum
				if (scrumFound === false) {

					let scrumItems = [];
					//	Add the scrum item to the scrum items list
					scrumItems.push (newScrumItem);

					//	Create the new scrum
					let newScrum = {

						"scrumId": timestampId,
						"scrumDate": createdDate,
						"scrumItems": scrumItems,
					};

					//	Add the scrum to the list of users scrums
					dailyScrums.push (newScrum);
				}
			} else {

				let scrumItems = [];
				//	Add the scrum item to the scrum items list
				scrumItems.push (newScrumItem);

				//	Create our first new scrum
				let newScrum = {

					"scrumId": timestampId,
					"scrumDate": createdDate,
					"scrumItems": scrumItems,
				};
				//	Add the scrum to the list of users scrums
				dailyScrums.push (newScrum);
			}

			savedScrums.dailyscrums = dailyScrums;
			return AsyncStorage.mergeItem ("scrumdiddly", JSON.stringify (savedScrums));
		}).then (function () {

			console.log ("Item Saved");
		}, function (err) {

			//	TODO - handle error message
			console.log (err);
		});
	};
}

//	Add an item to the scrum
export function addScrumItem (newScrumItem) {
	
	return {

		type: ADD_SCRUM_ITEM,
		newScrumItem,
	};
}