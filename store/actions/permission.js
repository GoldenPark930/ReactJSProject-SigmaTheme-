import PermissionActions from '../constants/action-types/permission';

export const requestPermission = type => ({
  type:
  PermissionActions[`PERMISSION__REQUEST_${type.toUpperCase()}_PERMISSION__START`]
  || `${PermissionActions.PERMISSION__REQUEST_UNHANDLED_PERMISSION}:${type}`,
});

export const checkAllPermission = () => ({
  type: PermissionActions.PERMISSION__CHECK_ALL__SUBTYPES.START,
});
