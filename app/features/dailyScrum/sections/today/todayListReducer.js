/**
 * @providesModule TodayListReducer
 */

import {

	FETCH_TODAY_ITEMS,
	RECEIVE_TODAY_ITEMS,
	ADD_TODAY_ITEM,
	REMOVE_TODAY_ITEM,
	TOGGLE_CREATE_TODAY_ITEM,
} from "TodayListActions";

//  Default state to prepare for null
const todayListState = {

	isFetchingTodayItems: false,
	todaysItems: [],
	toggleCreate: false,
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
				...state.todaysItems,
				action.newScrumItem,
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
	default:
		return state;
	}
};

export default todayListReducer;