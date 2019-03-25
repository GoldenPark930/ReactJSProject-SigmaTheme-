import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT } from 'src/constants/dimensions';

export default StyleSheet.create({
  mainContainer: {
    height: SCREEN_HEIGHT - 119, // the height of header + tab bar
  },
});
