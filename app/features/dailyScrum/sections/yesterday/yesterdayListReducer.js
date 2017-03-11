/**
 * @providesModule YesterdayListReducer
 */

import {

	FETCH_YESTERDAY_ITEMS,
	RECEIVE_YESTERDAY_ITEMS,
	ADD_YESTERDAY_ITEM,
	REMOVE_YESTERDAY_ITEM,
	TOGGLE_COMPLETE_YESTERDAY_ITEM,
	TOGGLE_CREATE_YESTERDAY_ITEM,
} from "YesterdayListActions";

//  Default state to prepare for null
const yesterdayListState = {

	isFetchingYesterdayItems: false,
	yesterdaysItems: [],
	toggleCreate: false,
};

const yesterdayListReducer = (state = yesterdayListState, action) => {
	
	switch (action.type) {

	case FETCH_YESTERDAY_ITEMS: {

		return {

			...state,
			isFetchingYesterdayItems: true,
		};
	}
	case RECEIVE_YESTERDAY_ITEMS: {

		let toDoItems = action.yesterdayScrumItems;
		return {

			...state,
			isFetchingYesterdayItems: false,
			yesterdaysItems: toDoItems,
		};
	}
	case ADD_YESTERDAY_ITEM:
		return {
			...state,
			yesterdaysItems: [
				...state.yesterdaysItems,
				action.newScrumItem,
			],
		};
	case REMOVE_YESTERDAY_ITEM: {
		
		let itemsList = [...state.yesterdaysItems];
		for (let i = 0; i < itemsList.length; i++) {
			
			let item = itemsList[i];
			if (item.id === action.itemId) {

				itemsList.splice(i,1);
			}
		}
		return {

			...state,
			yesterdaysItems: itemsList,
		};
	}
	case TOGGLE_COMPLETE_YESTERDAY_ITEM: {

		return {

			...state,
		};
	}
	case TOGGLE_CREATE_YESTERDAY_ITEM: {

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

export default yesterdayListReducer;