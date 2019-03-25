import { StyleSheet } from 'react-native';

import * as Colors from 'src/constants/colors';
import { SEMI_BOLD } from 'src/constants/fonts/weight-map';

export default StyleSheet.create({
  flexOne: {
    flex: 1,
  },

  wrapper: {
    backgroundColor: Colors.WHITE,
    borderBottomColor: Colors.LIGHT_GREY,
    borderBottomWidth: 2,
  },

  content: {
    flex: 3,
    alignItems: 'center',
  },

  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 13,
  },

  backButton: {
    fontSize: 25,
    color: Colors.ROYAL,
  },

  text: {
    color: Colors.ROYAL,
    fontSize: 18,
  },

  semibold: {
    fontWeight: SEMI_BOLD,
  },

  colorRoyal: {
    color: Colors.ROYAL,
  },

  colorCalm: {
    color: Colors.CALM,
  },
});
