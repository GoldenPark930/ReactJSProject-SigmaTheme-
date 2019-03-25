import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';

import globalColors from '../../GlobalCss/globalColors';
import NavigationService from '../../utils/helpers/navigation-service';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

const GroupSettingsManageFriends = props => (
  <Button onPress={() => NavigationService.navigateWithDebounce('LeaveGroup')}>
    <Text style={[global(globalColors.white), { fontWeight: 'bold' }]}>
      Go to Leave Group
    </Text>
  </Button>
);

export default GroupSettingsManageFriends;
