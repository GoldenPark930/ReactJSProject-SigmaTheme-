import { StyleSheet } from 'react-native';

import { ROYAL } from 'src/constants/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'src/constants/dimensions';
import { REGULAR } from '../../constants/fonts';
import { TRANSPARENT } from '../../constants/colors';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: TRANSPARENT,
  },
  symbol: {
    color: ROYAL,
    fontSize: 18,
    textAlign: 'right',
    alignItems: 'flex-start',
    fontFamily: REGULAR,
    fontWeight: '700',
  },
  number: {
    color: ROYAL,
    fontSize: 32,
    alignItems: 'center',
    fontFamily: REGULAR,
    fontWeight: '700',
  },
  decimal: {
    alignItems: 'flex-end',
    color: ROYAL,
    fontSize: 18,
    textAlign: 'left',
    fontFamily: REGULAR,
    fontWeight: '700',
  },
  spacer: {
    flex: 1,
  },
});
