import {
  put,
  take,
  select,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

import IntervalTypes from '../constants/action-types/interval';
import { getUserData } from '../actions/user';

export default function* handleInterval() {
  while (true) {
    yield take(IntervalTypes.INTERVAL__REQUEST_DATA_LOADING);
    while (true) {
      const state = yield select();
      if (!state.interval.get('intervalStatus')) break;
      yield put(getUserData());
      yield delay(60000);
    }
  }
}
