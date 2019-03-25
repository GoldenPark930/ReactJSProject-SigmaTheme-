import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

import Separator from './separator';
import styles, { PlaceholderTextColor } from '../styles';

/**
 |------------------------------------------------------------------------------
 | Custom styled wrapper around input component with label
 |------------------------------------------------------------------------------
 */

const AmountToTransferInput = props => (
  <View style={styles.inputWrapper}>
    <Text style={styles.blockLabel}>
      Amount to Transfer
    </Text>

    <TextInput
      value={props.amount}
      style={[styles.input, props.wasAmountChanged ? styles.RoyalColor : styles.LightGreyColor]}
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="numeric"
      onChangeText={props.onChangeTextHandler}
      onSubmitEditing={props.onSubmitEditingHandler}
      placeholder="Amount of money you want to transfer"
      placeholderTextColor={PlaceholderTextColor}
      returnKeyType="done"
    />

    <Separator />

    <Text style={styles.error}>
      {props.error}
    </Text>
  </View>
);

const { bool, string, func } = PropTypes;

AmountToTransferInput.propTypes = {
  // Flags
  wasAmountChanged: bool.isRequired,
  // Data
  error: string,
  amount: string.isRequired,
  // Functions
  onChangeTextHandler: func.isRequired,
  onSubmitEditingHandler: func.isRequired,
};

AmountToTransferInput.defaultProps = {
  error: null,
};

export default AmountToTransferInput;
