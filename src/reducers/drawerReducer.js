import { LIST_ITEM_SELECTED } from "../actions/drawerActions";

//  Default state to prepare for null
const drawerState = {

	selected: false,
};

const drawerReducer = (state = drawerState, action) => {
	
	switch (action.type) {

		case "LIST_ITEM_SELECTED":
			console.log ("Drawer Reducer :: List Item Selected");
			return Object.assign({}, state, {

				selected: true,
			});
		default:
      		return state;
	}
}

export default drawerReducer;