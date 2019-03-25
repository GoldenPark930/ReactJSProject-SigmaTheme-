import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SEMI_BOLD } from '../../constants/fonts/weight-map';
import isIphoneX from '../../utils/helpers/is-iphone-x';
import { ROYAL, CALM, RED, DARK_GREY, LIGHT_GREY, WHITE, TRANSPARENT } from '../../constants/colors';

import { REGULAR, SEMIBOLD } from '../../constants/fonts';

const isX = isIphoneX();
const { width } = Dimensions.get('window');
const isSE = width <= 320;

const dimens = {
  bank: 19,
  cardNumber: 25,
  option: 17,
  note: 15,
  feesLabel: 12,
  button: 16,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 8,
    backgroundColor: WHITE,
  },
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  bankText: {
    fontSize: isSE ? dimens.bank - 2 : dimens.bank,
    fontFamily: SEMIBOLD,
    color: ROYAL,
  },
  cardNumberText: {
    padding: 8,
    fontSize: isSE ? dimens.cardNumber - 2 : dimens.cardNumber,
    fontFamily: REGULAR,
    color: CALM,
  },
  noteText: {
    marginTop: 32,
    fontSize: isSE ? dimens.note - 2 : dimens.note,
    fontFamily: REGULAR,
    color: ROYAL,
  },
  optionContainer: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginTop: 8,
    paddingHorizontal: 8,
    borderWidth: 0.7,
    borderRadius: 3,
    borderColor: LIGHT_GREY,
  },
  optionItem: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  optionTextContainer: {
    flexDirection: 'column',
  },
  optionSecondLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: isSE ? dimens.option - 2 : dimens.option,
    fontFamily: REGULAR,
    color: ROYAL,
  },
  feesLabelText: {
    paddingLeft: 4,
    fontSize: isSE ? dimens.feesLabel - 2 : dimens.feesLabel,
    fontFamily: REGULAR,
    color: CALM,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 80,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: RED,
  },
  buttonText: {
    fontSize: isSE ? dimens.button - 2 : dimens.button,
    fontFamily: SEMIBOLD,
    color: RED,
  },
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
    backgroundColor: CALM,
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
    fontSize: 16,
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
  },
  bottomText: {
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    color: WHITE,
  },
});

export default styles;
