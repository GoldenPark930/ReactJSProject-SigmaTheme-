import { Map } from 'immutable';

import ChargesActions from '../constants/action-types/charges';


const initialState = Map({
  acceptChargesIsInProgress: false,
  acceptedCharge: -1,

  errors: Map({}),
});


export default function (state = initialState, action) {
  switch (action.type) {
    case ChargesActions.CHARGES__ACCEPT_CHARGE.START:
      return state
        .set('acceptChargesIsInProgress', true)
        .set('acceptedCharge', action.additionalData.chargeId);

    case ChargesActions.CHARGES__ACCEPT_CHARGE.SUCCESS:
      return state
        .set('acceptChargesIsInProgress', false)
        .set('acceptedCharge', -1);

    case ChargesActions.CHARGES__ACCEPT_CHARGE.FAIL:
      return state
        .set('acceptChargesIsInProgress', false)
        .set('acceptedCharge', -1)
        .set('errors', Map(action.errors));

    default:
      return state;
  }
}
