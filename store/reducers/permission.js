import { Map } from 'immutable';

import * as Permission from '../constants/permission';
import PermissionActions from '../constants/action-types/permission';

// Define initial state
const initialState = Map({
  errors: Map({}),
  permissionErrors: Map({}),
  // Flags
  requestingPermissionIsInProgress: false,
  contacts: Permission.UNDEFINED,
  location: Permission.UNDEFINED,
  notifications: Permission.UNDEFINED,
  photo: Permission.UNDEFINED,
  camera: Permission.UNDEFINED,
});

// Handle actions
export default function (state = initialState, action) {
  switch (action.type) {
    /*
    |---------------------------------------------------------------------------
    | All permission handlers
    |---------------------------------------------------------------------------
    */

    case PermissionActions.PERMISSION__CHECK_ALL__SUBTYPES.FAIL_CONTACTS:
    case PermissionActions.PERMISSION__CHECK_CONTACTS_PERMISSION__SUBTYPES.FAIL:
    case PermissionActions.PERMISSION__REQUEST_CONTACTS_PERMISSION__SUBTYPES.FAIL:
      return state.set('errors', Map({
        ...state.get('errors').toJS(),
        checkContacts: action.errors,
      }));

    case PermissionActions.PERMISSION__CHECK_ALL__SUBTYPES.FAIL_LOCATION:
    case PermissionActions.PERMISSION__CHECK_LOCATION_PERMISSION__SUBTYPES.FAIL:
    case PermissionActions.PERMISSION__REQUEST_LOCATION_PERMISSION__SUBTYPES.FAIL:
      return state.set('errors', Map({
        ...state.get('errors').toJS(),
        checkLocation: action.errors,
      }));

    case PermissionActions.PERMISSION__CHECK_ALL__SUBTYPES.FAIL_NOTIFICATIONS:
    case PermissionActions.PERMISSION__CHECK_NOTIFICATIONS_PERMISSION__SUBTYPES.FAIL:
    case PermissionActions.PERMISSION__REQUEST_NOTIFICATIONS_PERMISSION__SUBTYPES.FAIL:
      return state.set('errors', Map({
        ...state.get('errors').toJS(),
        checkNotifications: action.errors,
      }));

    case PermissionActions.PERMISSION__CHECK_ALL__SUBTYPES.FAIL_PHOTO:
    case PermissionActions.PERMISSION__CHECK_PHOTO_PERMISSION__SUBTYPES.FAIL:
    case PermissionActions.PERMISSION__REQUEST_PHOTO_PERMISSION__SUBTYPES.FAIL:
      return state.set('errors', Map({
        ...state.get('errors').toJS(),
        checkPhoto: action.errors,
      }));

    case PermissionActions.PERMISSION__CHECK_ALL__SUBTYPES.FAIL_CAMERA:
    case PermissionActions.PERMISSION__CHECK_CAMERA_PERMISSION__SUBTYPES.FAIL:
    case PermissionActions.PERMISSION__REQUEST_CAMERA_PERMISSION__SUBTYPES.FAIL:
      return state.set('errors', Map({
        ...state.get('errors').toJS(),
        checkCamera: action.errors,
      }));

    case PermissionActions.PERMISSION__REQUEST_CONTACTS_PERMISSION__START:
    case PermissionActions.PERMISSION__REQUEST_LOCATION_PERMISSION__START:
    case PermissionActions.PERMISSION__REQUEST_NOTIFICATIONS_PERMISSION__START:
    case PermissionActions.PERMISSION__REQUEST_PHOTO_PERMISSION__START:
    case PermissionActions.PERMISSION__REQUEST_CAMERA_PERMISSION__START:
      return state.set('requestingPermissionIsInProgress', true);

    /*
    |---------------------------------------------------------------------------
    | Contacts permission handlers
    |---------------------------------------------------------------------------
    */

    case PermissionActions.PERMISSION__CHECK_CONTACTS_PERMISSION__SUBTYPES.UNDEFINED:
    case PermissionActions.PERMISSION__REQUEST_CONTACTS_PERMISSION__SUBTYPES.UNDEFINED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('contacts', Permission.UNDEFINED);

    case PermissionActions.PERMISSION__CHECK_CONTACTS_PERMISSION__SUBTYPES.AUTHORIZED:
    case PermissionActions.PERMISSION__REQUEST_CONTACTS_PERMISSION__SUBTYPES.AUTHORIZED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('contacts', Permission.AUTHORIZED);

    case PermissionActions.PERMISSION__CHECK_CONTACTS_PERMISSION__SUBTYPES.DENIED:
    case PermissionActions.PERMISSION__REQUEST_CONTACTS_PERMISSION__SUBTYPES.DENIED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('contacts', Permission.DENIED)
        .set('permissionErrors', Map({
          ...state.get('permissionErrors').toJS(),
          contacts: Permission.CONTACTS_DENIED_MESSAGE,
        }));

    /*
    |---------------------------------------------------------------------------
    | Location permission handlers
    |---------------------------------------------------------------------------
    */

    case PermissionActions.PERMISSION__CHECK_LOCATION_PERMISSION__SUBTYPES.UNDEFINED:
    case PermissionActions.PERMISSION__REQUEST_LOCATION_PERMISSION__SUBTYPES.UNDEFINED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('location', Permission.UNDEFINED);

    case PermissionActions.PERMISSION__CHECK_LOCATION_PERMISSION__SUBTYPES.AUTHORIZED:
    case PermissionActions.PERMISSION__REQUEST_LOCATION_PERMISSION__SUBTYPES.AUTHORIZED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('location', Permission.AUTHORIZED);

    case PermissionActions.PERMISSION__CHECK_LOCATION_PERMISSION__SUBTYPES.DENIED:
    case PermissionActions.PERMISSION__REQUEST_LOCATION_PERMISSION__SUBTYPES.DENIED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('location', Permission.DENIED)
        .set('permissionErrors', Map({
          ...state.get('permissionErrors').toJS(),
          location: Permission.LOCATION_DENIED_MESSAGE,
        }));

    /*
    |---------------------------------------------------------------------------
    | Notification permission handlers
    |---------------------------------------------------------------------------
    */

    case PermissionActions.PERMISSION__CHECK_NOTIFICATIONS_PERMISSION__SUBTYPES.UNDEFINED:
    case PermissionActions.PERMISSION__REQUEST_NOTIFICATIONS_PERMISSION__SUBTYPES.UNDEFINED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('notifications', Permission.UNDEFINED);

    case PermissionActions.PERMISSION__CHECK_NOTIFICATIONS_PERMISSION__SUBTYPES.AUTHORIZED:
    case PermissionActions.PERMISSION__REQUEST_NOTIFICATIONS_PERMISSION__SUBTYPES.AUTHORIZED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('notifications', Permission.AUTHORIZED);

    case PermissionActions.PERMISSION__CHECK_NOTIFICATIONS_PERMISSION__SUBTYPES.DENIED:
    case PermissionActions.PERMISSION__REQUEST_NOTIFICATIONS_PERMISSION__SUBTYPES.DENIED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('notifications', Permission.DENIED)
        .set('permissionErrors', Map({
          ...state.get('permissionErrors').toJS(),
          notifications: Permission.NOTIFICATIONS_DENIED_MESSAGE,
        }));

    /*
    |---------------------------------------------------------------------------
    | Photo permission handlers
    |---------------------------------------------------------------------------
    */

    case PermissionActions.PERMISSION__CHECK_PHOTO_PERMISSION__SUBTYPES.UNDEFINED:
    case PermissionActions.PERMISSION__REQUEST_PHOTO_PERMISSION__SUBTYPES.UNDEFINED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('photo', Permission.UNDEFINED);

    case PermissionActions.PERMISSION__CHECK_PHOTO_PERMISSION__SUBTYPES.AUTHORIZED:
    case PermissionActions.PERMISSION__REQUEST_PHOTO_PERMISSION__SUBTYPES.AUTHORIZED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('photo', Permission.AUTHORIZED);

    case PermissionActions.PERMISSION__CHECK_PHOTO_PERMISSION__SUBTYPES.DENIED:
    case PermissionActions.PERMISSION__REQUEST_PHOTO_PERMISSION__SUBTYPES.DENIED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('photo', Permission.DENIED)
        .set('permissionErrors', Map({
          ...state.get('permissionErrors').toJS(),
          photo: Permission.PHOTO_DENIED_MESSAGE,
        }));

    /*
    |---------------------------------------------------------------------------
    | Camera permission handlers
    |---------------------------------------------------------------------------
    */

    case PermissionActions.PERMISSION__CHECK_CAMERA_PERMISSION__SUBTYPES.UNDEFINED:
    case PermissionActions.PERMISSION__REQUEST_CAMERA_PERMISSION__SUBTYPES.UNDEFINED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('camera', Permission.UNDEFINED);

    case PermissionActions.PERMISSION__CHECK_CAMERA_PERMISSION__SUBTYPES.AUTHORIZED:
    case PermissionActions.PERMISSION__REQUEST_CAMERA_PERMISSION__SUBTYPES.AUTHORIZED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('camera', Permission.AUTHORIZED);

    case PermissionActions.PERMISSION__CHECK_CAMERA_PERMISSION__SUBTYPES.DENIED:
    case PermissionActions.PERMISSION__REQUEST_CAMERA_PERMISSION__SUBTYPES.DENIED:
      return state
        .set('requestingPermissionIsInProgress', false)
        .set('camera', Permission.DENIED)
        .set('permissionErrors', Map({
          ...state.get('permissionErrors').toJS(),
          camera: Permission.CAMERA_DENIED_MESSAGE,
        }));

    default:
      return state;
  }
}
