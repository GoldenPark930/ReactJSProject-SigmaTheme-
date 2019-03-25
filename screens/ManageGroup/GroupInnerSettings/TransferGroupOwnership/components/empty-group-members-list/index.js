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

const EmptyGroupMembersList = () => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>
        members list is empty
      </Text>

      <Text style={[styles.text, styles.description]}>
        you need to invite someone to the group to transfer ownership
      </Text>
    </View>
  </View>
);

export default EmptyGroupMembersList;
