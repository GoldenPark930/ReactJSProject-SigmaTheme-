import { Map } from 'immutable';

import CurrentUserActions from '../constants/action-types/current-user';

// Define initial state
const initialState = Map({
  userData: Map({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    images: [],
  }),
});

// Handle actions
export default function (state = initialState, action) {
  switch (action.type) {
    // Store current group members list
    case CurrentUserActions.CURRENT_USER__SET_USER:
      return state
        .set('requestIsInProgress', false)
        .set('userData', Map({
          ...state.get('userData').toJS(),
          ...action.payload,
        }));

    // Reset the whole state
    case CurrentUserActions.CURRENT_USER__RESET_STATE:
      return initialState;

    default:
      return state;
  }
}
