import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import ViewPropTypes from 'react-native/Libraries/Components/View/ViewPropTypes';

import styles, { WhiteColor } from './styles';

const NextButton = ({ inProgress, containerStyles, onPressHandler, disabled, text }) => {
  if (inProgress) {
    return (
      <View style={[styles.container, containerStyles]} >
        <View style={styles.button}>
          <ActivityIndicator
            animating
            size="large"
          />
        </View>
      </View>
    );
  }
  let buttonStyle = styles.buttonActive;
  if (disabled) {
    buttonStyle = styles.buttonDisabled;
  }

  return (
    <View style={[styles.container, containerStyles]} >
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPressHandler}>
        <Text style={styles.label}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const { bool, func } = PropTypes;

NextButton.propTypes = {
  // Flags
  inProgress: bool,
  disabled: bool,
  // Data
  containerStyles: ViewPropTypes.style,
  // Functions
  onPressHandler: func.isRequired,
};

NextButton.defaultProps = {
  inProgress: false,
  containerStyles: styles.empty,
  disabled: false,
  text: "Next"
};

export default NextButton;
