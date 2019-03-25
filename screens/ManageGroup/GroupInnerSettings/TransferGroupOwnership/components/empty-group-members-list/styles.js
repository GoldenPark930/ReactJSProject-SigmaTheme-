import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../../../../../utils/helpers';
import { CALM_V2 } from '../../../../../../constants/colors';
import { CONTENT_HEIGHT } from '../../../../../../constants/dimensions';

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: CONTENT_HEIGHT,
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
    color: CALM_V2,
  },
  description: {
    fontSize: scale(14),
  },
});
