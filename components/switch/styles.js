import { StyleSheet } from 'react-native';

import * as Colors from 'src/constants/colors';

export const DefaultColors = {
  backgroundActive: Colors.DARK_CALM,
  backgroundInactive: Colors.VERY_LIGHT_GREY,
  circleActiveColor: Colors.CALM,
  circleInactiveColor: Colors.LIGHT_GREY,
};

export default StyleSheet.create({
  container: {
    width: 71,
    height: 30,
    borderRadius: 30,
    backgroundColor: Colors.BLACK,
  },

  animatedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 78,
  },

  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.GREY,
  },

  text: {
    color: Colors.WHITE,
    backgroundColor: Colors.TRANSPARENT,
  },

  paddingRight: {
    paddingRight: 5,
  },

  paddingLeft: {
    paddingLeft: 5,
  },

  empty: {},
});
