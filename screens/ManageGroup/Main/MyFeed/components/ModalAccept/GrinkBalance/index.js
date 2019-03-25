import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
} from 'react-native';

import RadioButton from '../RadioButton';
import styles from './styles';

const defaultAvatar = require('../../../../../../../../assets/images/payclub-default-avatar.png');

const GrinkBalance = ({ radioId, selected, onSelect, balance }) => (
  <View style={styles.container}>
    <View style={styles.infoContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          My Payclub Balance
        </Text>
        <Text style={styles.balanceText}>
          ${balance}
        </Text>
      </View>
    </View>
    <RadioButton
      id={radioId}
      selected={selected}
      onSelect={onSelect}
    />
  </View>
);

GrinkBalance.propTypes = {
  radioId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  balance: PropTypes.number.isRequired,
};

export default GrinkBalance;
