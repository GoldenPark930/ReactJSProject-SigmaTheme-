import { Dimensions } from 'react-native';

export const SCREEN_SIZE = Dimensions.get('window');
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = SCREEN_SIZE;
export const HEADER_HEIGHT = 64;
export const CONTENT_HEIGHT = SCREEN_HEIGHT - HEADER_HEIGHT;
