/**
 * @providesModule BlockerHistoryReducer
 */

import {

	RECEIVE_SCRUM_BLOCKERS,
} from "BlockerHistoryActions";

//  Default state to prepare for null
const blockerHistoryState = {

	currentBlockers: [],
};

const blockerHistoryReducer = (state = blockerHistoryState, action) => {

	switch (action.type) {

	case RECEIVE_SCRUM_BLOCKERS : {

		return {

			...state,
			currentBlockers: action.currentBlockers,
		};
	}
	default:
		return state;
	}
};

export default blockerHistoryReducer;