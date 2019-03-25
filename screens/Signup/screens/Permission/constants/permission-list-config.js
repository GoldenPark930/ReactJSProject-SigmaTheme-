import React from 'react';
import { StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

import { CALM } from 'src/constants/colors';

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    color: CALM,
  },
});

export default {
  location: {
    label: 'Location',
    icon: <IonIcon name="ios-pin-outline" style={styles.icon} />,
  },

  notifications: {
    label: 'Notifications',
    icon: <FeatherIcon name="bell" style={styles.icon} />,
  },

  contacts: {
    label: 'Contacts',
    icon: <IonIcon name="ios-list-box-outline" style={styles.icon} />,
  },
};
