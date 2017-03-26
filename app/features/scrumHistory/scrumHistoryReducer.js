/**
 * @providesModule ScrumHistoryReducer
 */

import moment from "moment";
import {

	FETCH_SCRUM_HISTORY,
	RECEIVE_SCRUM_HISTORY,
	FINDING_SCRUM_ITEM,
	FOUND_SCRUM_ITEM,
	TOGGLE_CALENDAR,
	FETCH_SCRUM_ITEMS,
	RECEIVE_SCRUM_ITEMS,
	TOGGLE_CREATE_SCRUM_YESTERDAY_ITEM,
	TOGGLE_CREATE_SCRUM_TODAY_ITEM,
	REMOVE_SCRUM_YESTERDAY_ITEM,
	REMOVE_SCRUM_TODAY_ITEM,
} from "ScrumHistoryActions";

//  Default state to prepare for null
const scrumHistoryState = {
	
	scrumData: {},
	eventDates: [],
	isLoadingHistory: true,
	selectedScrumItem: {},
	selectedScrumDate: moment (),
	isSearchingForScrum: true,
	displayCalendar: true,
	scrumYesterdayItems: [],
	scrumTodayItems: [],
	toggleCreateYesterdayItem: false,
	toggleCreateTodayItem: false,
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
			isSearchingForScrum: true,
		};
	}
	case FOUND_SCRUM_ITEM: {

		let foundScrumItem = action.scrumItem;
		let suppliedDate = action.suppliedDate;
		if (foundScrumItem === undefined || foundScrumItem === null) {

			foundScrumItem = {};
		}
		
		return {

			...state,
			isSearchingForScrum: false,
			selectedScrumItem: foundScrumItem,
			selectedScrumDate: suppliedDate,
		};
	}
	case TOGGLE_CALENDAR: {

		let toggle = !state.displayCalendar;
		return {

			...state,
			displayCalendar: toggle,
		};
	}
	case FETCH_SCRUM_ITEMS: {

		return {

			...state,
		};
	}
	case RECEIVE_SCRUM_ITEMS: {

		let itemType = action.itemType;
		if (itemType === "yesterday") {

			return {

				...state,
				scrumYesterdayItems: action.foundScrumItems,
			};
		} else {

			return {

				...state,
				scrumTodayItems: action.foundScrumItems,
			};
		}
	}
	case TOGGLE_CREATE_SCRUM_YESTERDAY_ITEM: {

		let toggle = action.toggle;
		return {

			...state,
			toggleCreateYesterdayItem: toggle,
		};
	}
	case TOGGLE_CREATE_SCRUM_TODAY_ITEM: {

		let toggle = action.toggle;
		return {

			...state,
			toggleCreateTodayItem: toggle,
		};
	}
	case REMOVE_SCRUM_YESTERDAY_ITEM: {

		let itemsList = [...state.scrumYesterdayItems];
		for (let i = 0; i < itemsList.length; i++) {
			
			let item = itemsList[i];
			if (item.id === action.itemId) {

				itemsList.splice(i,1);
			}
		}

		return {

			...state,
			scrumYesterdayItems: itemsList,
		};
	}
	case REMOVE_SCRUM_TODAY_ITEM: {

		let itemsList = [...state.scrumTodayItems];
		for (let i = 0; i < itemsList.length; i++) {
			
			let item = itemsList[i];
			if (item.id === action.itemId) {

				itemsList.splice(i,1);
			}
		}

		return {

			...state,
			scrumTodayItems: itemsList,
		};
	}
	default:
		return state;
	}
};

export default scrumHistoryReducer;