/**
 * @providesModule TodayListActions
 */
import {

	AsyncStorage,
} from "react-native";
import moment from "moment";

export const FETCH_TODAY_ITEMS = "FETCH_TODAY_ITEMS";
export const RECEIVE_TODAY_ITEMS = "RECEIVE_TODAY_ITEMS";
export const ADD_TODAY_ITEM = "ADD_TODAY_ITEM";
export const TOGGLE_COMPLETE_TODAY_ITEM = "TOGGLE_COMPLETE_TODAY_ITEM";
export const REMOVE_TODAY_ITEM = "REMOVE_TODAY_ITEM";
export const TOGGLE_CREATE_TODAY_ITEM = "TOGGLE_CREATE_TODAY_ITEM";
export const DELETE_TODAY_ITEM = "DELETE_TODAY_ITEM";
export const UPDATE_TODAY_ITEM = "UPDATE_TODAY_ITEM";
export const UPDATING_TODAY_ITEM = "UPDATING_TODAY_ITEM";
export const UPDATED_TODAY_ITEM = "UPDATED_TODAY_ITEM";

//	Tell the app we are getting the today items
export function getTodayItems () {

	return function (dispatch) {

		//	Tell the app to fetch from localstorage  
		//	TODO - add API request
		dispatch (fetchTodayItems ());
		return AsyncStorage.getItem ("scrumdiddly").then (function (results) {

			console.log (results);
			dispatch (receiveTodayItems (results));
		}, function (err) {

			//	TODO - handle error message
			console.log (err);
		});
	};
}

//	Tell the app we are fetching the today items
export function fetchTodayItems () {

	return {

		type: FETCH_TODAY_ITEMS,
	};
}

//	Tell the app we have received a list of today items
export function receiveTodayItems (results) {

	//	Convert to JSON object
	let savedScrums = results;
	if (savedScrums === undefined || savedScrums === null || savedScrums.length === 0) {

		savedScrums = {

			"dailyscrums": [],
		};
	} else {

		savedScrums = JSON.parse (savedScrums);
	}

	//	Get todays date
	let today = moment ().format ("DD-MM-YYYY");
	let dailyScrums = savedScrums.dailyscrums;

	//	Return a list of items marked as today
	let todayScrumItems = [];

	// Do we have any saved scrums?
	if (dailyScrums !== undefined && dailyScrums !== null && dailyScrums.length > 0) {

		//	Iterate over all saved scrums
		for (let i = 0; i < dailyScrums.length; i++) {

			let scrum = dailyScrums[i];
			if (scrum.scrumDate === today) {

				//	Does the scrum have any items to display?
				if (scrum.scrumItems !== null && scrum.scrumItems !== undefined && scrum.scrumItems.length > 0) {

					let scrumItems = scrum.scrumItems;
					// Find scrum items marked as today items
					for (let j = 0; j < scrumItems.length; j++) {

						let scrumItem = scrumItems[j];
						if (scrumItem.itemType === "today") {

							//	Add this item to be diplayed within the today section
							todayScrumItems.push (scrumItem);
						}
					}
				}
			}
		}
	}

	return {

		type: RECEIVE_TODAY_ITEMS,
		todayScrumItems,
	};
}

//	Tell the app we want to save something
export function saveTodayItem (itemText) {

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
				"itemType": "today",
			};
			//	Add the new item to the current displayed items
			dispatch (addTodayItem (newScrumItem));

			//	Is this our first scrum?
			if (dailyScrums.length > 0) {

				let scrumFound = false;
				//	Iterate over all the saved scrums
				for (let i = 0; i < dailyScrums.length; i++) {

					let scrum = dailyScrums[i];
					//	Are we saving to the correct scrum?
					if (scrum.scrumDate === createdDate) {

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

//	Add an item to the users today items
export function addTodayItem (newScrumItem) {
	
	return {

		type: ADD_TODAY_ITEM,
		newScrumItem,
	};
}

//	Remove an item from the users today items
export function removeTodayItem (itemId) {
	
	return {

		type: REMOVE_TODAY_ITEM,
		itemId,
	};
}

//	Deletes the item from local storage
export function deleteTodayItem (itemId) {

	return function (dispatch) {

		dispatch (removeTodayItem (itemId));
		return AsyncStorage.getItem ("scrumdiddly").then (function (results) {

			let resultsObject = JSON.parse(results);
			let savedScrums = resultsObject.dailyscrums;
			let today = moment ().format ("DD-MM-YYYY");

			//	Iterate through the saved scrums
			for (let i = 0; i < savedScrums.length; i++) {

				let scrum = savedScrums[i];
				//	Remove the scrum from todays scrum
				if (scrum.scrumDate === today) {

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

//	Complete/Uncomplete an item on the list
export function toggleCompleteTodayItem (itemId, completedState) {

	return {

		type: TOGGLE_COMPLETE_TODAY_ITEM,
		itemId,
		completedState,
	};
}

//	Toggles the create today item on/off
export function toggleCreateTodayItem () {

	return {

		type: TOGGLE_CREATE_TODAY_ITEM,
	};
}

//	Edit the current item
export function updateTodayItem (originalItemId, updatedText, updatedCompletedState) {

	return function (dispatch) {

		//	Tell the app we are updating items
		dispatch (updatingTodayItem ());
		return AsyncStorage.getItem ("scrumdiddly").then (function (results) {

			let resultsObject = JSON.parse(results);
			let savedScrums = resultsObject.dailyscrums;
			let today = moment ().format ("DD-MM-YYYY");

			//	Iterate through the saved scrums
			for (let i = 0; i < savedScrums.length; i++) {

				let scrum = savedScrums[i];
				//	Update the item
				if (scrum.scrumDate === today) {

					let scrumItems = scrum.scrumItems;
					for (let j = 0; j < scrumItems.length; j++) {

						let scrumItem = scrumItems[j];
						if (scrumItem.id === originalItemId) {

							//	Update the item
							scrumItem.itemText = updatedText;
							scrumItem.completed = updatedCompletedState;
						}
					}
				}
			}
			resultsObject.dailyscrums = savedScrums;
			return AsyncStorage.mergeItem ("scrumdiddly", JSON.stringify (resultsObject));
		}).then (function () {

			console.log ("Item Updated");
		}, function (err) {

			//	TODO - handle error message
			console.log (err);
		});
	};
}

//	Tell the app we are updating item
export function updatingTodayItem () {

	return {

		type: UPDATING_TODAY_ITEM,
	};
}

//	Tell the app we have finished updating the item
export function updatedTodayItem () {

	return {

		type: UPDATED_TODAY_ITEM,
	};
}