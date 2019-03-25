import { PERMISSION } from '../constants/store/upper-level-keys';
import { AUTHORIZED } from '../constants/permission';

export const selectRequestingPermissionProcessStatus = state =>
  state[PERMISSION].get('requestingPermissionIsInProgress');

export const selectPermissionErrors = state =>
  state[PERMISSION].get('permissionErrors').toJS();

export const selectContactsPermissionStatus = state =>
  state[PERMISSION].get('contacts') === AUTHORIZED;

export const selectLocationPermissionStatus = state =>
  state[PERMISSION].get('location') === AUTHORIZED;

export const selectNotificationsPermissionStatus = state =>
  state[PERMISSION].get('notifications') === AUTHORIZED;

export const selectPhotoPermissionStatus = state =>
  state[PERMISSION].get('photo') === AUTHORIZED;

export const selectCameraPermissionStatus = state =>
  state[PERMISSION].get('camera') === AUTHORIZED;
