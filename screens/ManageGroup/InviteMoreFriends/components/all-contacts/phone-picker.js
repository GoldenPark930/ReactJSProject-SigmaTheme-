import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Phone picker component
 |
 | Small and pretty simple picker to pick the contacts list user's phone number
 |------------------------------------------------------------------------------
 */

const PhonePicker = ({ phones, onPhoneSelect }) => (
  <View style={styles.modalContent}>
    {phones.map(({ label, text, number }) => (
      <TouchableOpacity key={number} onPress={() => onPhoneSelect(number)}>
        <View style={styles.phoneNumberWrapper}>
          <Text style={styles.phoneNumber}>
            {label || 'phone'}
          </Text>

          <Text style={styles.phoneNumber}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const { number, string, func, shape, arrayOf, oneOfType } = PropTypes;

PhonePicker.propTypes = {
  phones: arrayOf(shape({
    label: string,
    text: string.isRequired,
    number: oneOfType([number, string]).isRequired,
  })).isRequired,
  onPhoneSelect: func.isRequired,
};

export default PhonePicker;
