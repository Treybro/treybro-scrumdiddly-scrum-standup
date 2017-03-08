/**
 * @providesModule DrawerActions
 */

export const SET_NAVDRAWER = "SET_NAVDRAWER";
export const OPEN_DRAWER = "OPEN_DRAWER";
export const CLOSE_DRAWER = "CLOSE_DRAWER";

// Sets the drawer nav
export function setDrawerNav (navItem) {

	return {

		type:SET_NAVDRAWER,
		navItem,
	};
}

//	Opens the App drawer
export function openDrawer () {

	return {

		type: OPEN_DRAWER,
	};
}

// Closes the App drawer
export function closeDrawer () {

	return {

		type: CLOSE_DRAWER,
	};
}