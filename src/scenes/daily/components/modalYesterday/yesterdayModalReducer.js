/**
 * @providesModule YesterdayModalReducer
 */

import { SHOW_YESTERDAY_MODAL, CLOSE_YESTERDAY_MODAL } from "YesterdayModalActions";

//  Default state to prepare for null
const modalDisplayState = {

	displayModal: false,
};

const yesterdayModalReducer = (state = modalDisplayState, action) => {
	
	switch (action.type) {

	case SHOW_YESTERDAY_MODAL:
		return {

			...state,
			displayModal: true,
		};
	case CLOSE_YESTERDAY_MODAL:
		return {

			...state,
			displayModal: false,
		};
	default:
		return state;
	}
};

export default yesterdayModalReducer;