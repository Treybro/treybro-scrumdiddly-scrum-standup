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
export const REMOVE_SCRUM_BLOCKER_ITEM = "REMOVE_SCRUM_BLOCKER_ITEM";
export const SAVE_SCRUM_ITEM = "SAVE_SCRUM_ITEM";
export const ADD_SCRUM_ITEM = "ADD_SCRUM_ITEM";
export const COMPLETED_SCRUM_ITEM = "COMPLETED_SCRUM_ITEM";
export const CANCELED_SCRUM_ITEM = "CANCELED_SCRUM_ITEM";
export const SET_CALENDAR_START_DATE = "SET_CALENDAR_START_DATE";

//	Tell the app we are getting the scrum history
export function getScrumHistory () {

	return function (dispatch) {

		dispatch (fetchScrumHistory ());
		AsyncStorage.getItem ("scrumdiddly").then (function (results) {

			dispatch (receiveScrumHistory (results));
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
export function updateScrumItem (scrumID, itemId, itemCreatedAt, itemType, updatedText, updatedCompletedState, updatedBlockedState, updateCompletedItem, updateBlockerItem, blockerItemText) {

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

			dispatch (updatedScrumItem ());

			//	Do we need to compelete any saved completed items in the next scrum?
			if (updateCompletedItem === true) {

				if (updatedCompletedState === true) {

					//	Add the item to the next scrum
					dispatch (completeScrumItem (itemId, itemCreatedAt, updatedText));
				} else {

					//	Remove the scrum item from the next scrum
					dispatch (cancelScrumItem (itemId, itemCreatedAt));
				}
			}

			//	Do we need to add a blocker to the item?
			if (updateBlockerItem === true) {

				if (updatedBlockedState === true) {

					//	Add a blocker to the scrum item
					console.log ("Blocker Scrum Item");
					dispatch (blockScrumItem (scrumID, itemId, itemCreatedAt, blockerItemText));
				} else {

					console.log ("UnBlocking Scrum Item");
					//	Remove the blocker from the scrum
					dispatch (unblockScrumItem (scrumID, itemId));
				}
			}
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
	} else if (itemType === "today") {

		return {

			type: REMOVE_SCRUM_TODAY_ITEM,
			scrumId,
			itemId,
		};
	} else {

		return {

			type: REMOVE_SCRUM_BLOCKER_ITEM,
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
export function saveScrumItem (scrumId, itemType, itemText, scrumItemScrumDate) {

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
			let createdDate = moment (scrumItemScrumDate, "DD-MM-YYYY").format ("DD-MM-YYYY");

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

//	Complete a scrum item
export function completeScrumItem (paramsScrumItemId, paramsCreatedAt, paramsItemText) {

	/*
	*	When we complete a scrum item, we add the item to the next days
	*	"Yesterday I..." section, this way the user doesn't have to add 2 entries
	*	for every single completed scrum item :)
	*/
	return function (dispatch) {

		//	Get a list of all scrums
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

			//	Create a new scrum item to be put into tomorrows items
			let newScrumItem = {

				"id": paramsScrumItemId,
				"createdAt": paramsCreatedAt,
				"itemText": paramsItemText,
				"completed": true,
				"blocked": false,
				"itemType": "yesterday",
			};

			let nextScrumDate = moment (paramsCreatedAt, "DD-MM-YYYY");
			nextScrumDate.add (1, "days");
			let nextScrumDateText = nextScrumDate.format ("DD-MM-YYYY");
			let nextDayScrumFound = false;

			console.log (moment (paramsCreatedAt, "DD-MM-YYYY").format ("DD-MM-YYYY"));
			console.log (nextScrumDateText);

			//	Iterate through the saved scrums and find the next days scrum
			for (let i = 0; i < dailyScrums.length; i++) {

				if (dailyScrums[i].scrumDate === nextScrumDateText) {

					console.log ("Scrum Found");
					nextDayScrumFound = true;

					let scrum = dailyScrums[i];
					let scrumItems = scrum.scrumItems;

					//	Does the scrum item already exist? - used to update the item
					for (let j = 0; j < scrumItems.length; j++) {

						let scrumItem = scrumItems[j];
						if (scrumItem.id === paramsScrumItemId) {

							//	Remove the current item so we can replace it
							scrumItems.splice(j, 1);
						}
					}

					scrumItems.push (newScrumItem);
				}
			}

			//	First item in a new scrum
			if (nextDayScrumFound === false) {

				console.log ("No scrum found, creating a new scrum entry");
				let scrumItems = [];
				//	Add the scrum item to the scrum items list
				scrumItems.push (newScrumItem);

				let timestampId = nextScrumDate.valueOf ();

				//	Create the new scrum
				let newScrum = {

					"scrumId": timestampId,
					"scrumDate": nextScrumDateText,
					"scrumItems": scrumItems,
				};

				//	Add the scrum to the list of users scrums
				dailyScrums.push (newScrum);
			}

			savedScrums.dailyscrums = dailyScrums;
			return AsyncStorage.mergeItem ("scrumdiddly", JSON.stringify (savedScrums));
		}).then (function () {

			console.log ("Item Completed and tomorrows scrum updated too");
			dispatch (completedScrumItem ());
		});
	};
}

//	Tell the app we have completed a scrum item
export function completedScrumItem () {

	return {

		type: COMPLETED_SCRUM_ITEM,
	};
}

//	Cancel a completed scrum item
export function cancelScrumItem (paramsScrumItemId, paramsCreatedAt) {

	/*
	*	When a user cancels a completed scrum item, we need to remove it from
	*	the next scrums item list
	*/
	return function (dispatch) {

		//	Get a list of all scrums
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

			let nextScrumDate = moment (paramsCreatedAt, "DD-MM-YYYY");
			nextScrumDate.add (1, "days");
			let nextScrumDateText = nextScrumDate.format ("DD-MM-YYYY");

			//	Iterate through the saved scrums and find the next days scrum
			for (let i = 0; i < dailyScrums.length; i++) {

				//	Remove the scrum item from the scrum
				if (dailyScrums[i].scrumDate === nextScrumDateText) {

					let scrum = dailyScrums[i];
					let scrumItems = scrum.scrumItems;
					for (let j = 0; j < scrumItems.length; j++) {

						let scrumItem = scrumItems[j];
						if (scrumItem.id === paramsScrumItemId) {

							scrumItems.splice(j, 1);
						}
					}
				}
			}

			savedScrums.dailyscrums = dailyScrums;
			return AsyncStorage.mergeItem ("scrumdiddly", JSON.stringify (savedScrums));
		}).then (function () {

			console.log ("Item cancelled and tomorrows scrum updated too");
			dispatch (canceledScrumItem ());
		});
	};
}

//	Tell the app we cancelled a scrum item
export function canceledScrumItem () {

	return {

		type: CANCELED_SCRUM_ITEM,
	};
}

//	Block a scrum item for a specified scrum
export function blockScrumItem (originalScrumID, originalScrumItemId, itemCreatedAt, blockerItemText) {

	/*
	*	When we block a scrum item we need to add a new blocker
	*	item to the original scrum list
	*/
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
			let createdDate = moment (itemCreatedAt, "DD-MM-YYYY").format ("DD-MM-YYYY");

			//	Create a new scrum item
			let newScrumItem = {

				"id": timestampId,
				"originalScrumItemId": originalScrumItemId,
				"createdAt": createdDate,
				"itemText": blockerItemText,
				"completed": false,
				"blocked": true,
				"itemType": "blocker",
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
					if (scrum.scrumId === originalScrumID) {

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

			console.log ("Scrum Blocker Saved");
		});
	};
}

//	Removes the blocker item from the original scrum
export function unblockScrumItem (scrumID, itemId) {

	return function (dispatch) {

		dispatch (removeScrumItem (scrumID, itemId, "blocker"));
		return AsyncStorage.getItem ("scrumdiddly").then (function (results) {

			let resultsObject = JSON.parse(results);
			let savedScrums = resultsObject.dailyscrums;

			//	Iterate through the saved scrums
			for (let i = 0; i < savedScrums.length; i++) {

				let scrum = savedScrums[i];
				//	Remove the scrum from todays scrum
				if (scrum.scrumId === scrumID) {

					let scrumItems = scrum.scrumItems;
					for (let j = 0; j < scrumItems.length; j++) {

						let scrumItem = scrumItems[j];
						if (scrumItem !== undefined && scrumItem.originalScrumItemId !== null) {

							if (scrumItem.originalScrumItemId === itemId) {

								scrumItems.splice(j, 1);
							}
						}
					}
				}
			}
			resultsObject.dailyscrums = savedScrums;
			return AsyncStorage.mergeItem ("scrumdiddly", JSON.stringify (resultsObject));
		}).then (function () {

			console.log ("SCRUM BLOCKER Removed");
		});
	};
}

//	Update the calander selected date
export function setCalendarStartDate (startDate) {

	return {

		type: SET_CALENDAR_START_DATE,
		startDate,
	};
}