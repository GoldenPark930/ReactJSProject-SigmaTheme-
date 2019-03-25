import { StyleSheet, Dimensions } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import { scale, verticalScale } from '../../../../../utils/helpers';
import { SCREEN_WIDTH } from '../../../../../constants/dimensions';
import { BOLD } from '../../../../../constants/fonts/weight-map';
import * as Colors from '../../../../../constants/colors';

const innerContentWidth = SCREEN_WIDTH * 0.8;
const { width, height } = Dimensions.get('window');
const modalHeight = 200;


export const PlaceholderTextColor = Colors.LIGHT_GREY;

export default StyleSheet.create({
  componentWrapper: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },

  separator: {
    width: scale(innerContentWidth),
    height: 1,
    marginVertical: verticalScale(1),
    backgroundColor: Colors.CALM,
  },

  blockLabel: {
    marginVertical: verticalScale(10),
    color: Colors.ROYAL,
  },

  /*
  |-----------------------------------------------------------------------------
  | Banks list -> select
  |-----------------------------------------------------------------------------
  */

  selectWrapper: {
    width: scale(innerContentWidth),
    alignItems: 'flex-start',
  },

  picker: {
    justifyContent: 'flex-start',
    left: -16, // TODO {Maksym}: try to fix negative left
  },

  pickerText: {
    fontWeight: BOLD,
    color: Colors.ROYAL,
  },

  pickerPlaceHolder: {
    fontWeight: BOLD,
    color: Colors.LIGHT_GREY,
  },

  noBanksPlaceholderText: {
    fontSize: 18,
    fontWeight: '100',
    color: Colors.LIGHT_GREY,
    fontFamily: 'Futura',
    textAlign: 'center',
    marginTop: 10,
  },

  /*
  |-----------------------------------------------------------------------------
  | Amount to transfer -> input
  |-----------------------------------------------------------------------------
  */

  inputWrapper: {
    width: scale(innerContentWidth),
    alignItems: 'flex-start',
  },

  input: {
    // fontSize: 18,
    fontWeight: BOLD,
  },

  LightGreyColor: {
    color: Colors.LIGHT_GREY,
  },

  RoyalColor: {
    color: Colors.ROYAL,
  },

  error: {
    height: verticalScale(15),
    color: Colors.RED,
  },

  /*
  |-----------------------------------------------------------------------------
  | Transfer -> button
  |-----------------------------------------------------------------------------
  */

  button: {
    width: scale(innerContentWidth),
    height: verticalScale(40),
    marginVertical: verticalScale(15),
    borderRadius: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonActive: {
    backgroundColor: Colors.WHITE,
  },

  buttonDisabled: {
    backgroundColor: Colors.LIGHT_GREY,
  },

  buttonLabel: {
    fontWeight: BOLD,
    color: '#01b8a4',
  },

  /*
  |-----------------------------------------------------------------------------
  | Modal question
  |-----------------------------------------------------------------------------
  */

  questionText: {
    color: Colors.ROYAL,
    fontWeight: BOLD,
    fontFamily: 'Futura',
  },
  linkItem: {
    paddingVertical: 10,
    fontFamily: 'Futura',
  },
  linkItemBorder: {
    borderBottomColor: Colors.GREY,
    borderBottomWidth: 1,
  },
  linkListContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankListcontainer: {
    borderTopWidth: 10,
    borderTopColor: '#e9e9e9',
  },
  linkText: {
    color: Colors.WHITE,
    fontSize: 8,
    textAlign: 'left',
    fontFamily: 'Futura',
    fontWeight: '100',
  },
  linkTitle: {
    textAlign: 'center',
  },
  modalContainer: {
    width,
    height: modalHeight,
    marginTop: height - modalHeight,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    ...ifIphoneX({
      marginTop: height - modalHeight - 80,
    }),
  },
  modalHeader: {
    borderBottomColor: Colors.LIGHT_GREY,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  modalHeaderIcon: {
    width: '10%',
  },
  modalHeaderTitle: {
    justifyContent: 'center',
    width: '100%',
    fontFamily: 'Futura',
  },
  modalContent: {
    marginTop: 10,
    marginHorizontal: 20,
    height: modalHeight - 50,
    fontFamily: 'Futura',
  },
  modalListItem: {
    flexDirection: 'row',
    marginVertical: 10,
    fontFamily: 'Futura',
  },
  itemLeft: {
    width: '90%',
  },
  itemRight: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTextTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Futura',
  },
  itemTextDescription: {
    fontSize: 13,
    fontFamily: 'Futura',
  },
  bankInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: verticalScale(15),
  },

  withBottomBorder: {
    borderBottomWidth: 1,
    borderColor: Colors.LIGHT_GREY,
  },

  bankInfoDescription: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: scale(12),
  },

  bankIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(45),
    height: verticalScale(25),
    marginVertical: scale(5),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: Colors.CALM,
  },

  bankIcon: {
    fontSize: 15,
    color: Colors.ROYAL,
  },

  bankName: {
    marginHorizontal: scale(5),
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Futura',
    color: Colors.ROYAL,
  },

  arrowButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(15),
  },

  arrowButton: {
    fontSize: 15,
    color: Colors.CALM,
  },
});
