import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

/**
 |--------------------------------------------------------------------------
 | `Banks` screen
 |
 | Empty banks list representation
 |--------------------------------------------------------------------------
 */

const EmptyBanksList = () => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>
        no banks
      </Text>

      <Text style={[styles.text, styles.description]}>
        you can find things that require your attention here.
      </Text>
    </View>
  </View>
);

export default EmptyBanksList;
