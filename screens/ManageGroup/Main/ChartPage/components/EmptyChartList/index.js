import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Charges screen
 |
 | Empty Charge list representation
 |------------------------------------------------------------------------------
 */

const EmptyChartList = ({ onChargeGroup, couldCharge }) => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>
        There are currently no charges.
      </Text>
    </View>
  </View>
);

const { func, bool } = PropTypes;

EmptyChartList.propTypes = {
  onChargeGroup: func.isRequired,
  couldCharge: bool.isRequired,
};

export default EmptyChartList;
