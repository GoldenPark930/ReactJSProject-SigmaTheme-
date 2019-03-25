import { StyleSheet } from 'react-native';

import { verticalScale } from 'src/utils/helpers';
import { ROYAL } from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/dimensions';

export default StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH,
    height: verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    marginVertical: verticalScale(2),
    fontSize: 12,
    color: ROYAL,
  },

  balance: {
    marginVertical: verticalScale(2),
    fontSize: 22,
    color: ROYAL,
  },
});
