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
        no bank account
      </Text>
    </View>
  </View>
);

export default EmptyBanksList;
