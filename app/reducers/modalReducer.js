/**
 * @providesModule ModalReducer
 */

import { 

	TOGGLE_DELETE_SCRUM_ITEM_MODAL, 
	SHOW_DELETE_SCRUM_ITEM_MODAL, 
	HIDE_DELETE_SCRUM_ITEM_MODAL,
	SHOW_DELETE_SCRUM_ITEM_MODAL_YESTERDAY_ITEM,
	SHOW_DELETE_SCRUM_ITEM_MODAL_TODAY_ITEM,
} from "ModalActions";

//  Default state to prepare for null
const defaultModalState = {

	toggleDeleteScrumItemModal: false,
	scrumItemDetails: {},
};

const modalReducer = (state = defaultModalState, action) => {

	switch (action.type) {

	case TOGGLE_DELETE_SCRUM_ITEM_MODAL: {

		return {

			...state,
			toggleDeleteScrumItemModal: !state.toggleDeleteScrumItemModal,
		};
	}
	case SHOW_DELETE_SCRUM_ITEM_MODAL: {

		let details = {

			scrumId: action.scrumId,
			scrumItemId: action.scrumItemId,
			scrumItemType: action.scrumItemType,
		};

		return {

			...state,
			toggleDeleteScrumItemModal: true,
			scrumItemDetails: details,
		};
	}
	case HIDE_DELETE_SCRUM_ITEM_MODAL: {

		return {

			...state,
			toggleDeleteScrumItemModal: false,
		};
	}
	//	TODO - get rid of this
	case SHOW_DELETE_SCRUM_ITEM_MODAL_YESTERDAY_ITEM: {

		let details = {

			scrumId: "yesterday-item",
			scrumItemId: action.yesterdayItemId,
			scrumItemType: "yesterday",
		};

		return {

			toggleDeleteScrumItemModal: true,
			scrumItemDetails: details,
		};
	}
	//	TODO - get rid of this
	case SHOW_DELETE_SCRUM_ITEM_MODAL_TODAY_ITEM: {

		let details = {

			scrumId: "today-item",
			scrumItemId: action.todayItemId,
			scrumItemType: "today",
		};

		return {

			toggleDeleteScrumItemModal: true,
			scrumItemDetails: details,
		};
	}
	default:
		return state;
	}
};

export default modalReducer;