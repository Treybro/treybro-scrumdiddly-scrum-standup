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

//	Tell the app we are loading the yesterday items
export function getYesterdayItems () {

	return function (dispatch) {

		dispatch (fetchYesterdayItems ());
		return AsyncStorage.getItem ("DailyTab").then (function (results) {
			
			dispatch (receiveYesterdayItems (results));
		}, function (err) {

			//	TODO - handle error message
			console.log (err);
		});
	};
}

//	Get the list of yesterday items
export function fetchYesterdayItems () {

	return {

		type: FETCH_YESTERDAY_ITEMS,
	};
}

//	Receive the list of yesterday items
export function receiveYesterdayItems (results) {

	return {

		type: RECEIVE_YESTERDAY_ITEMS,
		results,
	};
}

//	Add an item to the users yesterday items
export function addYesterdayItems (itemText) {
	
	return {

		type: ADD_YESTERDAY_ITEM,
		itemText,
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