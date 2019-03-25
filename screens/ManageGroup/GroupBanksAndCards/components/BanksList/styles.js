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
