import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '../../../../../constants/dimensions';
import { scale, verticalScale } from '../../../../../utils/helpers';
import * as Colors from '../../../../../constants/colors';

const AVATAR_SIZE = scale(37.5);
export const GRAVATAR_SIZE = AVATAR_SIZE * 3;

export default StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH,
    height: verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  separator: {
    borderBottomColor: Colors.LIGHT_GREY,
    borderBottomWidth: 1,
  },

  profile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: scale(11.25),
  },

  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    marginHorizontal: scale(3.75),
    borderRadius: AVATAR_SIZE / 2,
  },

  profileDescription: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: scale(3.75),
  },

  userName: {
    fontSize: 11,
    color: Colors.ROYAL,
  },

  userRole: {
    fontSize: 7.5,
    color: Colors.CALM,
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginRight: scale(6.25),
  },

  infoIcon: {
    fontSize: 19,
    color: Colors.CALM,
    marginHorizontal: scale(11.25),
  },

  deleteIcon: {
    fontSize: 16,
    color: Colors.RED,
    marginHorizontal: scale(11.25),
  },
});
