import { StyleSheet } from 'react-native';

import * as colors from '../../../../../../../constants/colors';
import { LIGHT } from '../../../../../../../constants/fonts'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
  },
  image: {
    width: 50,
    height: 50,
  },
  titleText: {
    fontSize: 15,
    color: colors.DARK_BLUE,
    fontFamily: LIGHT,
  },
  balanceText: {
    fontSize: 28,
    color: colors.CALM,
    fontFamily: LIGHT,
  },
});

export default styles;
