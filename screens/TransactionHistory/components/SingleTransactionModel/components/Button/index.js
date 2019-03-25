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
  const { globalWrapper, likeWrapper, commentWrapper, text } = styles;
  return (
    <View style={globalWrapper}>
      <TouchableOpacity style={likeWrapper} onPress={() => onPress('like')}>
        <Text style={text} >like</Text>
      </TouchableOpacity>
      <TouchableOpacity style={commentWrapper} onPress={() => onPress('comment')}>
        <Text style={text} >comment</Text>
      </TouchableOpacity>
    </View>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default Button;
