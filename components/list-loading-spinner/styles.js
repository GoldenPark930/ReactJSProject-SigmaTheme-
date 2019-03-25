import { StyleSheet } from 'react-native';

import { verticalScale } from 'src/utils/helpers';
import { SCREEN_WIDTH } from 'src/constants/dimensions';
import { CALM } from 'src/constants/colors';

export const COLOR_CALM = CALM;

export default StyleSheet.create({
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: verticalScale(50),
  },
});
