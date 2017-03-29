/**
 * @providesModule ModalActions
 */

export const TOGGLE_DELETE_SCRUM_ITEM_MODAL = "TOGGLE_DELETE_SCRUM_ITEM_MODAL";
export const SHOW_DELETE_SCRUM_ITEM_MODAL = "SHOW_DELETE_SCRUM_ITEM_MODAL";
export const HIDE_DELETE_SCRUM_ITEM_MODAL = "HIDE_DELETE_SCRUM_ITEM_MODAL";

/*
*	TODO - Refactor this
*/
export const SHOW_DELETE_SCRUM_ITEM_MODAL_YESTERDAY_ITEM = "SHOW_DELETE_SCRUM_ITEM_MODAL_YESTERDAY_ITEM";
export const SHOW_DELETE_SCRUM_ITEM_MODAL_TODAY_ITEM = "SHOW_DELETE_SCRUM_ITEM_MODAL_TODAY_ITEM";

// Tell app to toggle the display of the delete scrum item modal
export function toggleDeleteScrumItemModal () {

	return {

		type: TOGGLE_DELETE_SCRUM_ITEM_MODAL,
	};
}

// Tell the app to display the delete scrum item modal
export function showDeleteScrumItemModal (scrumId, scrumItemId, scrumItemType) {
	
	return {

		type: SHOW_DELETE_SCRUM_ITEM_MODAL,
		scrumId,
		scrumItemId,
		scrumItemType,
	};
}

// Tell the app to hide the delete scrum item modal
export function hideDeleteScrumItemModal () {

	return {

		type: HIDE_DELETE_SCRUM_ITEM_MODAL,
	};
}

/*
*	Refactor the next 2 functions....
*/
// TODO - get rid of this
export function showDeleteScrumItemModalYesterdayItem (yesterdayItemId) {

	return {

		type: SHOW_DELETE_SCRUM_ITEM_MODAL_YESTERDAY_ITEM,
		yesterdayItemId,
	};
}

// TODO - get rid of this
export function showDeleteScrumItemModalTodayItem (todayItemId) {

	return {

		type: SHOW_DELETE_SCRUM_ITEM_MODAL_TODAY_ITEM,
		todayItemId,
	};
}