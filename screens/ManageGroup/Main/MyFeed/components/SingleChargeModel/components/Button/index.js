import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Helper Button component for group charges
 |------------------------------------------------------------------------------
 */

const Button = ({ type, onPress }) => {
  switch (type) {
    case 'pending': {
      const { globalWrapper, acceptWrapper, declineWrapper, text } = styles.pending;
      return (
        <View style={globalWrapper}>
          <TouchableOpacity style={acceptWrapper} onPress={() => onPress('accept')}>
            <Text style={text} >Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={declineWrapper} onPress={() => onPress('decline')}>
            <Text style={text} >Decline</Text>
          </TouchableOpacity>
        </View>
      );
    }
    case 'accepted': {
      const { wrapper, text } = styles.accepted;
      return (
        <View style={wrapper}>
          <Text style={text} >Accepted</Text>
        </View>
      );
    }
    case 'declined': {
      const { wrapper, text } = styles.declined;
      return (
        <View style={wrapper}>
          <Text style={text} >Declined</Text>
        </View>
      );
    }
    default: {
      const { wrapper } = styles.default;
      return <View style={wrapper} />;
    }
  }
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'pending',
    'accepted',
    'declined',
  ]).isRequired,
};

export default Button;
