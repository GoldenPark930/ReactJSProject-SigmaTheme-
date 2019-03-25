import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from '../../../../../constants/dimensions';
import { RECENT_CONTACTS_BLOCK_HEIGHT } from '../../constants/content-block-height';

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: RECENT_CONTACTS_BLOCK_HEIGHT,
  },
});
