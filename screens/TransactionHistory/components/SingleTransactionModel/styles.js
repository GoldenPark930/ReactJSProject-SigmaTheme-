import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../../../utils/helpers';
import * as Colors from '../../../../constants/colors';
import * as FontWeight from '../../../../constants/fonts/weight-map';

const imageSize = scale(40);

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.WHITE,
    marginVertical: verticalScale(5),
    borderBottomColor: Colors.LIGHT_GREY,
    borderBottomWidth: 1,
    minHeight: scale(60),
  },

  image: {
    marginRight: scale(7.5),
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  },

  descriptionContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    height: '100%',
  },

  amountConatiner: {
    alignItems: 'flex-end',
  },
  time: {
    marginVertical: verticalScale(2),
    fontSize: scale(12),
    color: Colors.BLACK,
    opacity: 0.5,
  },
  negativeAmount: {
    textAlign: 'right',
    fontSize: scale(13),
    marginRight: scale(10),
    color: Colors.RED,
  },
  positiveAmount: {
    textAlign: 'right',
    fontSize: scale(13),
    marginRight: scale(10),
    color: Colors.CALM,
  },
});
