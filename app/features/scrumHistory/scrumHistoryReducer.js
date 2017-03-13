/**
 * @providesModule ScrumHistoryReducer
 */

import {

	FETCH_SCRUM_HISTORY,
	RECEIVE_SCRUM_HISTORY,
	FINDING_SCRUM_ITEM,
	FOUND_SCRUM_ITEM,
	TOGGLE_CALENDAR,
} from "ScrumHistoryActions";

//  Default state to prepare for null
const scrumHistoryState = {
	
	scrumData: {},
	eventDates: [],
	isLoadingHistory: true,
	selectedScrumItem: {},
	isSearchingForScrum: true,
	displayCalendar: true,
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
	case FINDING_SCRUM_ITEM: {

		return {

			...state,
			isSearchingForScrum: false,
		};
	}
	case FOUND_SCRUM_ITEM: {

		let foundScrumItem = action.scrumItem;
		if (foundScrumItem === undefined || foundScrumItem === null) {

			foundScrumItem = {};
		}

		return {

			...state,
			isSearchingForScrum: false,
			selectedScrumItem: foundScrumItem,
		};
	}
	case TOGGLE_CALENDAR: {

		let toggle = !state.displayCalendar;
		return {

			...state,
			displayCalendar: toggle,
		};
	}
	default:
		return state;
	}
};

export default scrumHistoryReducer;