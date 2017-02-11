/**
 * @providesModule WelcomeReducer
 */

import { ENTER_BUTTON_PRESSED } from "WelcomeActions";

//  Default state to prepare for null
const welcomeState = {

	enterButtonPressed: true,
};

const welcomeReducer = (state = welcomeState, action) => {
	
	switch (action.type) {

		case "ENTER_BUTTON_PRESSED":
			console.log ("Welcome Reducer :: Enter Button Pressed");
			return Object.assign({}, state, {

				enterButtonPressed: true,
			});
		default:
      		return state;
	}
}

export default welcomeReducer;