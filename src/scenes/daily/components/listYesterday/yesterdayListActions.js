/**
 * @providesModule YesterdayListActions
 */

export const GET_YESTERDAY_ITEMS = "GET_YESTERDAY_ITEMS";
export const ADD_YESTERDAY_ITEM = "ADD_YESTERDAY_ITEM";
export const REMOVE_YESTERDAY_ITEM = "REMOVE_YESTERDAY_ITEM";
export const EDIT_YESTERDAY_ITEM = "EDIT_YESTERDAY_ITEM";

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
export function removeYesterdayItems (itemId) {
	
	return {

		type: REMOVE_YESTERDAY_ITEM,
		itemId,
	};
}

//	Edit an item from the users yesterday items
export function editYesterdayItems () {

	return {

		type: EDIT_YESTERDAY_ITEM,
	};
}