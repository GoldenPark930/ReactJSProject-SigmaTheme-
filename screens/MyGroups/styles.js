import {
  StyleSheet,
  Dimensions } from 'react-native';

import * as Colors from '../../constants/colors';
import { THIN, MEDIUM } from '../../constants/fonts/weight-map';
import isIPhoneX from '../../utils/helpers/is-iphone-x';
import { SEMIBOLD, REGULAR } from '../../constants/fonts';

const isIphoneX = isIPhoneX();

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  groupBody: {
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
  },
  myClubsHeader: {
    borderBottomColor: Colors.LIGHT_GREY,
    borderBottomWidth: 2,
    paddingTop: isIphoneX ? 54 : 20,
    height: isIphoneX ? 110 : 76,
  },
  logo: {
    width: 70,
  },
  profileIcon: {
    width: 28,
  },
  addIcon: {
    width: 28,
  },
  groupThumbnail: {
    width: 70,
    height: 70,
    marginTop: 5,
    borderWidth: 3,
    borderColor: Colors.WHITE,
    borderRadius: 35,
  },
  groupOwner: {
    borderColor: Colors.CALM,
  },

  groupName: {
    fontWeight: MEDIUM,
    color: Colors.ROYAL,
    fontSize: 18,
    textAlign: 'center',
  },
  groupFriendsAmount: {
    fontStyle: 'italic',
    marginTop: 5,
    color: Colors.GREY,
  },
  groupRole: {
    fontWeight: THIN,
    fontSize: 9,
    color: Colors.CALM,
  },
  arrowButton: {
    color: Colors.GREY,
  },
  starBackground: {
    backgroundColor: Colors.CALM,
    position: 'absolute',
    bottom: 0,
    right: 10,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  star: {
    color: Colors.WHITE,
    backgroundColor: 'transparent',
    fontSize: 14,
    position: 'absolute',
    bottom: 2.5,
    right: 13.5,
  },
  lock: {
    color: Colors.ROYAL,
    backgroundColor: 'transparent',
    fontSize: 20,
  },
  lockContainer: {
    width: 15,
    height: 10,
    marginLeft: 5,
  },
  tooltip: {
    backgroundColor: Colors.CALM,
    color: Colors.WHITE,
    position: 'absolute',
    bottom: 85,
    right: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 2,
  },
  tooltipText: {
    color: Colors.WHITE,
  },
  tooltipTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.CALM,
    position: 'absolute',
    bottom: -8,
    right: 26,
  },
  inviteOnlyCodeBackgroundContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.LIGHT_GREY,
    paddingBottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width * 0.8,
    borderRadius: 3,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteOnlyInputContainer: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteOnlyInputCodeText: {
    width: 60,
    fontSize: 16,
    textAlign: 'center',
  },
  inviteOnlyTextTop: {
    textAlign: 'center',
    fontWeight: '800',
    width: width * 0.6,
    marginTop: 25,
  },
  inviteOnlyTextBottom: {
    textAlign: 'center',
    fontWeight: '100',
    width: width * 0.7,
    marginTop: 25,
    marginBottom: 25,
  },
  inviteOnlyTextBottomSmall: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  verificationText: {
    textAlign: 'left',
    fontWeight: '100',
    width: width * 0.7,
    marginTop: 25,
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  verifyButton: {
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 3,
    backgroundColor: Colors.CALM,
  },
  verifyButtonText: {
    fontSize: 17,
    color: Colors.WHITE,
    fontFamily: SEMIBOLD,
  },
  monsterIcon: {
    width: 24,
    height: 25,
  },
  spacer: {
    flex: 1,
  },
  groupMiddleSection: {
    flexDirection: 'row',
  },
  groupBalance: {
    alignItems: 'center',
    paddingTop: 12,
  },
  currencyTitle: {
    fontSize: 12,
  },
  creationDate: {
    fontSize: 10,
    textAlign: 'center',
    flex: 1,
    marginTop: 10,
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 10,
    paddingRight: 0,
  },
  emailModalText: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 21,
    fontFamily: REGULAR,
    color: Colors.BLACK,
  },
  emailModalButtonContainer: {
    marginTop: 25,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 3,
    backgroundColor: Colors.CALM,
  },
  emailModalButtonText: {
    fontSize: 20,
    fontFamily: REGULAR,
    color: Colors.WHITE,
  },
});
