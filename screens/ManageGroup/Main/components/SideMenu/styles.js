import { StyleSheet } from 'react-native';

import { CALM, WHITE, ROYAL, DARK_GREY, GREY, RED, TRANSPARENT } from '../../../../../constants/colors';
import { SEMI_BOLD } from '../../../../../constants/fonts/weight-map';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../../constants/dimensions';
import { REGULAR } from '../../../../../constants/fonts';

export const SIDE_MENU_BASE_WIDTH = SCREEN_WIDTH;// scale(235);

export default StyleSheet.create({
  // Row Styles
  container: {
    flex: 1,
    backgroundColor: DARK_GREY,
    fontFamily: REGULAR,
  },
  badgerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    borderRadius: 3,
    backgroundColor: CALM,
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
    fontFamily: REGULAR,
  },
  linkItemBorder: {
    borderBottomColor: GREY,
    borderBottomWidth: 1,
  },
  linkListContainer: {
    borderTopWidth: 10,
    borderTopColor: '#e9e9e9',
    paddingHorizontal: 50,
  },
  linkText: {
    color: ROYAL,
    fontSize: 16,
    fontWeight: '100',
    fontFamily: REGULAR,
  },
  linkTitle: {
    textAlign: 'center',
    fontFamily: REGULAR,
  },
});
