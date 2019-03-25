import { StyleSheet } from 'react-native';

import { verticalScale } from '../../../../../utils/helpers';
import { ROYAL } from '../../../../../constants/colors';
import { SCREEN_WIDTH } from '../../../../../constants/dimensions';

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
