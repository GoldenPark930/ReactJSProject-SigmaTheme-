import { Map, List } from 'immutable';

import ContactsListActions from '../constants/action-types/contacts-list';

// Define initial state
const initialState = Map({
  errors: Map({}),
  // Flags
  requestIsInProgress: false,
  // Data
  contacts: List([]),
});

// Handle actions
export default function (state = initialState, action) {
  switch (action.type) {
    // Start/continue the process
    case ContactsListActions.CONTACTS_LIST__CHECK_PERMISSIONS__START:
    case ContactsListActions.CONTACTS_LIST__REQUEST_PERMISSIONS__START:
    case ContactsListActions.CONTACTS_LIST__GET_ALL__START:
      return state
        .set('requestIsInProgress', true);

    // Stop the process
    case ContactsListActions.CONTACTS_LIST__CHECK_PERMISSIONS__DENIED:
    case ContactsListActions.CONTACTS_LIST__CHECK_PERMISSIONS__UNDEFINED:
    case ContactsListActions.CONTACTS_LIST__REQUEST_PERMISSIONS__DENIED:
      return state
        .set('requestIsInProgress', false);

    // Something went wrong - store errors
    case ContactsListActions.CONTACTS_LIST__CHECK_PERMISSIONS__FAIL:
    case ContactsListActions.CONTACTS_LIST__REQUEST_PERMISSIONS__FAIL:
    case ContactsListActions.CONTACTS_LIST__GET_ALL__FAIL:
      return state
        .set('requestIsInProgress', false)
        .set('errors', Map(action.errors));

    // Store contacts list
    case ContactsListActions.CONTACTS_LIST__GET_ALL__SUCCESS:
      return state
        .set('requestIsInProgress', false)
        .set('contacts', List(action.payload));

    // Reset the whole state
    case ContactsListActions.CONTACTS_LIST__RESET_STATE:
      return initialState;

    default:
      return state;
  }
}
