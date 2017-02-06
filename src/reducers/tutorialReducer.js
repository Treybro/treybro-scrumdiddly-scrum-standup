import { TUTORIAL_COMPLETED } from "../actions/tutorialActions";

//  Default state to prepare for null
const tutorialState = {

	hasViewedTutorial: true,
};

const tutorialReducer = (state = tutorialState, action) => {

	switch (action.type) {

		case "TUTORIAL_COMPLETED":
			console.log ("Tutorial Reducer :: Tutorial Completed");
			return Object.assign({}, state, {

				hasViewedTutorial: true,
			});
		default:
      		return state;
	}
}

export default tutorialReducer;