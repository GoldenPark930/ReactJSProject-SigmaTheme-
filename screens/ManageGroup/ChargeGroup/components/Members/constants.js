import { SCREEN_WIDTH } from '../../../../../constants/dimensions';

export const elementWidth = 80;
export const elementHeight = 120;

// Calculate Margin
const elementRow = Math.trunc(SCREEN_WIDTH / elementWidth);
const emptySpace = SCREEN_WIDTH - (elementWidth * elementRow);
export const margin = emptySpace / (2 * elementRow);
