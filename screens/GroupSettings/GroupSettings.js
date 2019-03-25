import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';

import globalColors from '../../GlobalCss/globalColors';
import NavigationService from '../../utils/helpers/navigation-service';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

const GroupSettings = props => (
  <Button onPress={() => NavigationService.navigateWithDebounce('GroupSettingsManageFriends')}>
    <Text style={[global(globalColors.white), { fontWeight: 'bold' }]}>
      Go to Manage Friends
    </Text>
  </Button>
);

export default GroupSettings;
