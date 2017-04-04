/**
 * @providesModule TodayListReducer
 */

import {

	FETCH_TODAY_ITEMS,
	RECEIVE_TODAY_ITEMS,
	ADD_TODAY_ITEM,
	REMOVE_TODAY_ITEM,
	TOGGLE_CREATE_TODAY_ITEM,
	COMPLETED_TODAY_SCRUM_ITEM,
	CANCELED_TODAY_SCRUM_ITEM,
	ADD_BLOCKER_ITEM,
	FETCH_BLOCKER_ITEMS,
	RECEIVE_BLOCKER_ITEMS,
	REMOVE_BLOCKER_ITEM,
} from "TodayListActions";

//  Default state to prepare for null
const todayListState = {

	isFetchingTodayItems: false,
	todaysItems: [],
	toggleCreate: false,
	isFetchingBlockerItems: false,
	blockerItems: [],
};

const todayListReducer = (state = todayListState, action) => {
	
	switch (action.type) {

	case FETCH_TODAY_ITEMS: {

		return {

			...state,
			isFetchingTodayItems: true,
		};
	}
	case RECEIVE_TODAY_ITEMS: {

		let toDoItems = action.todayScrumItems;
		return {

			...state,
			isFetchingTodayItems: false,
			todaysItems: toDoItems,
		};
	}
	case ADD_TODAY_ITEM:
		return {
			...state,
			todaysItems: [
				action.newScrumItem,
				...state.todaysItems,
			],
		};
	case REMOVE_TODAY_ITEM: {
		
		let itemsList = [...state.todaysItems];
		for (let i = 0; i < itemsList.length; i++) {
			
			let item = itemsList[i];
			if (item.id === action.itemId) {

				itemsList.splice(i,1);
			}
		}
		return {

			...state,
			todaysItems: itemsList,
		};
	}
	case TOGGLE_CREATE_TODAY_ITEM: {

		let toggle = !state.toggleCreate;
		return {

			...state,
			toggleCreate: toggle,
		};
	}
	case COMPLETED_TODAY_SCRUM_ITEM : {

		return {

			...state,
		};
	}
	case CANCELED_TODAY_SCRUM_ITEM : {

		return {

			...state,
		};
	}
	case FETCH_BLOCKER_ITEMS : {

		return {

			...state,
			isFetchingBlockerItems: true,
		};
	}
	case RECEIVE_BLOCKER_ITEMS : {

		let toDoItems = action.todayScrumItems;
		console.log (toDoItems);
		return {

			...state,
			isFetchingBlockerItems: false,
			blockerItems: toDoItems,
		};
	}
	case ADD_BLOCKER_ITEM : {

		return {
			...state,
			blockerItems: [
				action.newScrumItem,
				...state.blockerItems,
			],
		};
	}
	case REMOVE_BLOCKER_ITEM : {
		
		let itemsList = [...state.blockerItems];
		for (let i = 0; i < itemsList.length; i++) {
			
			let item = itemsList[i];
			if (item.originalScrumItemId === action.itemId) {

				itemsList.splice(i,1);
			}
		}
		return {

			...state,
			blockerItems: itemsList,
		};
	}
	default:
		return state;
	}
};

export default todayListReducer;