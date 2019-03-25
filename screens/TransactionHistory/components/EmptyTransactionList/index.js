import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Transactions screen
 |
 | Empty Transaction list representation
 |------------------------------------------------------------------------------
 */

const EmptyTransactionList = () => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>
        No Transactions
      </Text>

      <Text style={[styles.text, styles.description]}>
        you can find things that require your attention here.
      </Text>
    </View>
  </View>
);

export default EmptyTransactionList;
