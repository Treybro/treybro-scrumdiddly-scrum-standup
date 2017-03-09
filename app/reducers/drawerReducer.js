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

		state.drawer.navigate ("DrawerOpen");
		return {

			...state,
			drawer: state.drawer,
		};
	}
	case CLOSE_DRAWER: {

		state.drawer.navigate ("DrawerClose");
		return {

			...state,
			drawer: state.drawer,
		};
	}
	default:
		return state;
	}
};

export default tutorialReducer;