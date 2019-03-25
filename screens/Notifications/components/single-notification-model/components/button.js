import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from '../styles';

/**
 |------------------------------------------------------------------------------
 | Helper Button component for single notification model
 |------------------------------------------------------------------------------
 */

const Button = ({ type }) => {
  switch (type) {
    case 'UPDATE':
    case 'REMIND':
    case 'RETRY':
      return (
        <View style={styles.buttonWrapper}>
          <TouchableHighlight>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonLabel}>
                {type.toLowerCase()}
              </Text>

              <FontAwesome style={styles.chevronRight}>
                {Icons.chevronRight}
              </FontAwesome>
            </View>
          </TouchableHighlight>
        </View>
      );

    case 'ARROW':
      return (
        <View style={styles.buttonWrapper}>
          <FontAwesome style={[styles.chevronRight, styles.arrowButton]}>
            {Icons.chevronRight}
          </FontAwesome>
        </View>
      );

    default:
      return <View style={styles.buttonWrapper} />;
  }
};

Button.propTypes = {
  type: PropTypes.oneOf([
    'UPDATE',
    'REMIND',
    'RETRY',
    'ARROW',
    'DEFAULT',
  ]),
};

Button.defaultProps = {
  type: 'DEFAULT',
};

export default Button;
