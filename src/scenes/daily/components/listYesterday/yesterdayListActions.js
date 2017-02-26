/**
 * @providesModule YesterdayListActions
 */
import {

	AsyncStorage,
} from "react-native";

export const FETCH_YESTERDAY_ITEMS = "FETCH_YESTERDAY_ITEMS";
export const RECEIVE_YESTERDAY_ITEMS = "RECEIVE_YESTERDAY_ITEMS";
export const ADD_YESTERDAY_ITEM = "ADD_YESTERDAY_ITEM";
export const TOGGLE_COMPLETE_YESTERDAY_ITEM = "TOGGLE_COMPLETE_YESTERDAY_ITEM";
export const REMOVE_YESTERDAY_ITEM = "REMOVE_YESTERDAY_ITEM";
export const TOGGLE_CREATE_YESTERDAY_ITEM = "TOGGLE_CREATE_YESTERDAY_ITEM";

//	Tell the app we are getting the yesterday items
export function getYesterdayItems () {

	return function (dispatch) {

		//	Tell the app to fetch from localstorage  
		//	TODO - add API request
		dispatch (fetchYesterdayItems ());
		return AsyncStorage.getItem ("DailyTab").then (function (results) {

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

	return {

		type: RECEIVE_YESTERDAY_ITEMS,
		results,
	};
}

//	Tell the app we want to save something
export function saveYesterdayItem (itemText) {

	return function (dispatch) {

		return AsyncStorage.getItem ("DailyTab").then (function (results) {

			let resultsObject = results;
			if (resultsObject === undefined || resultsObject === null || resultsObject.length === 0) {

				resultsObject = {

					"toDoItems": [],
				};
			} else {

				// Convert to JSON object and get current items
				resultsObject = JSON.parse(results);
			}

			let toDoItems = resultsObject.toDoItems;

			//	TODO - do this on the network side (maybe use objectIds/dates)
			let nextId = toDoItems.length + 1;
			let newToDoItem = {

				id: nextId,
				itemText: itemText,
				completed: false,
			};
			toDoItems.push (newToDoItem);

			//	Setup for merge
			resultsObject.toDoItems = toDoItems;

			//	Add the item to the current list
			//	TODO - add api save
			dispatch (addYesterdayItem (newToDoItem));
			return AsyncStorage.mergeItem ("DailyTab", JSON.stringify (resultsObject));
		}).then (function (result) {

			console.log ("Item Saved");
		}, function (err) {

			//	TODO - handle error message
			console.log (err);
		});
	};
}

//	Add an item to the users yesterday items
export function addYesterdayItem (newToDoItem) {
	
	return {

		type: ADD_YESTERDAY_ITEM,
		newToDoItem,
	};
}

//	Remove an item from the users yesterday items
export function removeYesterdayItem (itemId) {
	
	return {

		type: REMOVE_YESTERDAY_ITEM,
		itemId,
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