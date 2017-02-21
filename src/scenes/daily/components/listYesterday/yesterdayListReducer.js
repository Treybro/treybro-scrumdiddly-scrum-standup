/**
 * @providesModule YesterdayListReducer
 */

import {
	GET_YESTERDAY_ITEMS,
	ADD_YESTERDAY_ITEM,
	REMOVE_YESTERDAY_ITEM,
	BEGIN_EDIT_YESTERDAY_ITEM,
	FINISH_EDIT_YESTERDAY_ITEM,
} from "YesterdayListActions";

/*
*	TODO - get this out of here when we have local storage
*/
import sampleItems from "../../../../testData/sampleYesterdayItems.json";

//  Default state to prepare for null
const yesterdayListState = {

	yesterdaysItems: [],
	isEditingItem: false,
};

//	TODO - get this out of here and into the server side maybe?
let nextId = 7;

const yesterdayListReducer = (state = yesterdayListState, action) => {
	
	switch (action.type) {

	case GET_YESTERDAY_ITEMS:
		return {

			...state,
			yesterdaysItems: sampleItems,
		};
	case ADD_YESTERDAY_ITEM:
		//	TODO - get this out of here
		nextId++;
		return {
			...state,
			yesterdaysItems: [
				...state.yesterdaysItems, {

					id: nextId,
					itemText:action.itemText,
				},
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
	case BEGIN_EDIT_YESTERDAY_ITEM:
		return {

			...state,
			isEditingItem: true,
		};
	case FINISH_EDIT_YESTERDAY_ITEM:
		return {

			...state,
			isEditingItem: false,
		};
	default:
		return state;
	}
};

export default yesterdayListReducer;