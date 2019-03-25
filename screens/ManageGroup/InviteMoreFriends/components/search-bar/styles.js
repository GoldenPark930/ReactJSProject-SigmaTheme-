import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../../../../utils/helpers';
import { SCREEN_WIDTH } from '../../../../../constants/dimensions';
import { BLACK } from '../../../../../constants/colors';
import { LIGHT } from '../../../../../constants/fonts/weight-map';
import { SEARCH_BAR_BLOCK_HEIGHT } from '../../constants/content-block-height';

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SEARCH_BAR_BLOCK_HEIGHT,
    paddingHorizontal: scale(17.5),
    paddingVertical: verticalScale(11.25),
  },

  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: BLACK,
  },

  searchIcon: {
    marginHorizontal: scale(10),
    fontSize: 36,
  },

  input: {
    fontSize: 13,
    fontWeight: LIGHT,
    fontStyle: 'normal',
  },

  italic: {
    fontStyle: 'italic',
  },
});
