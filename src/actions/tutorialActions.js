export const TUTORIAL_COMPLETED = 'TUTORIAL_COMPLETED';

//	Action to declare the user has finished the tutorial section
export function completeTutorial () {

  return {

    type: TUTORIAL_COMPLETED,
  };
}