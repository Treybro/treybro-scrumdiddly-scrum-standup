/**
 * @providesModule BlockerModalReducer
 */

import { SHOW_BLOCKER_MODAL, CLOSE_BLOCKER_MODAL } from "BlockerModalActions";

//  Default state to prepare for null
const modalDisplayState = {

	displayModal: false,
};

const blockerModalReducer = (state = modalDisplayState, action) => {
	
	switch (action.type) {

	case SHOW_BLOCKER_MODAL:
		return {

			...state,
			displayModal: true,
		};
	case CLOSE_BLOCKER_MODAL:
		return {

			...state,
			displayModal: false,
		};
	default:
		return state;
	}
};

export default blockerModalReducer;