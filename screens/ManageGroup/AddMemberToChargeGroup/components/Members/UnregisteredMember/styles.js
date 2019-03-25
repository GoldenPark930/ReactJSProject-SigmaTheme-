import { StyleSheet } from 'react-native';

import * as Colors from '../../../../../../constants/colors';
import { elementWidth, elementHeight, margin } from '../constants';

export const GradientColors = ['transparent', 'rgba(0,0,0,0.2)'];

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // 20pt was added for charge amount under the thumbnail but since you can't
    // select unregistered user there is no reason to have bigger block for them
    height: elementHeight - 20,
    width: elementWidth,
    margin,
    zIndex: 1,
  },
  thumbnail: {
    borderColor: Colors.WHITE,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 0,
  },
  iconBackground: {
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    bottom: 2,
    right: 6,
    height: 8,
    width: 3,
  },
  icon: {
    color: Colors.RED,
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
  unregistered: {
    opacity: 0.5,
  },
});
