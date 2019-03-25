import { StyleSheet } from 'react-native';

import {
  WHITE,
  LIGHT_GREY,
} from '../../constants/colors';
import isIphoneX from '../../utils/helpers/is-iphone-x';
import { REGULAR, SEMIBOLD } from '../../constants/fonts';

const isX = isIphoneX();

export default StyleSheet.create({
  lineraGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    opacity: 1,
    backgroundColor: 'transparent',
  },
  usernameContainer: {
    justifyContent: 'center',
    paddingBottom: 20,
    marginTop: 50,
  },
  nameText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '100',
    fontFamily: REGULAR,
    color: WHITE,
  },
  usernameText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '100',
    fontFamily: REGULAR,
    color: WHITE,
  },
  unpaidSection: {
    backgroundColor: 'transparent',
    marginBottom: 15,
  },
  unpaidClubItem: {
    alignItems: 'center',
  },
  unpaidSectionTitleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  unpaidSectionTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: WHITE,
    marginVertical: 15,
    fontFamily: SEMIBOLD,
    flex: 1,
  },
  unpaidSectionTitleLine: {
    width: '20%',
    borderBottomColor: LIGHT_GREY,
    borderBottomWidth: 1,
  },
  unpaidClubName: {
    textAlign: 'center',
  },
  unpaidClubNameText: {
    fontSize: 16,
    fontFamily: SEMIBOLD,
    color: WHITE,
  },
  unpaidChargeItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  chargeDescriptionText: {
    fontSize: 13,
    color: WHITE,
    fontFamily: SEMIBOLD,
    marginTop: -3,
  },
  chargeSmallText: {
    fontSize: 11,
    color: WHITE,
  },
  payNowButtonView: {
    justifyContent: 'center',
  },
  payNowButtonContainer: {
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 30,
    backgroundColor: WHITE,
    right: 0,
    marginTop: 1,
  },
  payNowButtonText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: REGULAR,
    color: '#007ed2',
  },
  chargeDetail: {
    paddingRight: 10,
    left: 0,
    width: '75%',
  },
  chargeCurrency: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  horizontalDiv: {
    width: 250,
    borderBottomWidth: 1,
    borderBottomColor: WHITE,
    marginVertical: 12,
  },
  middleSectionContainer: {
    flexDirection: 'row',
    paddingBottom: 25,
    backgroundColor: 'transparent',
  },
  middlePartsContainer: {
    flex: 1,
  },
  rightMiddleContainer: {
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: LIGHT_GREY,
  },
  leftMiddleContainer: {
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '100',
    fontFamily: REGULAR,
    color: WHITE,
  },
  middleButtonContainer: {
    marginTop: 15,
    marginBottom: 0,
    height: 30,
    borderRadius: 30,
    marginLeft: 15,
    marginRight: 20,
    backgroundColor: WHITE,
  },
  middleButtonText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: REGULAR,
    color: '#007ed2',
  },
  navigationButtonsContainer: {
    paddingVertical: 10,
    marginBottom: isX ? 24 : 0,
  },
});
