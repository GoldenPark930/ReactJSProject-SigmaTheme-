import { StackNavigator } from 'react-navigation';

import { StackNavigatorStyles } from '../../constants/app/defaults';
import Main from './Main';
import ChargeGroup from './ChargeGroup';
import ChargeDetails from './ChargeDetails';
import GroupSettings from './GroupSettings';

export default StackNavigator(
  {
    Main: { screen: Main },
    ChargeGroup: { screen: ChargeGroup },
    ChargeDetails: { screen: ChargeDetails },
    GroupSettings: { screen: GroupSettings },
  },
  {
    cardStyle: StackNavigatorStyles.cardStyle,
    // initialRouteParams: {
    //   //TODO fix groupname variable to be actual groupname
    //   groupname: "@groupname"
    // },
  },
);
