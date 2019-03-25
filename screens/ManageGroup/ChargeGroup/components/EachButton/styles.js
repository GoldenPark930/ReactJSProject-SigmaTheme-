import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import {
  BLACK,
  WHITE,
  CALM,
} from '../../../../../constants/colors';
import { REGULAR } from '../../../../../constants/fonts';

const { width, height } = Dimensions.get('window');
const isSmall = height <= 600 || width <= 320;

const eachTotalButtonText = 20;

export default StyleSheet.create({
  eachTotalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 2,
    borderWidth: 2,
    borderRadius: 21,
    borderColor: CALM,
  },
  eachTotalButtonCheckContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    borderWidth: 0,
    borderRadius: 18,
  },
  eachTotalButtonText: {
    fontFamily: REGULAR,
    fontSize: isSmall ? eachTotalButtonText - 2 : eachTotalButtonText,
    color: BLACK,
  },
  checkContainer: {
    backgroundColor: CALM,
    width: 95,
  },
  uncheckContainer: {
    width: 95,
  },
  checkText: {
    color: WHITE,
  },
  uncheckText: {
    color: CALM,
  },

});

