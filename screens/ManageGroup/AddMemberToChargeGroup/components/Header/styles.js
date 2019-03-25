import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

import {
  CALM,
  GREY,
  WHITE,
} from '../../../../../constants/colors';
import { SEMIBOLD } from '../../../../../constants/fonts';
import isIphoneX from '../../../../../utils/helpers/is-iphone-x';

const { width, height } = Dimensions.get('window');
const isSmall = height <= 600 || width <= 320;

const isX = isIphoneX();

const headerHeight = Platform.OS === 'ios' ? 104 : 96;
const iosPadding = isX ? 39 : 15;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  headerContainer: {
    justifyContent: 'flex-end',
    height: isSmall ? headerHeight - 20 : headerHeight,
    paddingTop: Platform.OS === 'ios' ? iosPadding : 0,
    paddingRight: 40,
    paddingLeft: 10,
    paddingBottom: 10,
    backgroundColor: CALM,
    shadowColor: GREY,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  headerRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerMiddleContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBackButtonContainer: {
    width: 40,
  },
  headerTitleText: {
    paddingRight: 3,
    fontFamily: SEMIBOLD,
    fontSize: 20,
    color: WHITE,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: WHITE,
  },
});

