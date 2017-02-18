/**
 * @providesModule YesterdayListReducer
 */

import {
	GET_YESTERDAY_ITEMS,
	ADD_YESTERDAY_ITEM,
	REMOVE_YESTERDAY_ITEM,
	EDIT_YESTERDAY_ITEM,
} from "YesterdayListActions";

//  Default state to prepare for null
const yesterdayListState = {

	yesterdaysItems: [],
};

const yesterdayListReducer = (state = yesterdayListState, action) => {
	
	switch (action.type) {

	case GET_YESTERDAY_ITEMS:
		return {

			...state,
			yesterdaysItems: [{itemText:"Hello!"},{itemText:"Yo!"}],
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
	case REMOVE_YESTERDAY_ITEM:
		return {

			...state,
		};
	case EDIT_YESTERDAY_ITEM:
		return {

			...state,
		};
	default:
		return state;
	}
};

export default yesterdayListReducer;