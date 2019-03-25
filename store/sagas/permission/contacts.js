import { put } from 'redux-saga/effects';
import Permissions from 'react-native-permissions';

import PermissionActions from '../../../store/constants/action-types/permission';

const Contacts = require('react-native-contacts');

function checkContactsPermissionPromise() {
  return new Promise((resolve, reject) => {
    Contacts.checkPermission((error, permission) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(permission);
    });
  });
}

function requestContactsPermissionPromise() {
  return new Promise((resolve, reject) => {
    Contacts.requestPermission((error, permission) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(permission);
    });
  });
}

function mapContactsPermissionToActions(permission, SUBTYPES) {
  switch (permission) {
    // Return UNDEFINED permission Redux action
    case 'undetermined':
      return { type: SUBTYPES.UNDEFINED };

    // Return AUTHORIZED permission Redux action
    case 'authorized':
      return { type: SUBTYPES.AUTHORIZED };

    // Return DENIED permission Redux action
    case 'restricted':
    case 'denied':
      return { type: SUBTYPES.DENIED };

    default:
      // Return unexpected permission type Redux actions with a custom error
      return {
        type: SUBTYPES.FAIL,
        errors: {
          file: 'sagas/permission.js',
          saga: 'checkContactsPermission',
          message: `unexpected permission type: "${permission}"`,
        },
      };
  }
}

export function* checkContactsPermission() {
  try {
    // Check permission for retrieving contacts list
    const permission = yield Permissions.check('contacts');

    // Store permission to Redux
    yield put(mapContactsPermissionToActions(
      permission,
      PermissionActions.PERMISSION__CHECK_CONTACTS_PERMISSION__SUBTYPES,
    ));
  } catch (errors) {
    // Store error to the Redux
    yield put({
      type: PermissionActions.PERMISSION__CHECK_ALL__SUBTYPES.FAIL_CONTACTS,
      errors,
    });
  }
}

export function* requestContactsPermission() {
  try {
    // Request permission for retrieving contacts list
    const permission = yield Permissions.request('contacts');
    // Store permission to Redux
    yield put(mapContactsPermissionToActions(
      permission,
      PermissionActions.PERMISSION__REQUEST_CONTACTS_PERMISSION__SUBTYPES,
    ));
  } catch (errors) {
    // Store error to the Redux
    yield put({
      type: PermissionActions.PERMISSION__REQUEST_CONTACTS_PERMISSION__SUBTYPES.FAIL,
      errors,
    });
  }
}
