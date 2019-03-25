import { StyleSheet } from 'react-native';

import { WHITE, TRANSPARENT } from 'src/constants/colors';
import isIPhoneX from '../../utils/helpers/is-iphone-x';

const isIphoneX = isIPhoneX();

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 75,
    paddingTop: isIphoneX ? 35 : 15,
    backgroundColor: WHITE,
  },

  sides: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    bottom: 0,
    backgroundColor: TRANSPARENT,
  },

  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  empty: {},
});
