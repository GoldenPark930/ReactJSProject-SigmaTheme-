import React from 'react';
import { View, Text, Linking } from 'react-native';

import styles from './styles';

const PrivacyMessage = () => (
  <View style={styles.container}>
    <View style={styles.textLine}>
      <Text style={styles.description}>
        {'By signing up you agree to Payclub\'s '}
      </Text>

      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://www.payclub.co/terms-of-service/')}
      >
        {'Terms of Service'}
      </Text>

      <Text style={styles.description}>
        {' and '}
      </Text>

      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://www.payclub.co/privacy-policy/')}
      >
        Privacy Policy
      </Text>
    </View>

    <View style={styles.textLine}>
      <Text style={styles.description}>
        {'as well as our partner Dwolla\'s '}
      </Text>

      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://www.dwolla.com/legal/tos/')}
      >
        Terms of Service
      </Text>

      <Text style={styles.description}>
        {' and '}
      </Text>
      
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://www.dwolla.com/legal/privacy/')}
      >
        Privacy Policy
      </Text>
      
      <Text style={styles.description}>
        {'.'}
      </Text>
    </View>

    
  </View>
);

export default PrivacyMessage;
