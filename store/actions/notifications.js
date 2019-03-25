import { DEFAULT_LIMIT } from 'src/constants/app/defaults';
import * as NotificationsAPI from '../../utils/ajax/api/notifications';
import * as UserAPI from 'src/utils/ajax/api/user';
import CommonActions from '../constants/action-types/common';
import NotificationsActions from '../constants/action-types/notifications';

/**
 |------------------------------------------------------------------------------
 | For more details read ./#_README.txt in current directory
 |------------------------------------------------------------------------------
 */

/*
|-------------------------------------------------------------------------------
| Redux actions
|-------------------------------------------------------------------------------
*/

export const clearNotificationsList = () => ({
  type: NotificationsActions.NOTIFICATIONS__CLEAR_LIST,
});

/*
|-------------------------------------------------------------------------------
| Redux-saga actions
|-------------------------------------------------------------------------------
*/

export const onesignalIdReceived = (userId, playerId) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: NotificationsActions.NOTIFICATIONS__ONESIGNAL_IDS__SUBTYPES,
  promise: () => UserAPI.updateUserDataById(userId, { playerId }),
});

export const fetchAllNotifications = onSuccessCallback => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: NotificationsActions.NOTIFICATIONS__FETCH_ALL__SUBTYPES,
  promise: () => NotificationsAPI.fetchAll({
    filter: {
      limit: DEFAULT_LIMIT + 1,
      skip: 0,
      where: { deliveryType: 'PUSH' },
      order: 'creationDate DESC',
    },
  }),
  onSuccessCallback,
});

export const fetchMoreNotifications = page => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: NotificationsActions.NOTIFICATIONS__FETCH_MORE__SUBTYPES,
  promise: () => NotificationsAPI.fetchAll({
    filter: {
      limit: DEFAULT_LIMIT + 1,
      skip: DEFAULT_LIMIT * (page ? page - 1 : 0),
      where: { deliveryType: 'PUSH' },
      order: 'creationDate DESC',
    },
  }),
});

export const getNotificationsCount = () => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: NotificationsActions.NOTIFICATIONS__GET_COUNT__SUBTYPES,
  promise: () => NotificationsAPI.getCount({
    where: { deliveryType: 'PUSH', status: 'UNREAD' },
  }),
});

export const pushNotificationReceived = ({ payload: { additionalData } }) => ({
  type: NotificationsActions.PUSH_NOTIFICATIONS__RECEIVED,
  notificationType: additionalData.type,
  data: additionalData.payload,
});

export const updateNotificationStatusAsRead = () => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: NotificationsActions.NOTIFICATIONS__UPDATE_STATUS_AS_READ__SUBTYPES,
  promise: () => NotificationsAPI.updateAllNotificationsStatusAsRead(),
});
