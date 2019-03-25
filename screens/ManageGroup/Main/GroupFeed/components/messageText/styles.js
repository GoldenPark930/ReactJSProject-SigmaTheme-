import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../../../../../utils/helpers';
import { ROYAL, LIGHT_GREY } from '../../../../../../constants/colors';
import { REGULAR } from '../../../../../../constants/fonts';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingVertical: scale(12),
    paddingRight: scale(10),
    marginLeft: scale(15),
    borderBottomWidth: 0.5,
    borderColor: LIGHT_GREY,
  },
  image: {
    marginLeft: scale(10),
    marginRight: scale(5),
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    borderBottomWidth: 0,
    marginLeft: verticalScale(10),
  },
  text: {
    fontSize: scale(14),
    fontWeight: 'normal',
    color: ROYAL,
    fontFamily: REGULAR,
  },
  boldText: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: ROYAL,
    fontFamily: REGULAR,
  },
  italicText: {
    fontSize: scale(14),
    fontStyle: 'italic',
    marginTop: 5,
    fontFamily: REGULAR,
  },
});
