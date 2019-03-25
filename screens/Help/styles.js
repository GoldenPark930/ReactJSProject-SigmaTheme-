import { StyleSheet } from 'react-native';

import * as colors from '../../constants/colors';
import { scale, verticalScale } from '../../utils/helpers';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants/dimensions';
import { BOLD } from '../../constants/fonts/weight-map';

const innerContentWidth = SCREEN_WIDTH * 0.8;
export const PlaceholderTextColor = colors.LIGHT_GREY;
const thankThumbnailHeight = verticalScale(350 / 750 * SCREEN_WIDTH);
export default StyleSheet.create({
  globalWrapper: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },

  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  componentWrapper: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },

  separator: {
    width: scale(innerContentWidth),
    height: 2,
    marginVertical: verticalScale(5),
    backgroundColor: colors.CALM,
  },

  blockLabel: {
    marginVertical: verticalScale(10),
    color: colors.ROYAL,
  },
  innerWrapper: {
    width: scale(innerContentWidth),
    alignItems: 'flex-start',
  },
  radioForm: {
    marginVertical: verticalScale(5),
    color: colors.ROYAL,
    alignItems: 'flex-start',
  },
  button: {
    width: scale(innerContentWidth),
    height: verticalScale(40),
    marginVertical: verticalScale(15),
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonActive: {
    backgroundColor: colors.CALM,
  },

  buttonDisabled: {
    backgroundColor: colors.LIGHT_GREY,
  },

  buttonLabel: {
    fontWeight: BOLD,
    color: colors.WHITE,
  },
  input: {
    borderRadius: 3,
    marginVertical: verticalScale(15),
    height: verticalScale(150),
    width: scale(innerContentWidth),
    fontSize: 14,
  },
  thumbnail: {
    width: scale(SCREEN_WIDTH),
    height: scale(277 / 750 * SCREEN_WIDTH),
    borderRadius: 0,
    borderColor: colors.TRANSPARENT,
  },
  footer: {
    backgroundColor: colors.TRANSPARENT,
    borderColor: colors.WHITE,
    height: verticalScale(200 / 750 * SCREEN_WIDTH),
  },
  thankFooter: {
    backgroundColor: colors.TRANSPARENT,
    borderColor: colors.WHITE,
    height: thankThumbnailHeight,
  },
  thankThumbnail: {
    width: scale(SCREEN_WIDTH),
    height: thankThumbnailHeight,
    borderRadius: 0,
    borderColor: colors.TRANSPARENT,
  },
  thankWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(innerContentWidth),
    height: verticalScale(SCREEN_HEIGHT - 64 * 2),
  },
  thankText: {
    textAlign: 'center',
    fontSize: 20,
  },
  thankTitle: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.CALM,
  },
  thankButton: {
    width: scale(innerContentWidth * 0.3),
    height: verticalScale(40),
    marginVertical: verticalScale(15),
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
