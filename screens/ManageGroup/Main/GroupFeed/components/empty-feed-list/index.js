import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Feeds screen
 |
 | Empty Feeds list representation
 |------------------------------------------------------------------------------
 */

const EmptyFeedsList = () => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>
        No club messages.
      </Text>

    </View>
  </View>
);

export default EmptyFeedsList;
