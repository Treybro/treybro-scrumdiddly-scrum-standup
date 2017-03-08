/**
 * @providesModule DrawerReducer
 */

import { SET_NAVDRAWER, OPEN_DRAWER, CLOSE_DRAWER } from "DrawerActions";

//  Default state to prepare for null
const drawerState = {

	drawer: {},
};

const tutorialReducer = (state = drawerState, action) => {

	switch (action.type) {

	case SET_NAVDRAWER: {

		let navDrawer = action.navItem;
		return {

			...state,
			drawer: navDrawer,
		};
	}
	case OPEN_DRAWER: {
		return {

			...state,
		};
	}
	case CLOSE_DRAWER: {

		return {
			...state,
		};
	}
	default:
		return state;
	}
};

export default tutorialReducer;