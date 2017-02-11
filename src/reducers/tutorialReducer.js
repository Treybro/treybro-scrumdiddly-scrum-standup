/**
 * @providesModule TutorialReducer
 */

import { TUTORIAL_COMPLETED } from "TutorialActions";

//  Default state to prepare for null
const tutorialState = {

	hasViewedTutorial: true,
};

const tutorialReducer = (state = tutorialState, action) => {

	switch (action.type) {

	case TUTORIAL_COMPLETED:
		return {
			...state,
			hasViewedTutorial: true,
		};
	default:
		return state;
	}
};

export default tutorialReducer;