import { Map } from 'immutable';

import LinkingTypes from '../constants/action-types/linking';


const initialState = Map({
  linking: Map({
    linked: false,
    routeName: '',
    subRouteName: '',
    params: '',
  }),
  errors: Map({}),
});


export default function (state = initialState, action) {
  switch (action.type) {
    case LinkingTypes.LINKING__SET_STATE:
      return state
        .set('linking', Map({
          ...action.payload,
        }));

    case LinkingTypes.LINKING__RESET_STATE:
      return initialState;

    default:
      return state;
  }
}
