import NavWorkaroundActions from '../constants/action-types/nav-workaround';

// Define initial state
const initialState = {};

// Handle actions
export default function (state = initialState, action) {
  switch (action.type) {
    case NavWorkaroundActions.NAV_WORKAROUND__UPDATE_STATE:
      return {
        ...state,
        ...action.payload,
      };

    case NavWorkaroundActions.NAV_WORKAROUND__RESET_STATE:
      return initialState;

    default:
      return state;
  }
}
