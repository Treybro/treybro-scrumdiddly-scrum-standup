/**
 * @providesModule TodayModalReducer
 */

import { SHOW_TODAY_MODAL, CLOSE_TODAY_MODAL } from "TodayModalActions";

//  Default state to prepare for null
const modalDisplayState = {

	displayModal: false,
};

const todayModalReducer = (state = modalDisplayState, action) => {
	
	switch (action.type) {

	case SHOW_TODAY_MODAL:
		return {

			...state,
			displayModal: true,
		};
	case CLOSE_TODAY_MODAL:
		return {

			...state,
			displayModal: false,
		};
	default:
		return state;
	}
};

export default todayModalReducer;