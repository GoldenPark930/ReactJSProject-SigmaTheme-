import { StyleSheet } from 'react-native';

import * as colors from '../../../../../../../constants/colors';
import { SEMIBOLD } from '../../../../../../../constants/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginVertical: 14,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    paddingLeft: 10,
    fontSize: 18,
    color: colors.DARK_BLUE,
    fontFamily: SEMIBOLD,
  },
  iconFrame: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.CALM,
  },
  icon: {
    width: 14.6,
    height: 16,
  },
  divider: {
    borderTopColor: colors.LIGHT_GREY,
    borderTopWidth: 0.5,
  },
});

export default styles;
