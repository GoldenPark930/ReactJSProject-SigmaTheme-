import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../../../../../utils/helpers';
import * as Colors from '../../../../../../constants/colors';
import * as FontWeight from '../../../../../../constants/fonts/weight-map';
import { REGULAR } from '../../../../../../constants/fonts';

const imageSize = scale(50);

export default StyleSheet.create({
  mainWrapper: {
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 9,
    marginTop: 7.5,
    marginBottom: 7.5,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    fontFamily: REGULAR,
  },
  amountConatiner: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    marginLeft: 13,
  },
  amount: {
    textAlign: 'right',
    fontSize: scale(13),
    color: Colors.GREY,
    fontWeight: FontWeight.LIGHT,
  },
  indicator: {
    marginRight: 8,
  },
  time: {
    marginVertical: verticalScale(2),
    fontSize: scale(12),
    color: Colors.BLACK,
    fontStyle: 'italic',
    fontFamily: REGULAR,
  },
  chargeBottom: {
    flexDirection: 'row',
  },
});
