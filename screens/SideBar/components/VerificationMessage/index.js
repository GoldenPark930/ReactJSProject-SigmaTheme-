import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import {
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

const VerificationMessage = ({ message, onPress, buttonTitle }) => (
  <View style={styles.verificationMessageContainer}>
    <Text style={styles.notificationText}>
      {message}
    </Text>

    { onPress && <TouchableOpacity
      style={styles.resendButtonContainer}
      onPress={onPress}
    >
      <Text style={styles.resendButtonLabel}>
        {buttonTitle}
      </Text>
    </TouchableOpacity> }
  </View>
);

VerificationMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string.isRequired,
};

export default VerificationMessage;
