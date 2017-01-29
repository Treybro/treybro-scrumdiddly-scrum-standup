import { TUTORIAL_COMPLETED } from '../actions/tutorialActions';

const initialState = {

  hasViewedTutorial: false,
};

export default function toDoApp (state = initialState, action) {

  if (action.type === TUTORIAL_COMPLETED) {
    
    console.log ('Tutorial Completed Action triggered');
    return {

      ...state,
      hasViewedTutorial: true,
    };
  }

  return state;
}