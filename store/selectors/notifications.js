import { createSelector } from 'reselect';

import ApiRoutes from 'src/constants/api';
import { NOTIFICATIONS } from '../constants/store/upper-level-keys';
import { getRandomImage } from '../constants/hardcoded-data/helpers';

const { ImageRoutes: { userProfileImage } } = ApiRoutes;
const randomImage = getRandomImage();

export const selectNotificationsFetchingProcessStatus = state =>
  state[NOTIFICATIONS].get('fetchingIsInProgress');

export const selectNotificationsFetchingMoreProcessStatus = state =>
  state[NOTIFICATIONS].get('fetchingMoreIsInProgress');

export const selectNotificationsPullToRefreshProcessStatus = state =>
  state[NOTIFICATIONS].get('pullToRefreshIsInProgress');

export const selectInfiniteScrollStatues = state =>
  state[NOTIFICATIONS].get('infiniteScrollIsAvailable');

export const selectUpdatingStatusIsInProgress = state =>
  state[NOTIFICATIONS].get('updatingStatusIsInProgress');

export const selectAllNotifications = createSelector(
  state => state[NOTIFICATIONS].get('data').toJS(),
  notifications => notifications
    .map(notification => ({
      id: notification.id,
      read: notification.read,
      message: notification.notification,
      deliveryType: notification.deliveryType,
      notificationType: notification.notificationType,
      status: notification.status,
      destinationImage:
        notification.destination
        && notification.destination.user
        && notification.destination.user.image
          ? userProfileImage(notification.destination.user.image)
          : randomImage,
      createdAt: notification.creationDate || '',
    })),
);

export const selectNotificationsCount = state =>
  state[NOTIFICATIONS].get('count');
