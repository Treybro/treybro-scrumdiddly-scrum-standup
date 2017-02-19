/**
 * @providesModule YesterdayListReducer
 */

import {
	GET_YESTERDAY_ITEMS,
	ADD_YESTERDAY_ITEM,
	REMOVE_YESTERDAY_ITEM,
	EDIT_YESTERDAY_ITEM,
} from "YesterdayListActions";

/*
*	TODO - get this out of here when we have local storage
*/
import sampleItems from "../../../../testData/sampleYesterdayItems.json";

//  Default state to prepare for null
const yesterdayListState = {

	yesterdaysItems: [],
};

const yesterdayListReducer = (state = yesterdayListState, action) => {
	
	switch (action.type) {

	case GET_YESTERDAY_ITEMS:
		return {

			...state,
			yesterdaysItems: sampleItems,
		};
	case ADD_YESTERDAY_ITEM:
		return {
			...state,
			yesterdaysItems: [
				...state.yesterdaysItems, {

					itemText:action.itemText,
				},
			],
		};
	case REMOVE_YESTERDAY_ITEM: {

		let itemsList = [...state.yesterdaysItems];
		for (let i = 0; i < itemsList.length; i++) {

			console.log ("IN HERE");
			let item = itemsList[i];
			if (item.id === action.itemId) {

				itemsList.splice(i,1);
				console.log (itemsList);
			}
		}
		return {

			...state,
			yesterdaysItems: itemsList,
		};
	}
	case EDIT_YESTERDAY_ITEM:
		return {

			...state,
		};
	default:
		return state;
	}
};

export default yesterdayListReducer;