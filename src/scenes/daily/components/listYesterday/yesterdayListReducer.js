/**
 * @providesModule YesterdayListReducer
 */

import {

	GET_YESTERDAY_ITEMS,
	ADD_YESTERDAY_ITEM,
	REMOVE_YESTERDAY_ITEM,
	TOGGLE_COMPLETE_YESTERDAY_ITEM,
	TOGGLE_CREATE_YESTERDAY_ITEM,
} from "YesterdayListActions";

/*
*	TODO - get this out of here when we have local storage
*/
import sampleItems from "../../../../testData/sampleYesterdayItems.json";

//  Default state to prepare for null
const yesterdayListState = {

	yesterdaysItems: [],
	toggleCreate: false,
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
					completed: false,
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
	case TOGGLE_COMPLETE_YESTERDAY_ITEM: {

		console.log (action.itemId + " - " + action.completedState);
		return {

			...state,
		};
	}
	case TOGGLE_CREATE_YESTERDAY_ITEM: {

		console.log ("Toggling create");
		let toggle = !state.toggleCreate
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