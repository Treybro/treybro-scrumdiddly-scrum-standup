/**
 * @providesModule BlockerHistoryReducer
 */

import {

	RECEIVE_SCRUM_BLOCKERS,
	SET_NAVIGATION_BACK,
	SELECTED_SCRUM_ITEM,
	FINDING_SCRUM_ITEM,
} from "BlockerHistoryActions";

//  Default state to prepare for null
const blockerHistoryState = {

	currentBlockers: [],
	backNavigation: {},
	displayDetails: false,
	selectedScrumItem: {},
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
	case FINDING_SCRUM_ITEM : {

		return {

			...state,
			displayDetails: false,
		};
	}
	case SELECTED_SCRUM_ITEM : {

		return {

			...state,
			selectedScrumItem: action.scrum,
			displayDetails: true,
		};
	}
	default:
		return state;
	}
};

export default blockerHistoryReducer;