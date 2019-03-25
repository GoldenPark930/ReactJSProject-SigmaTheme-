import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../../../../../../utils/helpers';
import * as Colors from '../../../../../../../constants/colors';
import { SCREEN_WIDTH } from '../../../../../../../constants/dimensions';


export default StyleSheet.create({
  bankInfoWrapper: {
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

  bankInfoDescription: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: scale(10),
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
    fontSize: 12,
    fontWeight: '600',
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
