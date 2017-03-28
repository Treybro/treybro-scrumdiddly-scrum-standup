/**
 * @providesModule ModalActions
 */

export const TOGGLE_DELETE_SCRUM_ITEM_MODAL = "TOGGLE_DELETE_SCRUM_ITEM_MODAL";
export const SHOW_DELETE_SCRUM_ITEM_MODAL = "SHOW_DELETE_SCRUM_ITEM_MODAL";
export const HIDE_DELETE_SCRUM_ITEM_MODAL = "HIDE_DELETE_SCRUM_ITEM_MODAL";


// Tell app to toggle the display of the delete scrum item modal
export function toggleDeleteScrumItemModal () {

	return {

		type: TOGGLE_DELETE_SCRUM_ITEM_MODAL,
	};
}

// Tell the app to display the delete scrum item modal
export function showDeleteScrumItemModal (scrumId, scrumItemId, scrumItemType) {

	console.log (scrumId, scrumItemId, scrumItemType);
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