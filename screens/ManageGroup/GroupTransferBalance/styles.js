import { StyleSheet } from 'react-native';


import { CALM, WHITE, ROYAL, DARK_GREY, GREY, RED, TRANSPARENT } from '../../../constants/colors';
import { SEMI_BOLD } from '../../../constants/fonts/weight-map';
import { SCREEN_WIDTH } from '../../../constants/dimensions';
import { REGULAR } from '../../../constants/fonts';
import { verticalScale } from '../../../utils/helpers';
import isIphoneX from '../../../utils/helpers/is-iphone-x';

const isX = isIphoneX();

export const SIDE_MENU_BASE_WIDTH = SCREEN_WIDTH;// scale(235);

export default StyleSheet.create({
  lineraGradient: {
    flex: 1,
    width: '100%',
    paddingBottom: isX ? 34 : 0,
  },
  scrollView: {
    flex: 1,
  },
  badgerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    borderRadius: 3,
    backgroundColor: CALM,
  },
  mainContainer: {
    backgroundColor: TRANSPARENT,
    opacity: 1,
    flexDirection: 'column',
  },
  separator: {
    marginHorizontal: 40,
    height: 1,
    marginTop: verticalScale(15),
    backgroundColor: TRANSPARENT,
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
    borderBottomColor: GREY,
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
    color: ROYAL,
    fontSize: 16,
    fontWeight: '700',
  },
  linkTitle: {
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },

  textDollar: {
    color: GREY,
    fontSize: 40,
    textAlign: 'right',
  },

  input: {
    color: GREY,
    width: 150,
    fontSize: 40,
    fontStyle: 'italic',
    padding: 0,
    display: 'none',
  },
  error: {
    color: RED,
    marginBottom: 10,
    textAlign: 'center',
  },
  globalWrapper: {
    flex: 1,
    backgroundColor: WHITE,
  },

  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
