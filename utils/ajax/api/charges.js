import ajax from '../services';

export const acceptCharge = (chargeId, params) =>
  ajax.post(`/Charges/${chargeId}/accept`, params);
