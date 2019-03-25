import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';

import globalColors from '../../GlobalCss/globalColors';
import NavigationService from '../../utils/helpers/navigation-service';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

const LeaveGroup = props => (
  <Button onPress={() => NavigationService.navigateWithDebounce('GroupSettings')}>
    <Text style={[global(globalColors.white), { fontWeight: 'bold' }]}>Go to Settings</Text>
  </Button>
);

export default LeaveGroup;
