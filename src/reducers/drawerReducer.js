import { LIST_ITEM_SELECTED } from "../actions/drawerActions";

//  Default state to prepare for null
const initialState = {

	selected: false,
};

//  User has finished the opening tutorial section
export default function toDoApp2 (state = initialState, action) {

	if (action.type === LIST_ITEM_SELECTED) {

		console.log ("HELLO FROM ME");
		return Object.assign({}, state, {

			selected: true,
		});
	}

	return state;
}