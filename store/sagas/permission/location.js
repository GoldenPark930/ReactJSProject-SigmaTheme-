import { put } from 'redux-saga/effects';
import RNPermissions from 'react-native-permissions';

import PermissionActions from 'src/store/constants/action-types/permission';

function mapLocationPermissionToActions(permission, SUBTYPES) {
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
          saga: 'checkLocationPermission',
          message: `unexpected permission type: "${permission}"`,
        },
      };
  }
}

export function* checkLocationPermission() {
  try {
    // Check location permission
    const permission = yield RNPermissions.check('location');

    // Store permission to Redux
    yield put(mapLocationPermissionToActions(
      permission,
      PermissionActions.PERMISSION__CHECK_LOCATION_PERMISSION__SUBTYPES,
    ));
  } catch (errors) {
    // Store error to the Redux
    yield put({
      type: PermissionActions.PERMISSION__CHECK_ALL__SUBTYPES.FAIL_LOCATION,
      errors,
    });
  }
}

export function* requestLocationPermission() {
  try {
    // Request location permission
    const permission = yield RNPermissions.request('location');

    // Store permission to Redux
    yield put(mapLocationPermissionToActions(
      permission,
      PermissionActions.PERMISSION__REQUEST_LOCATION_PERMISSION__SUBTYPES,
    ));
  } catch (errors) {
    // Store error to the Redux
    yield put({
      type: PermissionActions.PERMISSION__REQUEST_LOCATION_PERMISSION__SUBTYPES.FAIL,
      errors,
    });
  }
}
