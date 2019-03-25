import { StyleSheet } from 'react-native';

import { CALM, ROYAL } from '../../../../../../constants/colors';
import { SEMI_BOLD } from '../../../../../../constants/fonts/weight-map';
import { SCREEN_WIDTH } from '../../../../../../constants/dimensions';

const AVATAR_SIZE = 37.5;
export const GRAVATAR_SIZE = AVATAR_SIZE * 3;

export default StyleSheet.create({
  contactInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: 55,
    paddingHorizontal: 17.5,
  },

  profile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },

  contactName: {
    color: ROYAL,
    fontSize: 12,
    fontWeight: SEMI_BOLD,
    paddingHorizontal: 5,
  },

  checkbox: {
    fontSize: 20,
    color: CALM,
  },
});
