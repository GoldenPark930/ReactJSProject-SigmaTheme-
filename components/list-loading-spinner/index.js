import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles, { COLOR_CALM } from './styles';

/**
 |------------------------------------------------------------------------------
 | List loading spinner
 |
 | This spinner is mainly used to show pagination loading
 | process for lists with infinite scrolls feature
 |------------------------------------------------------------------------------
 */

const ListLoadingSpinner = () => (
  <View style={styles.spinner}>
    <ActivityIndicator animating size="large" color={COLOR_CALM} />
  </View>
);

const SPINNER = 'spinner';

export default {
  View: ListLoadingSpinner,
  JSModel: {
    id: SPINNER,
    type: SPINNER,
  },
};
