import { TUTORIAL_COMPLETED } from '../actions/tutorialActions';

//  Default state to prepare for null
const initialState = {

  hasViewedTutorial: false,
};

//  User has finished the opening tutorial section
export default function toDoApp (state = initialState, action) {

  if (action.type === TUTORIAL_COMPLETED) {

    return Object.assign({}, state, {

      hasViewedTutorial: true,
    })
  }

  return state;
}