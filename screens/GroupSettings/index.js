import { StackNavigator } from 'react-navigation';

import { StackNavigatorStyles } from '../../constants/app/defaults';
import GroupSettings from './GroupSettings';
import GroupSettingsManageFriends from './GroupSettingsManageFriends';
import LeaveGroup from './LeaveGroup';

export default StackNavigator(
  {
    GroupSettings: { screen: GroupSettings },
    GroupSettingsManageFriends: { screen: GroupSettingsManageFriends },
    LeaveGroup: { screen: LeaveGroup },
  },
  {
    cardStyle: StackNavigatorStyles.cardStyle,
  },
);

// TODO {Maksym}: navigation refactoring
