import { StyleSheet } from 'react-native';

import { CALM, WHITE, LIGHT_GREY } from 'src/constants/colors';
import { BOLD } from 'src/constants/fonts/weight-map';

export const WhiteColor = WHITE;

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '76%',
    height: 50,
    borderRadius: 6,
  },
  buttonActive: {
    backgroundColor: CALM,
  },

  buttonDisabled: {
    backgroundColor: LIGHT_GREY,
  },

  label: {
    fontSize: 18,
    fontWeight: BOLD,
    color: WHITE,
  },

  empty: {},
});
