/**
 * @providesModule ModalReducer
 */

import { 

	TOGGLE_DELETE_SCRUM_ITEM_MODAL, 
	SHOW_DELETE_SCRUM_ITEM_MODAL, 
	HIDE_DELETE_SCRUM_ITEM_MODAL,
	SHOW_DELETE_SCRUM_ITEM_MODAL_YESTERDAY_ITEM,
	SHOW_DELETE_SCRUM_ITEM_MODAL_TODAY_ITEM,
	TOGGLE_BLOCKED_ERROR_MODAL,
	SHOW_BLOCKED_ERROR_MODAL,
	HIDE_BLOCKED_ERROR_MODAL,
	TOGGLE_COMPLETED_ERROR_MODAL,
	SHOW_COMPLETED_ERROR_MODAL,
	HIDE_COMPLETED_ERROR_MODAL,
	TOGGLE_DELETE_ERROR_MODAL,
	SHOW_DELETE_ERROR_MODAL,
	HIDE_DELETE_ERROR_MODAL,
	TOGGLE_BLOCKER_MODAL,
	SHOW_BLOCKER_MODAL,
	HIDE_BLOCKER_MODAL,
} from "ModalActions";

//  Default state to prepare for null
const defaultModalState = {

	showDeleteScrumItemModal: false,
	scrumItemDetails: {},
	showBlockedErrorModal: false,
	showCompletedErrorModal: false,
	showDeleteErrorModal: false,
	errorDescription: "",
	showBlockerModal: false,
};

const modalReducer = (state = defaultModalState, action) => {

	switch (action.type) {

	case TOGGLE_DELETE_SCRUM_ITEM_MODAL: {

		return {

			...state,
			showDeleteScrumItemModal: !state.showDeleteScrumItemModal,
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
			showDeleteScrumItemModal: true,
			scrumItemDetails: details,
		};
	}
	case HIDE_DELETE_SCRUM_ITEM_MODAL: {

		return {

			...state,
			showDeleteScrumItemModal: false,
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

			...state,
			showDeleteScrumItemModal: true,
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

			...state,
			showDeleteScrumItemModal: true,
			scrumItemDetails: details,
		};
	}
	case TOGGLE_BLOCKED_ERROR_MODAL : {

		return {

			...state,
			showBlockedErrorModal: !state.showBlockedErrorModal,
		};
	}
	case SHOW_BLOCKED_ERROR_MODAL : {

		return {

			...state,
			showBlockedErrorModal: true,
		};
	}
	case HIDE_BLOCKED_ERROR_MODAL : {

		return {

			...state,
			showBlockedErrorModal: false,
		};
	}
	case TOGGLE_COMPLETED_ERROR_MODAL : {

		return {

			...state,
			showCompletedErrorModal: !state.showCompletedErrorModal,
		};
	}
	case SHOW_COMPLETED_ERROR_MODAL : {

		return {

			...state,
			showCompletedErrorModal: true,
		};
	}
	case HIDE_COMPLETED_ERROR_MODAL : {

		return {

			...state,
			showCompletedErrorModal: false,
		};
	}
	case TOGGLE_DELETE_ERROR_MODAL : {

		return {

			...state,
			showDeleteErrorModal: !state.showDeleteErrorModal,
		};
	}
	case SHOW_DELETE_ERROR_MODAL : {

		return {

			...state,
			showDeleteErrorModal: true,
			errorDescription: action.errorDescription,
		};
	}
	case HIDE_DELETE_ERROR_MODAL : {

		return {

			...state,
			showDeleteErrorModal: false,
			errorDescription: "",
		};
	}
	case TOGGLE_BLOCKER_MODAL : {

		return {

			...state,
			showBlockerModal: !state.showBlockerModal,
		};
	}
	case SHOW_BLOCKER_MODAL : {

		return {

			...state,
			showBlockerModal: true,
		};
	}
	case HIDE_BLOCKER_MODAL : {

		return {

			...state,
			showBlockerModal: false,
		};
	}
	default:
		return {

			...state,
		};
	}
};

export default modalReducer;