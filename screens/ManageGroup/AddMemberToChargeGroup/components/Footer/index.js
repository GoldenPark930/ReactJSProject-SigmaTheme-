import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Create charge Footer
 |------------------------------------------------------------------------------
 */

const Footer = ({ onRequest, total }) => (
  <View style={styles.wrapper}>
    <Button onPress={onRequest} style={styles.button} >
      <Text style={styles.textButton}>Request</Text>
    </Button>
    <Text style={styles.textTotal}>Total: ${total.toFixed(2)}</Text>
  </View>
);

const { func, number } = PropTypes;

Footer.propTypes = {
  onRequest: func.isRequired,
  total: number.isRequired,
};

export default Footer;
