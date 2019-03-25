import { Map } from 'immutable';

import IntervalTypes from '../constants/action-types/interval';


const initialState = Map({
  intervalStatus: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case IntervalTypes.INTERVAL__REQUEST_DATA_LOADING:
      return state
        .set('intervalStatus', true);

    case IntervalTypes.INTERVAL__RESET_DATA_LOADING:
      return state
        .set('intervalStatus', false);

    default:
      return state;
  }
}
