import { StackNavigator } from 'react-navigation';

import { StackNavigatorStyles } from '../../constants/app/defaults';
import MySettings from './MySettings';
import Logout from './Logout';

export default StackNavigator(
  {
    MySettings: { screen: MySettings },
    Logout: {
      screen: Logout,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    cardStyle: StackNavigatorStyles.cardStyle,
  },
);

// TODO {Maksym}: navigation refactoring
