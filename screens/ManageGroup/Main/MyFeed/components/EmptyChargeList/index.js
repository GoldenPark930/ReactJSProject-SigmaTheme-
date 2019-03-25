import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Charges screen
 |
 | Empty Charge list representation
 |------------------------------------------------------------------------------
 */

const EmptyChargesList = () => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>
        You have no charges.
      </Text>

    </View>
  </View>
);

export default EmptyChargesList;
