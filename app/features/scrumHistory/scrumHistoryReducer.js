/**
 * @providesModule ScrumHistoryReducer
 */

import {

	FETCH_SCRUM_HISTORY,
	RECEIVE_SCRUM_HISTORY,
} from "ScrumHistoryActions";

//  Default state to prepare for null
const scrumHistoryState = {
	
	scrumData: {},
	eventDates: [],
	isLoadingHistory: false,
};

const scrumHistoryReducer = (state = scrumHistoryState, action) => {

	switch (action.type) {

	case FETCH_SCRUM_HISTORY: {

		return {

			...state,
			isLoadingHistory: true,
		};
	}
	case RECEIVE_SCRUM_HISTORY: {
		
		let scrumHistory = action.scrumData;
		let scrumEventDates = action.eventDates;

		return {

			...state,
			isLoadingHistory: false,
			scrumData: scrumHistory,
			eventDates: scrumEventDates,
		};
	}
	default:
		return state;
	}
};

export default scrumHistoryReducer;