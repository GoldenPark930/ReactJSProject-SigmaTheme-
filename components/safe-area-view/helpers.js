import { DeviceInfo, NativeModules, Platform, StyleSheet } from 'react-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants/dimensions';
import { IPHONE_X_HEIGHT, IPHONE_X_WIDTH } from './constants';

const { PlatformConstants = {} } = NativeModules;
const { minor = 0 } = PlatformConstants.reactNativeVersion || {};

const doubleFromPercentString = (percent) => {
  if (!percent.includes('%')) {
    return 0;
  }

  const dbl = parseFloat(percent) / 100;

  if (isNaN(dbl)) {
    return 0;
  }

  return dbl;
};

const isIPhoneX = (() => {
  if (minor >= 50) {
    return DeviceInfo.isIPhoneX_deprecated;
  }

  return (
    Platform.OS === 'ios'
    && (
      (SCREEN_HEIGHT === IPHONE_X_HEIGHT && SCREEN_WIDTH === IPHONE_X_WIDTH)
      || (SCREEN_HEIGHT === IPHONE_X_WIDTH && SCREEN_WIDTH === IPHONE_X_HEIGHT)
    )
  );
})();

export const getViewStyles = (styles = {}) => {
  const flattenStyles = StyleSheet.flatten(styles);
  const { padding = 0, paddingVertical = padding, ...viewStyle } = flattenStyles;
  let { paddingTop = paddingVertical, paddingBottom = paddingVertical } = flattenStyles;

  if (typeof paddingTop !== 'number') {
    paddingTop = doubleFromPercentString(paddingTop) * SCREEN_HEIGHT;
  }

  if (typeof paddingBottom !== 'number') {
    paddingBottom = doubleFromPercentString(paddingBottom) * SCREEN_WIDTH;
  }

  return {
    paddingTop,
    paddingBottom,
    viewStyle,
  };
};

export const getPadding = (key) => {
  switch (key) {
    case 'vertical':
    case 'top':
      // The actual behavior should be `return isIPhoneX ? 44 : 20;` but since we don't have single
      // reusable header component and to not to change tons of files we return reduced padding so
      // the headers will do the job
      return isIPhoneX ? 29 : 0;

    case 'bottom':
      return isIPhoneX ? 34 : 0;

    default:
      return 0;
  }
};
