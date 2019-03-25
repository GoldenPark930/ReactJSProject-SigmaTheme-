import { StyleSheet } from 'react-native';

import * as Colors from '../../../../../../constants/colors';
import { elementWidth, elementHeight, margin } from '../constants';

export const GradientColors = ['transparent', 'rgba(0,0,0,0.2)'];

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: elementHeight,
    width: elementWidth,
    margin,
    zIndex: 1,
    paddingTop: 10,
  },
  thumbnail: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  selected: {
    borderColor: Colors.CALM,
    borderWidth: 2,
  },
  iconBackground: {
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    bottom: -2,
    right: 0,
    height: 15,
    width: 15,
    borderRadius: 7.5,
  },
  icon: {
    color: Colors.CALM,
    backgroundColor: Colors.TRANSPARENT,
    fontSize: 20,
    position: 'absolute',
    bottom: -2,
    right: 0,
  },
  name: {
    color: Colors.ROYAL,
    fontSize: 11,
    marginTop: 5,
  },
  amount: {
    color: Colors.CALM,
    fontSize: 11,
    marginTop: 5,
  },
});
