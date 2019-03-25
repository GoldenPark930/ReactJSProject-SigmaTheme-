import { StyleSheet } from 'react-native';

import { ROYAL, CALM } from '../../../../../constants/colors';
import { EXTRA_LIGHT } from '../../../../../constants/fonts/weight-map';

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    width: '100%',
    height: 35,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 15,
  },

  text: {
    fontSize: 12,
    color: ROYAL,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
  },

  arrow: {
    marginHorizontal: 15,
    fontWeight: EXTRA_LIGHT,
    fontSize: 15,
    color: CALM,
  },
});
