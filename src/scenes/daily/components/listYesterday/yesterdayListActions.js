/**
 * @providesModule YesterdayListActions
 */

export const GET_YESTERDAY_ITEMS = "GET_YESTERDAY_ITEMS";
export const ADD_YESTERDAY_ITEM = "ADD_YESTERDAY_ITEM";
export const TOGGLE_COMPLETE_YESTERDAY_ITEM = "TOGGLE_COMPLETE_YESTERDAY_ITEM";
export const REMOVE_YESTERDAY_ITEM = "REMOVE_YESTERDAY_ITEM";
export const TOGGLE_CREATE_YESTERDAY_ITEM = "TOGGLE_CREATE_YESTERDAY_ITEM";
//	Get a list of all the users yesterday items
export function getYesterdayItems () {

	return {

		type: GET_YESTERDAY_ITEMS,
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