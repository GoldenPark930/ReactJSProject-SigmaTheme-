import { combineReducers } from 'redux';

import LogoutActions from '../constants/action-types/logout';
import * as UpperLevelKeys from '../constants/store/upper-level-keys';
import NotificationsReducer from './notifications';
import CurrentGroupReducer from './current-group';
import CurrentUserReducer from './current-user';
import ContactsListReducer from './contacts-list';
import PhoneNumberReducer from './phone-number';
import UserReducer from './user';
import NavWorkaroundReducer from './nav-workaround';
import PermissionReducer from './permission';
import MyGroups from './my-groups';
import Auth from './auth';
import Linking from './linking';
import Interval from './interval';
import Groups from './groups';
import Charges from './charges';


// Combine all application reducers to delegate them to
// the root reducer that will be exported as the default
const appReducer = combineReducers({
  [UpperLevelKeys.NOTIFICATIONS]: NotificationsReducer,
  [UpperLevelKeys.CURRENT_GROUP]: CurrentGroupReducer,
  [UpperLevelKeys.USER]: UserReducer,
  [UpperLevelKeys.CONTACTS_LIST]: ContactsListReducer,
  [UpperLevelKeys.PERMISSION]: PermissionReducer,
  [UpperLevelKeys.NAV_WORKAROUND]: NavWorkaroundReducer,
  [UpperLevelKeys.CURRENT_USER]: CurrentUserReducer,
  [UpperLevelKeys.PHONE_NUMBER]: PhoneNumberReducer,
  [UpperLevelKeys.MY_GROUPS]: MyGroups,
  [UpperLevelKeys.AUTH]: Auth,
  [UpperLevelKeys.LINKING]: Linking,
  [UpperLevelKeys.INTERVAL]: Interval,
  [UpperLevelKeys.GROUPS]: Groups,
  [UpperLevelKeys.CHARGES]: Charges,
});

export default (state, action) => {
  // Handle logout on the global level to reset the whole Redux store and as a
  // result application state so we don't need to reset each reducer separately.
  if (action.type === LogoutActions.LOGOUT__LOGOUT__SUBTYPES.START) {
    // Reassign the reference of a local variable called `state` to `undefined` before
    // passing it to another reducer. Reducers are supposed to return the initial state
    // when they are called with `undefined` as the first argument, no matter the action.

    // eslint-disable-next-line
    state = undefined;
  }

  // Delegate handling the action to the reducer generated by `combineReducers()`
  return appReducer(state, action);
};