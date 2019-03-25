import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import {
  CALM,
  GREY,
  WHITE,
  BLACK,
  LIGHT_GREY,
} from '../../../constants/colors';
import { REGULAR, SEMIBOLD } from '../../../constants/fonts';

const { width, height } = Dimensions.get('window');
const isSmall = height <= 600 || width <= 320;

const reasonInputText = 23;
const underReasonNoteText = 17;
const hintText = 12;
const addMemberButtonText = 18;
const requestButtonText = 18;
const totalAmountText = 16;
const totalAmountNoteText = 10;

const footerHeight = 80;
const reasonInputMarginTop = 24;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  reasonInput: {
    height: 50,
    marginTop: isSmall ? reasonInputMarginTop - 16 : reasonInputMarginTop,
    marginHorizontal: 40,
    borderBottomWidth: 1.5,
    borderBottomColor: LIGHT_GREY,
    textAlign: 'center',
    fontFamily: REGULAR,
    fontSize: isSmall ? reasonInputText - 2 : reasonInputText,
    color: BLACK,
  },
  underReasonNoteText: {
    marginTop: 16,
    textAlign: 'center',
    fontFamily: REGULAR,
    fontSize: isSmall ? underReasonNoteText - 2 : underReasonNoteText,
    color: LIGHT_GREY,
  },
  moneyInput: {
    alignSelf: 'center',
  },
  hintText: {
    marginTop: 6,
    textAlign: 'center',
    fontFamily: REGULAR,
    fontSize: isSmall ? hintText - 2 : hintText,
    color: GREY,
    paddingBottom: 30,
  },

  addMemberButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 230,
    paddingVertical: 5,
    marginTop: 25,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: CALM,
  },
  addMemberButtonText: {
    fontFamily: REGULAR,
    fontSize: isSmall ? addMemberButtonText - 2 : addMemberButtonText,
    color: CALM,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: isSmall ? footerHeight - 20 : footerHeight,
    paddingHorizontal: 15,
    backgroundColor: WHITE,
    shadowColor: GREY,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 15,
  },
  requestButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: CALM,
  },
  requestButtonText: {
    fontFamily: SEMIBOLD,
    fontSize: isSmall ? requestButtonText - 2 : requestButtonText,
    color: WHITE,
  },
  totalAmountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalTextContainer: {
    flexDirection: 'row',
  },
  totalAmountText: {
    paddingRight: 3,
    fontFamily: REGULAR,
    fontSize: isSmall ? totalAmountText - 2 : totalAmountText,
    color: BLACK,
  },
  totalAmountNote: {
    fontFamily: REGULAR,
    fontSize: isSmall ? totalAmountNoteText - 2 : totalAmountNoteText,
    color: BLACK,
  },
});
