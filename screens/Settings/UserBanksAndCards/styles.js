import { StyleSheet, Dimensions } from 'react-native';

import { CALM, WHITE, GREY, ROYAL, DARK_GREY, RED, TRANSPARENT } from '../../../constants/colors';
import { SEMI_BOLD } from '../../../constants/fonts/weight-map';
import { SCREEN_HEIGHT } from '../../../constants/dimensions/index';
import isIphoneX from '../../../utils/helpers/is-iphone-x';

const { width, height } = Dimensions.get('window');
const isSmall = height <= 600 || width <= 320;

const isX = isIphoneX();

export default StyleSheet.create({
  lineraGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingBottom: isX ? 34 : 0,
  },
  // Row Styles
  scrollView: {
    flex: 1,
    backgroundColor: WHITE,
  },
  badgerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    borderRadius: 3,
    backgroundColor: WHITE,
  },
  mainContainer: {
    backgroundColor: TRANSPARENT,
    opacity: 1,
    flexDirection: 'column',
  },
  badgerText: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    color: WHITE,
  },
  rowContainer: {
    marginLeft: 0,
    paddingHorizontal: 20,
    backgroundColor: DARK_GREY,
  },
  rowIcon: {
    width: 40,
    color: WHITE,
  },
  rowText: {
    fontSize: 14,
    textAlign: 'left',
    flex: 1,
    color: WHITE,
  },
  emailNotificationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  emailNotificationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: RED,
  },

  notificationText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: SEMI_BOLD,
    color: WHITE,
  },

  resendButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 25,
    marginTop: 7.5,
    marginBottom: 10,
    borderRadius: 3,
    backgroundColor: WHITE,
  },

  resendButtonLabel: {
    fontSize: 10,
    fontWeight: SEMI_BOLD,
    color: RED,
  },

  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderLeftWidth: 10,
    borderBottomWidth: 0,
    borderTopColor: RED,
    borderLeftColor: TRANSPARENT,
    borderRightColor: TRANSPARENT,
    borderBottomColor: RED,
  },
  linkItem: {
    paddingVertical: 10,
  },
  linkItemBorder: {
    borderBottomColor: TRANSPARENT,
    borderBottomWidth: 3,
  },
  linkListContainer: {
    borderTopWidth: 10,
    borderTopColor: TRANSPARENT,
    paddingHorizontal: 20,
  },
  bankListcontainer: {
    borderTopWidth: 10,
    borderTopColor: TRANSPARENT,
  },
  linkText: {
    color: WHITE,
    fontSize: isSmall ? 14 : 16,
    fontWeight: '700',
    fontFamily: 'Proxima Nova',
  },
  linkTitle: {
    textAlign: 'center',
    fontFamily: 'Proxima Nova',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width * 0.8,
    borderRadius: 3,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeTextTop: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
    marginTop: 25,
    color: ROYAL,
    fontFamily: 'Proxima Nova',
  },
  safeTextBottom: {
    fontSize: 12,
    width: width * 0.8,
    marginTop: 20,
    paddingHorizontal: 30,
    color: ROYAL,
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontFamily: 'Proxima Nova',
  },
  safeModalCloseButton: {
    color: WHITE,
  },
  safeTextLegal: {
    fontSize: 12,
    color: ROYAL,
    fontFamily: 'Proxima Nova',
  },
  safeTextLegalLink: {
    fontSize: 12,
    color: ROYAL,
    fontWeight: '700',
    fontFamily: 'Proxima Nova',
  }
});
