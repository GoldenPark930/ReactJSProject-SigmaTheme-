import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../../../../../utils/helpers';
import { CALM, MEDIUM_GREY, CALM_V2 } from '../../../../../../constants/colors';
import { CONTENT_HEIGHT } from '../../../../../../constants/dimensions';
import { REGULAR } from '../../../../../../constants/fonts';

const TABBAR_HEIGHT = 90;

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: CONTENT_HEIGHT - TABBAR_HEIGHT,
  },
  container: {
    width: '70%',
  },
  text: {
    textAlign: 'center',
    marginVertical: verticalScale(5),
    fontFamily: REGULAR,
  },
  title: {
    fontSize: scale(22),
    fontWeight: '100',
    color: CALM_V2,
    fontFamily: REGULAR,
  },
  description: {
    fontSize: scale(14),
  },
  button: {
    backgroundColor: CALM,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40,
    width: 240,
    borderRadius: 3,
    marginTop: 40,
  },
  textButton: {
    color: 'white',
    fontSize: 14,
  },
});
