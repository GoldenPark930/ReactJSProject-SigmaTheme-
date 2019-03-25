import { put, take } from 'redux-saga/effects';

import NotificationsActionTypes from '../constants/action-types/notifications';
import { BALANCE_UPDATED } from '../../constants/pushNotificationsTypes';
import { updateUserBalance } from '../actions/user';

export default function* pushNotificationsFlow() {
  while (true) {
    const { notificationType, data } = yield take(NotificationsActionTypes.PUSH_NOTIFICATIONS__RECEIVED);

    switch (notificationType) {
      case BALANCE_UPDATED:
        // console.log('Notification received: ', notificationType, '\n data: ', data);
        // yield put(updateUserBalance(data.balance.present));
        break;

      default:
        // console.log('RECEIVED ', 'DEFAULT');
    }
  }
}
