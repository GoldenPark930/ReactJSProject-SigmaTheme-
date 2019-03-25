import { StyleSheet } from 'react-native';

import { SEMI_BOLD } from 'src/constants/fonts/weight-map';
import * as Colors from 'src/constants/colors';

export default StyleSheet.create({
  wrapper: {
    width: '100%',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 58,
  },

  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.LIGHT_GREY,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    marginHorizontal: 12.5,
  },

  icon: {
    fontSize: 20,
    color: Colors.CALM,
  },

  label: {
    fontSize: 12,
    fontWeight: SEMI_BOLD,
    color: Colors.ROYAL,
  },

  toggleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
