/**
 |------------------------------------------------------------------------------
 | For more details read ./#_README.txt in current directory
 |------------------------------------------------------------------------------
 */

export default {
  /*
  |-----------------------------------------------------------------------------
  | All permission type / subtypes
  |-----------------------------------------------------------------------------
  */

  PERMISSION__CHECK_ALL__SUBTYPES: {
    START: 'Permission.checkAll:start',
    FAIL_CONTACTS: 'Permission.checkAll:fail..contacts',
    FAIL_LOCATION: 'Permission.checkAll:fail..location',
    FAIL_NOTIFICATIONS: 'Permission.checkAll:fail..notifications',
    FAIL_PHOTO: 'Permission.checkAll:fail..photo',
    FAIL_CAMERA: 'Permission.checkAll:fail..camera',
  },

  PERMISSION__REQUEST_PERMISSION__FAIL: 'Permission.requestPermission:fail',
  PERMISSION__REQUEST_UNHANDLED_PERMISSION: 'Permission.requestUnhandledPermission',

  /*
  |-----------------------------------------------------------------------------
  | Contacts permission type / subtypes
  |-----------------------------------------------------------------------------
  */

  PERMISSION__CHECK_CONTACTS_PERMISSION__SUBTYPES: {
    FAIL: 'Permission.checkContactsPermission:fail',
    DENIED: 'Permission.checkContactsPermission:denied',
    UNDEFINED: 'Permission.checkContactsPermission:undefined',
    AUTHORIZED: 'Permission.checkContactsPermission:authorized',
  },

  PERMISSION__REQUEST_CONTACTS_PERMISSION__START: 'Permission.requestContactsPermission:start',
  PERMISSION__REQUEST_CONTACTS_PERMISSION__SUBTYPES: {
    FAIL: 'Permission.requestContactsPermission:fail',
    DENIED: 'Permission.requestContactsPermission:denied',
    UNDEFINED: 'Permission.requestContactsPermission:undefined',
    AUTHORIZED: 'Permission.requestContactsPermission:authorized',
  },

  /*
  |-----------------------------------------------------------------------------
  | Location permission type / subtypes
  |-----------------------------------------------------------------------------
  */

  PERMISSION__CHECK_LOCATION_PERMISSION__SUBTYPES: {
    FAIL: 'Permission.checkLocationPermission:fail',
    DENIED: 'Permission.checkLocationPermission:denied',
    UNDEFINED: 'Permission.checkLocationPermission:undefined',
    AUTHORIZED: 'Permission.checkLocationPermission:authorized',
  },

  PERMISSION__REQUEST_LOCATION_PERMISSION__START: 'Permission.requestLocationPermission:start',
  PERMISSION__REQUEST_LOCATION_PERMISSION__SUBTYPES: {
    FAIL: 'Permission.requestLocationPermission:fail',
    DENIED: 'Permission.requestLocationPermission:denied',
    UNDEFINED: 'Permission.requestLocationPermission:undefined',
    AUTHORIZED: 'Permission.requestLocationPermission:authorized',
  },

  /*
  |-----------------------------------------------------------------------------
  | Notifications permission type / subtypes
  |-----------------------------------------------------------------------------
  */

  PERMISSION__CHECK_NOTIFICATIONS_PERMISSION__SUBTYPES: {
    FAIL: 'Permission.checkNotificationsPermission:fail',
    DENIED: 'Permission.checkNotificationsPermission:denied',
    UNDEFINED: 'Permission.checkNotificationsPermission:undefined',
    AUTHORIZED: 'Permission.checkNotificationsPermission:authorized',
  },

  PERMISSION__REQUEST_NOTIFICATIONS_PERMISSION__START: 'Permission.requestNotificationsPermission:start',
  PERMISSION__REQUEST_NOTIFICATIONS_PERMISSION__SUBTYPES: {
    FAIL: 'Permission.requestNotificationsPermission:fail',
    DENIED: 'Permission.requestNotificationsPermission:denied',
    UNDEFINED: 'Permission.requestNotificationsPermission:undefined',
    AUTHORIZED: 'Permission.requestNotificationsPermission:authorized',
  },

  /*
  |-----------------------------------------------------------------------------
  | Photo permission type / subtypes
  |-----------------------------------------------------------------------------
  */

  PERMISSION__CHECK_PHOTO_PERMISSION__SUBTYPES: {
    FAIL: 'Permission.checkPhotoPermission:fail',
    DENIED: 'Permission.checkPhotoPermission:denied',
    UNDEFINED: 'Permission.checkPhotoPermission:undefined',
    AUTHORIZED: 'Permission.checkPhotoPermission:authorized',
  },

  PERMISSION__REQUEST_PHOTO_PERMISSION__START: 'Permission.requestPhotoPermission:start',
  PERMISSION__REQUEST_PHOTO_PERMISSION__SUBTYPES: {
    FAIL: 'Permission.requestPhotoPermission:fail',
    DENIED: 'Permission.requestPhotoPermission:denied',
    UNDEFINED: 'Permission.requestPhotoPermission:undefined',
    AUTHORIZED: 'Permission.requestPhotoPermission:authorized',
  },

  /*
  |-----------------------------------------------------------------------------
  | Camera permission type / subtypes
  |-----------------------------------------------------------------------------
  */

  PERMISSION__CHECK_CAMERA_PERMISSION__SUBTYPES: {
    FAIL: 'Permission.checkCameraPermission:fail',
    DENIED: 'Permission.checkCameraPermission:denied',
    UNDEFINED: 'Permission.checkCameraPermission:undefined',
    AUTHORIZED: 'Permission.checkCameraPermission:authorized',
  },

  PERMISSION__REQUEST_CAMERA_PERMISSION__START: 'Permission.requestCameraPermission:start',
  PERMISSION__REQUEST_CAMERA_PERMISSION__SUBTYPES: {
    FAIL: 'Permission.requestCameraPermission:fail',
    DENIED: 'Permission.requestCameraPermission:denied',
    UNDEFINED: 'Permission.requestCameraPermission:undefined',
    AUTHORIZED: 'Permission.requestCameraPermission:authorized',
  },
};
