import { StyleSheet } from 'react-native';

import { ROYAL, CALM } from '../../../../../../constants/colors';
import { BOLD } from '../../../../../../constants/fonts/weight-map';

export default StyleSheet.create({
  container: {
  },

  textLine: {
    flexDirection: 'row',
  },

  description: {
    fontSize: 9,
    color: ROYAL,
    lineHeight: 15,
  },

  link: {
    fontSize: 9,
    fontWeight: BOLD,
    color: CALM,
    lineHeight: 15,
  },
});
