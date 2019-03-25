import { StackNavigator } from 'react-navigation';

import { StackNavigatorStyles } from '../../constants/app/defaults';
import EnterEmail from './EnterEmail';
import ResendLink from './ResendLink';
import Update from './Update';

export default StackNavigator(
  {
    EnterEmail: { screen: EnterEmail },
    ResendLink: { screen: ResendLink },
    Update: { screen: Update },
  },
  {
    cardStyle: StackNavigatorStyles.cardStyle,
  },
);

// TODO {Maksym}: navigation refactoring
