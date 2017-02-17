/**
 * @providesModule TodayModalActions
 */

export const SHOW_TODAY_MODAL = "SHOW_TODAY_MODAL";
export const CLOSE_TODAY_MODAL = "CLOSE_TODAY_MODAL";

//	Present the today Modal
export function showTodayModal () {

	return {

		type: SHOW_TODAY_MODAL,
	};
}

//	Close the today Modal
export function closeTodayModal () {

	return {

		type: CLOSE_TODAY_MODAL,
	};
}