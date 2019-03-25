import { StyleSheet } from 'react-native';

import { WHITE, ROYAL } from '../../../constants/colors';
import { BOLD } from '../../../constants/fonts/weight-map';

export default StyleSheet.create({
  globalWrapper: {
    flex: 1,
    backgroundColor: WHITE,
  },

  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  unregisteredSeparator: {
    margin: 10,
    color: ROYAL,
    fontWeight: BOLD,
  },
});
