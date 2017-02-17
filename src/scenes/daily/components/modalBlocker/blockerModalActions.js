/**
 * @providesModule BlockerModalActions
 */

export const SHOW_BLOCKER_MODAL = "SHOW_BLOCKER_MODAL";
export const CLOSE_BLOCKER_MODAL = "CLOSE_BLOCKER_MODAL";

//	Present the Blocker Modal
export function showBlockerModal () {

	return {

		type: SHOW_BLOCKER_MODAL,
	};
}

//	Close the Blocker Modal
export function closeBlockerModal () {

	return {

		type: CLOSE_BLOCKER_MODAL,
	};
}