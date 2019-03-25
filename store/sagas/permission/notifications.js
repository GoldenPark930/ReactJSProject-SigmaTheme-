import { put } from 'redux-saga/effects';
import { AsyncStorage, PushNotificationIOS } from 'react-native';

import { PERSISTENT_PREFIX } from 'src/constants/app/defaults';
import PermissionActions from 'src/store/constants/action-types/permission';

const AsyncStorageNotificationsPermissionData = {
  key: `${PERSISTENT_PREFIX}notificationPermissionWasRequested`,
  value: 'true', // AsyncStorage requires value to be a string
};

function checkNotificationsPermissionPromise() {
  return new Promise((resolve) => {
    PushNotificationIOS.checkPermissions((permission) => {
      resolve(permission);
    });
  });
}

function mapNotificationsPermissionToActions(permission, wasAsked, SUBTYPES) {
  switch (true) {
    // Was never requested and not authorized.
    // Return UNDEFINED permission Redux Return.
    case wasAsked !== AsyncStorageNotificationsPermissionData.value && !permission:
      return { type: SUBTYPES.UNDEFINED };

    // Was requested before and not authorized.
    // Return DENIED permission Redux action.
    case wasAsked === AsyncStorageNotificationsPermissionData.value && !permission:
      return { type: SUBTYPES.DENIED };

    // Return AUTHORIZED permission Redux action
    case permission:
      return { type: SUBTYPES.AUTHORIZED };

    default:
      // Return unexpected permission type Redux actions with a custom error
      return {
        type: SUBTYPES.FAIL,
        errors: {
          file: 'sagas/permission.js',
          saga: 'checkNotificationsPermission',
          message: 'unexpected permission object',
        },
      };
  }
}

function validateNotificationsPermission(permissionObject) {
  // Permission value looks like this: { alert: 0/1, sound: 0/1, badge: 0/1 }
  // where `0` equals to `never requested`/`denied` and `1` equals to `authorized`.
  // We want all three to be equal to `1` to say that permission = `authorized`.
  return !Object.values(permissionObject).includes(0);
}

export function* checkNotificationsPermission() {
  try {
    // Check if notifications permission was ever requested
    const wasPermissionEverRequested = yield AsyncStorage.getItem(AsyncStorageNotificationsPermissionData.key);

    // Check notifications permission:
    //    true -> all three are equal to `1` (aka `authorized`)
    //    false -> one of the notifications permission equals to `0`
    const permissionObject = yield checkNotificationsPermissionPromise();

    // Validate notification permission object
    const permission = yield validateNotificationsPermission(permissionObject);

    // Store permission to Redux
    yield put(mapNotificationsPermissionToActions(
      permission,
      wasPermissionEverRequested,
      PermissionActions.PERMISSION__CHECK_NOTIFICATIONS_PERMISSION__SUBTYPES,
    ));
  } catch (errors) {
    // Store error to the Redux
    yield put({
      type: PermissionActions.PERMISSION__CHECK_ALL__SUBTYPES.FAIL_NOTIFICATIONS,
      errors,
    });
  }
}

export function* requestNotificationsPermission() {
  try {
    // Save that we requested notifications permission for future
    yield AsyncStorage.setItem(
      AsyncStorageNotificationsPermissionData.key,
      AsyncStorageNotificationsPermissionData.value,
    );

    // Request notifications permission
    const permissionObject = yield PushNotificationIOS.requestPermissions();

    // Validate notification permission object
    const permission = yield validateNotificationsPermission(permissionObject);
    // Store permission to Redux
    yield put(mapNotificationsPermissionToActions(
      permission,
      AsyncStorageNotificationsPermissionData.value,
      PermissionActions.PERMISSION__REQUEST_NOTIFICATIONS_PERMISSION__SUBTYPES,
    ));
  } catch (errors) {
    // Store error to the Redux
    yield put({
      type: PermissionActions.PERMISSION__REQUEST_NOTIFICATIONS_PERMISSION__SUBTYPES.FAIL,
      errors,
    });
  }
}
