import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../../../../utils/helpers';
import { SCREEN_WIDTH } from '../../../../../constants/dimensions';
import * as Colors from '../../../../../constants/colors';

export default StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH,
    justifyContent: 'flex-start',
  },

  title: {
    marginTop: verticalScale(25),
    marginLeft: scale(15),
    marginBottom: verticalScale(5),
    fontSize: 18,
    color: Colors.ROYAL,
  },

  cardInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    paddingVertical: verticalScale(15),
  },

  withBottomBorder: {
    borderBottomWidth: 1,
    borderColor: Colors.LIGHT_GREY,
  },

  cardInfoDescription: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: scale(10),
  },

  cardIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(45),
    height: verticalScale(25),
    marginVertical: scale(5),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: Colors.CALM,
  },

  cardIcon: {
    color: Colors.ROYAL,
  },

  visa: {
    fontSize: 25,
  },

  mastercard: {
    fontSize: 20,
  },

  cardNumber: {
    marginHorizontal: scale(5),
    fontSize: 12,
    fontWeight: '600',
    color: Colors.ROYAL,
  },

  cardExpiring: {
    marginLeft: scale(25),
    fontSize: 9,
    fontWeight: '600',
    color: Colors.RED,
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

  linkButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: verticalScale(35),
  },

  linkButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(355),
    height: '100%',
    borderWidth: 1,
    borderColor: Colors.CALM,
  },

  linkButtonLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.CALM,
  },
});
