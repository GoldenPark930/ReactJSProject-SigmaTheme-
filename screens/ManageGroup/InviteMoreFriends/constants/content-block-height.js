import { SCREEN_HEIGHT, HEADER_HEIGHT } from '../../../../constants/dimensions';
import { verticalScale } from '../../../../utils/helpers';

export const CHIPS_BLOCK_HEIGHT = verticalScale(62.5);
export const SEARCH_BAR_BLOCK_HEIGHT = verticalScale(60);
export const RECENT_CONTACTS_BLOCK_HEIGHT = verticalScale(77.5);

export const ALL_CONTACTS_BLOCK_HEIGHT =
  SCREEN_HEIGHT
  - CHIPS_BLOCK_HEIGHT
  - SEARCH_BAR_BLOCK_HEIGHT
  - HEADER_HEIGHT;
