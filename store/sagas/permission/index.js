import { takeEvery } from 'redux-saga/effects';

import PermissionActions from 'src/store/constants/action-types/permission';
import { checkContactsPermission, requestContactsPermission } from './contacts';
import { checkNotificationsPermission, requestNotificationsPermission } from './notifications';
import { checkLocationPermission, requestLocationPermission } from './location';
import { checkPhotoPermission, requestPhotoPermission } from './photo';
import { checkCameraPermission, requestCameraPermission } from './camera';

function* checkAllPermission() {
  yield checkContactsPermission();
  yield checkLocationPermission();
  yield checkNotificationsPermission();
  yield checkPhotoPermission();
  yield checkCameraPermission();
}

export default function* () {
  yield takeEvery(
    PermissionActions.PERMISSION__CHECK_ALL__SUBTYPES.START,
    checkAllPermission,
  );

  yield takeEvery(
    PermissionActions.PERMISSION__REQUEST_CONTACTS_PERMISSION__START,
    requestContactsPermission,
  );

  yield takeEvery(
    PermissionActions.PERMISSION__REQUEST_LOCATION_PERMISSION__START,
    requestLocationPermission,
  );

  yield takeEvery(
    PermissionActions.PERMISSION__REQUEST_NOTIFICATIONS_PERMISSION__START,
    requestNotificationsPermission,
  );

  yield takeEvery(
    PermissionActions.PERMISSION__REQUEST_PHOTO_PERMISSION__START,
    requestPhotoPermission,
  );

  yield takeEvery(
    PermissionActions.PERMISSION__REQUEST_CAMERA_PERMISSION__START,
    requestCameraPermission,
  );
}
