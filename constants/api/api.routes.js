module.exports = {
  // GrinkUser routes
  user: '/GrinkUsers',
  userSignup: '/GrinkUsers/signup',
  userLogin: '/GrinkUsers/login',
  userLogout: '/GrinkUsers/logout',
  userProfileInfo: '/GrinkUsers/me',
  userInfo: '/GrinkUsers/{userId}',
  userIfExist: '/GrinkUsers/getByContactInfo',
  userIfEmail: '/GrinkUsers/doesEmailExist',
  userIfUsername: '/GrinkUsers/doesUsernameExist',
  userIfPhone: '/GrinkUsers/doesPhoneExist',
  userVerifyPhone: '/GrinkUsers/verify-phone',
  // Group routes
  group: '/Groups',
  groupBulkInvite: '/Groups/{groupId}/bulkInvite',
  groupMessages: '/Groups/{groupId}/messages',
  groupImage: '/Groups/image',
  // UserGroup routes
  userGroupBulk: '/UserGroups/bulk',
  userGroup: '/UserGroups',
  // Notification routes
  notification: '/Notifications',
  notificationCount: '/Notifications/count',
  // Phone verification
  phoneVerificationsCreate: '/PhoneVerifications/create',
  phoneVerificationsVerify: '/PhoneVerifications/verify',
  phoneVerificationsAuth: '/PhoneVerifications/auth',
};
