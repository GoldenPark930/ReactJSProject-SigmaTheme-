import { StyleSheet } from 'react-native';

import { LIGHT_GREY } from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/dimensions';

export default StyleSheet.create({
  separator: {
    width: SCREEN_WIDTH,
    height: 1,
    backgroundColor: LIGHT_GREY,
  },
});
