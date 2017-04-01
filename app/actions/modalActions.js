/**
 * @providesModule ModalActions
 */

export const TOGGLE_DELETE_SCRUM_ITEM_MODAL = "TOGGLE_DELETE_SCRUM_ITEM_MODAL";
export const SHOW_DELETE_SCRUM_ITEM_MODAL = "SHOW_DELETE_SCRUM_ITEM_MODAL";
export const HIDE_DELETE_SCRUM_ITEM_MODAL = "HIDE_DELETE_SCRUM_ITEM_MODAL";
export const TOGGLE_BLOCKED_ERROR_MODAL = "TOGGLE_BLOCKED_ERROR_MODAL";
export const SHOW_BLOCKED_ERROR_MODAL = "SHOW_BLOCKED_ERROR_MODAL";
export const HIDE_BLOCKED_ERROR_MODAL = "HIDE_BLOCKED_ERROR_MODAL";
export const TOGGLE_COMPLETED_ERROR_MODAL = "";
export const SHOW_COMPLETED_ERROR_MODAL = "";
export const HIDE_COMPLETED_ERROR_MODAL = "";

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

//	Tell the app to toggle the blocked error modal
export function toggleBlockedErrorModal () {

	return {

		type: TOGGLE_BLOCKED_ERROR_MODAL,
	};
}

//	Tell the app to show the blocked error modal
export function showBlockedErrorModal () {

	return {

		type: SHOW_BLOCKED_ERROR_MODAL,
	};
}

//	Tell the app to hide the blocked error modal
export function hideBlockedErrorModal () {

	return {

		type: HIDE_BLOCKED_ERROR_MODAL,
	};
}

//	Tell the app to toggle the display of the completed error modal
export function toggleCompletedErrorModal () {

	return {

		type: TOGGLE_COMPLETED_ERROR_MODAL,
	};
}

//	Show the completed error modal
export function showCompletedErrorModal () {

	return {

		type: SHOW_COMPLETED_ERROR_MODAL,
	};
}

//	Hide the completed error modal
export function hideCompletedErrorModal () {

	return {

		type: HIDE_COMPLETED_ERROR_MODAL,
	};
}