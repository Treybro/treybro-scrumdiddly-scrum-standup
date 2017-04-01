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
export const REMOVE_TODAY_ITEM = "REMOVE_TODAY_ITEM";
export const TOGGLE_CREATE_TODAY_ITEM = "TOGGLE_CREATE_TODAY_ITEM";
export const DELETE_TODAY_ITEM = "DELETE_TODAY_ITEM";
export const UPDATE_TODAY_ITEM = "UPDATE_TODAY_ITEM";
export const UPDATING_TODAY_ITEM = "UPDATING_TODAY_ITEM";
export const UPDATED_TODAY_ITEM = "UPDATED_TODAY_ITEM";
export const COMPLETED_TODAY_SCRUM_ITEM = "COMPLETED_TODAY_SCRUM_ITEM";
export const CANCELED_TODAY_SCRUM_ITEM = "CANCELED_TODAY_SCRUM_ITEM";

//	Tell the app we are getting the today items
export function getTodayItems () {

	return function (dispatch) {

		//	Tell the app to fetch from localstorage  
		//	TODO - add API request
		dispatch (fetchTodayItems ());
		return AsyncStorage.getItem ("scrumdiddly").then (function (results) {
			
			dispatch (receiveTodayItems (results));
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
				"blocked": false,
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

//	Toggles the create today item on/off
export function toggleCreateTodayItem () {

	return {

		type: TOGGLE_CREATE_TODAY_ITEM,
	};
}

//	Edit the current item
export function updateTodayItem (originalItemId, itemCreatedAt, updatedText, updatedCompletedState, updatedBlockedState, updateCompletedItem) {

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
							scrumItem.blocked = updatedBlockedState;
						}
					}
				}
			}
			resultsObject.dailyscrums = savedScrums;
			return AsyncStorage.mergeItem ("scrumdiddly", JSON.stringify (resultsObject));
		}).then (function () {

			console.log ("Item Updated");
			//	Do we need to compelete any saved completed items in the next scrum?
			if (updateCompletedItem === true) {

				if (updatedCompletedState === true) {

					//	Add the item to the next scrum
					dispatch (completeTodayScrumItem (originalItemId, itemCreatedAt, updatedText));
				} else {

					//	Remove the scrum item from the next scrum
					dispatch (cancelTodayScrumItem (originalItemId, itemCreatedAt));
				}
			}
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

//	Complete todays scrum item
export function completeTodayScrumItem (paramsScrumItemId, paramsCreatedAt, paramsItemText) {

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
			dispatch (completedTodayScrumItem ());
		}, function (err) {

			//	TODO - handle error message
			console.log (err);
		});
	};
}

//	Tell the app we have completed todays scrum item
export function completedTodayScrumItem () {

	return {

		type: COMPLETED_TODAY_SCRUM_ITEM,
	};
}

//	Cancel a completed today scrum item
export function cancelTodayScrumItem (paramsScrumItemId, paramsCreatedAt) {

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
			dispatch (canceledTodayScrumItem ());
		});
	};
}

//	Tell the app we cancelled todays scrum item
export function canceledTodayScrumItem () {

	return {

		type: CANCELED_TODAY_SCRUM_ITEM,
	};
}