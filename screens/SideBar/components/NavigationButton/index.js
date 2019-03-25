import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

import styles from './styles';

const NavigationButton = ({ title, onPress }) => (
  <TouchableOpacity
    style={styles.navigationButtonContainer}
    onPress={onPress}
  >
    <Text
      numberOfLines={1}
      style={styles.navigationButtonText}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

NavigationButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default NavigationButton;

