import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Transfer to bank
 |
 | Screen title component that shows current group available balance
 |------------------------------------------------------------------------------
 */

const AvailableBalance = ({ groupBalance }) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>
      Available Balance
    </Text>

    <Text style={styles.groupBalance}>
      ${groupBalance}
    </Text>
  </View>
);

AvailableBalance.propTypes = {
  groupBalance: PropTypes.number.isRequired,
};

export default AvailableBalance;
