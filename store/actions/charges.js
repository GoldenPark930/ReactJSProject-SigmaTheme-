import * as ChargesApi from '../../utils/ajax/api/charges';
import CommonActions from '../constants/action-types/common';
import ChargesActions from '../constants/action-types/charges';

export const acceptCharge = (chargeId, params, onSuccessCallback) => ({
  type: CommonActions.COMMON__API_CALL,
  subtypes: ChargesActions.CHARGES__ACCEPT_CHARGE,
  promise: () => ChargesApi.acceptCharge(chargeId, params),
  additionalData: { chargeId },
  onSuccessCallback,
});
