import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../utils/helpers';

import * as colors from '../../constants/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/dimensions';

const innerContentWidth = SCREEN_WIDTH * 0.9;

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
  innerWrapper: {
    alignItems: 'center',
    borderBottomColor: colors.LIGHT_GREY,
    borderBottomWidth: 1,
    height: scale(110),
    width: SCREEN_WIDTH,
  },

  componentWrapper: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userWrapper: {
    width: scale(innerContentWidth),
    marginVertical: verticalScale(15),
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
  },
  bigThumbnail: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
  },
  usernameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: scale(10),
    flex: 1,
    marginVertical: scale(20),
  },
  usernameText: {
    marginVertical: scale(5),
    fontSize: 12,
  },
  amountContainer: {
    alignItems: 'flex-end',
    marginVertical: scale(10),
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  button: {
    width: scale(130),
    height: verticalScale(30),
    marginVertical: verticalScale(15),
    borderRadius: 0,
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
    color: colors.WHITE,
    fontSize: 12,
  },
  mainContainer: {
    width: scale(innerContentWidth),
    height: scale(SCREEN_HEIGHT - 174), // minus the height of user area
  },
});
