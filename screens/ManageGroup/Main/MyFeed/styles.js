import { StyleSheet } from 'react-native';
import * as Colors from '../../../../constants/colors';

import { SCREEN_HEIGHT } from '../../../../constants/dimensions';

export default StyleSheet.create({
  mainContainer: {
    height: SCREEN_HEIGHT - 119, // the height of header + tab bar
    backgroundColor: Colors.WHITE,
    marginTop: 7.5,
  },
});
