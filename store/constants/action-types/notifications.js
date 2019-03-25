/**
 |------------------------------------------------------------------------------
 | For more details read ./#_README.txt in current directory
 |------------------------------------------------------------------------------
 */

export default {
  /*
  |-----------------------------------------------------------------------------
  | Redux actions types
  |-----------------------------------------------------------------------------
  */

  NOTIFICATIONS__CLEAR_LIST: 'Notifications.clearList',

  PUSH_NOTIFICATIONS__RECEIVED: 'PushNotification.received',

  /*
  |-----------------------------------------------------------------------------
  | Redux-saga API call actions subtypes
  |-----------------------------------------------------------------------------
  */

  NOTIFICATIONS__ONESIGNAL_IDS__SUBTYPES: {
    START: 'Notifications.onesignalIds:start',
    SUCCESS: 'Notifications.onesignalIds:success',
    FAIL: 'Notifications.onesignalIds:fail',
  },

  NOTIFICATIONS__FETCH_ALL__SUBTYPES: {
    START: 'Notifications.fetchAll:start',
    SUCCESS: 'Notifications.fetchAll:success',
    FAIL: 'Notifications.fetchAll:fail',
  },

  NOTIFICATIONS__FETCH_MORE__SUBTYPES: {
    START: 'Notifications.fetchMore:start',
    SUCCESS: 'Notifications.fetchMore:success',
    FAIL: 'Notifications.fetchMore:fail',
  },

  NOTIFICATIONS__GET_COUNT__SUBTYPES: {
    START: 'Notifications.getCount:start',
    SUCCESS: 'Notifications.getCount:success',
    FAIL: 'Notifications.getCount:fail',
  },

  NOTIFICATIONS__UPDATE_STATUS_AS_READ__SUBTYPES: {
    START: 'Notifications.updateStatusAsRead:start',
    SUCCESS: 'Notifications.updateStatusAsRead:success',
    FAIL: 'Notifications.updateStatusAsRead:fail',
  },
};
