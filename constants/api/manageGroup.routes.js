module.exports = {
  // Group routes
  groupMembers: '/Groups/{groupId}/members',
  groupCharges: '/Groups/{groupId}/charges',
  groupName: '/UserGroups/{groupId}',
  // ChargeRequest routes
  chargeRequest: '/ChargeRequests',
  chargeRequestAllSummary: '/ChargeRequests/summary',
  chargeRequestSummary: '/ChargeRequests/{chargeRequestId}/summary',
  chargeRequestUpdate: '/ChargeRequests/{chargeRequestId}/Charges',
  // Charge routes
  charge: '/Charges',
  chargeAccept: '/Charges/{chargeId}/accept',
  chargeDecline: '/Charges/{chargeId}/decline',
  chargeDelete: '/Charges/{chargeId}',
  chargeEdit: '/Charges/{chargeId}',
};
