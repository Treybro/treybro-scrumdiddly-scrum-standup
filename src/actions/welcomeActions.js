/**
 * @providesModule WelcomeActions
 */

export const ENTER_BUTTON_PRESSED = "ENTER_BUTTON_PRESSED";

//	Action to declare the user has pressed the enter button
export function enterButtonPressed () {

	return {

		type: ENTER_BUTTON_PRESSED,
	};
}