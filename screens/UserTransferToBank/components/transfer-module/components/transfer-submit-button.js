import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from '../styles';
import globalColors from '../../../../../GlobalCss/globalColors';

/**
 |------------------------------------------------------------------------------
 | Transfer submit button component
 |------------------------------------------------------------------------------
 */

const TransferSubmitButton = ({ isTransferAvailable, onPressHandler }) => {
  // Predefine button as disabled
  const buttonConfig = {
    onPressHandler: () => {},
    styles: styles.buttonDisabled,
  };

  // The button is disabled when user is trying to withdraw
  // more money than the group balance or zero money at all
  if (isTransferAvailable) {
    buttonConfig.onPressHandler = onPressHandler;
    buttonConfig.styles = styles.buttonActive;
  }

  return (
    <View style={styles.linkListContainer}>
      <TouchableOpacity onPress={buttonConfig.onPressHandler}>
        <View style={[styles.button, buttonConfig.styles]}>
          <Text style={styles.buttonLabel}>
          Transfer Balance To Bank
          </Text>
        </View>
      </TouchableOpacity>
      <View style={[styles.linkItem, { justifyContent: 'center', alignItems: 'center' }]} >
        <Text style={styles.linkText}>
            Bank tranfers initiated before 7PM EST on Business days will typically be available in your bank account the next business day, but will typically take up to 4 business days. Business days are Monday - Friday, excluding holidays.
        </Text>
      </View>
    </View>
  );
};

const { bool, func } = PropTypes;

TransferSubmitButton.propTypes = {
  // Flags
  isTransferAvailable: bool.isRequired,
  // Functions
  onPressHandler: func.isRequired,
};

export default TransferSubmitButton;
