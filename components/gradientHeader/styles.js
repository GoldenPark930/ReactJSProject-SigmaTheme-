import {
  StyleSheet,
  Platform,
} from 'react-native';

import { WHITE, CALM } from '../../constants/colors';
import isIPhoneX from '../../utils/helpers/is-iphone-x';

const isIphoneX = isIPhoneX();

let headerHeight;
let thumbnailTop;
if (Platform.OS === 'ios') {
  headerHeight = isIphoneX ? 139 : 125;
  thumbnailTop = isIphoneX ? 39 : 25;
} else {
  headerHeight = 110;
  thumbnailTop = 10;
}

export default StyleSheet.create({
  header: {
    height: headerHeight,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    justifyContent: 'center',
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    elevation: 0,
    backgroundColor: 'transparent',
  },
  titleText: {
    color: WHITE,
    position: 'absolute',
    top: 80,
    zIndex: 1000,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    position: 'absolute',
    top: thumbnailTop,
    zIndex: 1000,
    left: '50%',
    marginLeft: -70,
    elevation: 1,
  },
  thumbnail: {
    width: 140,
    height: 140,
    borderWidth: 5,
    borderColor: '#ffffff',
    borderRadius: 70,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    zIndex: 1001,
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CALM,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: WHITE,
  },
  cameraIcon: {
    width: '100%',
    height: '100%',   
    borderRadius: 14,
    borderWidth: 1,
    borderColor: WHITE, 
  },
});
