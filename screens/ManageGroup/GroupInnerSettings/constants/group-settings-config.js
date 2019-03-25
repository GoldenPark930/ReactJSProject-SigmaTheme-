import * as UserRoles from '../../../../constants/users/roles';

export default [
  {
    label: 'Change Club Name',
    screen: 'GroupInnerSettingsChangeGroupName',
    visibleTo: [
      UserRoles.OWNER,
      UserRoles.ADMIN,
    ],
  },
  {
    label: 'Change Club Owner',
    screen: 'GroupInnerSettingsTransferGroupOwnership',
    visibleTo: [
      UserRoles.OWNER,
    ],
  },
];
