import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | User Transfer to bank
 |
 | Screen title component that shows user's available balance
 |------------------------------------------------------------------------------
 */

const AvailableBalance = ({ userBalance }) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>
      Available Balance
    </Text>

    <Text style={styles.balance}>
      ${userBalance.toFixed(2)}
    </Text>
  </View>
);

AvailableBalance.propTypes = {
  userBalance: PropTypes.number.isRequired,
};

export default AvailableBalance;
