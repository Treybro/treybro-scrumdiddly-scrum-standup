/**
 * @providesModule ModalReducer
 */

import { 

	TOGGLE_DELETE_SCRUM_ITEM_MODAL, 
	SHOW_DELETE_SCRUM_ITEM_MODAL, 
	HIDE_DELETE_SCRUM_ITEM_MODAL,
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
	default:
		return state;
	}
};

export default modalReducer;