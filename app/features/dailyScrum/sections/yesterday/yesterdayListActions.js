/**
 * @providesModule YesterdayListActions
 */
import {

	AsyncStorage,
} from "react-native";
import moment from "moment";

export const FETCH_YESTERDAY_ITEMS = "FETCH_YESTERDAY_ITEMS";
export const RECEIVE_YESTERDAY_ITEMS = "RECEIVE_YESTERDAY_ITEMS";
export const ADD_YESTERDAY_ITEM = "ADD_YESTERDAY_ITEM";
export const TOGGLE_COMPLETE_YESTERDAY_ITEM = "TOGGLE_COMPLETE_YESTERDAY_ITEM";
export const REMOVE_YESTERDAY_ITEM = "REMOVE_YESTERDAY_ITEM";
export const TOGGLE_CREATE_YESTERDAY_ITEM = "TOGGLE_CREATE_YESTERDAY_ITEM";
export const DELETE_YESTERDAY_ITEM = "DELETE_YESTERDAY_ITEM";
export const UPDATE_YESTERDAY_ITEM = "UPDATE_YESTERDAY_ITEM";
export const UPDATING_YESTERDAY_ITEM = "UPDATING_YESTERDAY_ITEM";
export const UPDATED_YESTERDAY_ITEM = "UPDATED_YESTERDAY_ITEM";

//	Tell the app we are getting the yesterday items
export function getYesterdayItems () {

	return function (dispatch) {

		//	Tell the app to fetch from localstorage  
		//	TODO - add API request
		dispatch (fetchYesterdayItems ());
		return AsyncStorage.getItem ("scrumdiddly").then (function (results) {

			console.log (results);
			dispatch (receiveYesterdayItems (results));
		}, function (err) {

			//	TODO - handle error message
			console.log (err);
		});
	};
}

//	Tell the app we are fetching the yesterday items
export function fetchYesterdayItems () {

	return {

		type: FETCH_YESTERDAY_ITEMS,
	};
}

//	Tell the app we have received a list of yesterday items
export function receiveYesterdayItems (results) {

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

	//	Return a list of items marked as yesterday
	let yesterdayScrumItems = [];

	// Do we have any saved scrums?
	if (dailyScrums !== undefined && dailyScrums !== null && dailyScrums.length > 0) {

		//	Iterate over all saved scrums
		for (let i = 0; i < dailyScrums.length; i++) {

			let scrum = dailyScrums[i];
			if (scrum.scrumDate === today) {

				//	Does the scrum have any items to display?
				if (scrum.scrumItems !== null && scrum.scrumItems !== undefined && scrum.scrumItems.length > 0) {

					let scrumItems = scrum.scrumItems;
					// Find scrum items marked as yesterday items
					for (let j = 0; j < scrumItems.length; j++) {

						let scrumItem = scrumItems[j];
						if (scrumItem.itemType === "yesterday") {

							//	Add this item to be diplayed within the yesterday section
							yesterdayScrumItems.push (scrumItem);
						}
					}
				}
			}
		}
	}

	return {

		type: RECEIVE_YESTERDAY_ITEMS,
		yesterdayScrumItems,
	};
}

//	Tell the app we want to save something
export function saveYesterdayItem (itemText) {

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
				"itemType": "yesterday",
			};
			//	Add the new item to the current displayed items
			dispatch (addYesterdayItem (newScrumItem));

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

//	Add an item to the users yesterday items
export function addYesterdayItem (newScrumItem) {
	
	return {

		type: ADD_YESTERDAY_ITEM,
		newScrumItem,
	};
}

//	Remove an item from the users yesterday items
export function removeYesterdayItem (itemId) {
	
	return {

		type: REMOVE_YESTERDAY_ITEM,
		itemId,
	};
}

//	Deletes the item from local storage
export function deleteYesterdayItem (itemId) {

	return function (dispatch) {

		dispatch (removeYesterdayItem (itemId));
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
export function toggleCompleteYesterdayItem (itemId, completedState) {

	return {

		type: TOGGLE_COMPLETE_YESTERDAY_ITEM,
		itemId,
		completedState,
	};
}

//	Toggles the create yesterday item on/off
export function toggleCreateYesterdayItem () {

	return {

		type: TOGGLE_CREATE_YESTERDAY_ITEM,
	};
}

//	Edit the current item
export function updateYesterdayItem (originalItemId, updatedText, updatedCompletedState) {

	return function (dispatch) {

		//	Tell the app we are updating items
		dispatch (updatingYesterdayItem ());
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
export function updatingYesterdayItem () {

	return {

		type: UPDATING_YESTERDAY_ITEM,
	};
}

//	Tell the app we have finished updating the item
export function updatedYesterdayItem () {

	return {

		type: UPDATED_YESTERDAY_ITEM,
	};
}