import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | `Notifications` screen
 |
 | Empty notifications list representation
 |------------------------------------------------------------------------------
 */

const EmptyNotificationsList = () => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>
        No Activity
      </Text>

      <Text style={[styles.text, styles.description]}>
        You can find things that require your attention here.
      </Text>
    </View>
  </View>
);

export default EmptyNotificationsList;
