/**
 * @providesModule BlockerHistoryReducer
 */

import {

	RECEIVE_SCRUM_BLOCKERS,
	SET_NAVIGATION_BACK,
} from "BlockerHistoryActions";

//  Default state to prepare for null
const blockerHistoryState = {

	currentBlockers: [],
	backNavigation: {},
};

const blockerHistoryReducer = (state = blockerHistoryState, action) => {

	switch (action.type) {

	case RECEIVE_SCRUM_BLOCKERS : {

		return {

			...state,
			currentBlockers: action.currentBlockers.reverse (),
		};
	}
	case SET_NAVIGATION_BACK : {

		return {

			...state,
			backNavigation: action.backNavigation,
		};
	}
	default:
		return state;
	}
};

export default blockerHistoryReducer;