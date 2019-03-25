import { takeEvery, call, put } from 'redux-saga/effects';
import isFunction from 'lodash/isFunction';

import CommonActions from '../constants/action-types/common';
import handleHttpErrors from './http-error-handler';

/*
|-------------------------------------------------------------------------------
| Handle all API requests
|-------------------------------------------------------------------------------
*/

function* handleApiCall(action) {
  // TODO {Maksym}: re-work onSuccessCallback
  const { promise, onSuccessCallback, onFailCallback, placeholderData, additionalData } = action;
  const { START, SUCCESS, FAIL } = action.subtypes;

  // TODO {Maksym}: add action object validation

  const startAction = {
    type: START,
  };

  if (additionalData) startAction.additionalData = additionalData;

  // Notify application that API call was STARTed
  yield put(startAction);

  try {
    // Resolve API promise
    const response = yield call(promise);

    // Parse server response data
    const result = yield response.data;

    // Store hardcoded data if any or request response to the Redux
    yield put({
      type: SUCCESS,
      payload: placeholderData || result,
    });

    // Call onSuccessCallback callback if it was passed
    if (onSuccessCallback && isFunction(onSuccessCallback)) {
      yield call(onSuccessCallback);
    }
  } catch (errors) {
    // Call onSuccessCallback callback if it was passed
    if (onFailCallback && isFunction(onFailCallback)) {
      yield call(onFailCallback);
    }

    // Store request error to the Redux
    yield put({ type: FAIL, errors });

    // handle http errors
    yield call(handleHttpErrors, errors);
  }
}

/*
|-------------------------------------------------------------------------------
| Export sagas
|-------------------------------------------------------------------------------
*/

export default function* () {
  yield takeEvery(CommonActions.COMMON__API_CALL, handleApiCall);
}
