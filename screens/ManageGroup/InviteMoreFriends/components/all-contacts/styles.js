import { StyleSheet, Dimensions } from 'react-native';

import { scale, verticalScale } from '../../../../../utils/helpers';
import {
  WHITE,
  CALM,
  ROYAL,
  DARK_BLUE,
  LIGHT_GREY,
} from '../../../../../constants/colors';
import { SCREEN_WIDTH } from '../../../../../constants/dimensions';
import { SEMI_BOLD } from '../../../../../constants/fonts/weight-map';
import { LIGHT, SEMIBOLD } from '../../../../../constants/fonts';

const AVATAR_SIZE = scale(30);
export const GRAVATAR_SIZE = AVATAR_SIZE * 3;
export const LIST_ITEM_HEIGHT = verticalScale(50);

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: WHITE,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: SCREEN_WIDTH,
    borderTopColor: LIGHT_GREY,
    borderTopWidth: 1,
  },

  blockTitle: {
    marginLeft: scale(15),
    marginVertical: verticalScale(5),
    fontSize: 9,
    fontWeight: SEMI_BOLD,
    color: ROYAL,
  },

  contactInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: LIST_ITEM_HEIGHT,
    paddingHorizontal: 8,
  },

  profile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  image: {
    marginHorizontal: scale(3.75),
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },

  contact: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  contactName: {
    color: ROYAL,
    fontSize: 10.5,
    fontWeight: SEMI_BOLD,
    marginHorizontal: scale(3.75),
  },
  contactUsername: {
    color: ROYAL,
    fontSize: 8.5,
    marginHorizontal: scale(3.75),
  },

  checkbox: {
    marginHorizontal: scale(15),
    fontSize: scale(16.5),
    color: CALM,
  },

  spinnerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: LIST_ITEM_HEIGHT,
  },

  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(15),
    backgroundColor: WHITE,
    borderRadius: 5,
  },

  phoneNumberWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_WIDTH / 2,
    marginVertical: scale(7.5),
  },

  phoneNumber: {
    marginHorizontal: scale(5),
    color: ROYAL,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width * 0.92,
    height: height * 0.3,
    borderRadius: 3,
    backgroundColor: WHITE,
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  titleText: {
    paddingVertical: 32,
    fontSize: 20,
    color: DARK_BLUE,
    fontFamily: LIGHT,
  },
  phoneText: {
    width: '100%',
  },
  inviteButton: {
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 3,
    backgroundColor: CALM,
  },
  inviteButtonText: {
    fontSize: 17,
    color: WHITE,
    fontFamily: SEMIBOLD,
  },
  checkButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 70,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: CALM,
  },
});
