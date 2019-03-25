import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../../../../../../utils/helpers';
import { LIGHT_GREY } from '../../../../../../../constants/colors';

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  container: {
    width: '70%',
  },
  text: {
    textAlign: 'center',
    marginVertical: verticalScale(5),
  },
  title: {
    fontSize: scale(22),
    fontWeight: 'bold',
    color: LIGHT_GREY,
  },
  description: {
    fontSize: scale(14),
  },
});
