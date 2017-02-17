/**
 * @providesModule YesterdayModalActions
 */

export const SHOW_YESTERDAY_MODAL = "PRESENT_YESTERDAY_MODAL";
export const CLOSE_YESTERDAY_MODAL = "CLOSE_YESTERDAY_MODAL";

//	Present the yesterday Modal
export function showYesterdayModal () {

	return {

		type: SHOW_YESTERDAY_MODAL,
	};
}

//	Close the Yesterday Modal
export function closeYesterdayModal () {

	return {

		type: CLOSE_YESTERDAY_MODAL,
	};
}