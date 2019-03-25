import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './styles';

const ScreenTitle = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.line}>
      {text}
    </Text>
  </View>
);

const { string } = PropTypes;

ScreenTitle.propTypes = {
  text: string.isRequired,
};

export default ScreenTitle;
