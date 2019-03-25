import { StyleSheet } from 'react-native';

import { OVERLAY } from 'src/constants/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'src/constants/dimensions';

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: OVERLAY,
  },
});
