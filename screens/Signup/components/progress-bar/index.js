import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import { View } from 'react-native';

import styles from './styles';

const stepsAmount = 6;

const ProgressBar = ({ currentStep }) => {
  const steps = [];

  // Determine how step should be rendered
  for (let step = 1; step <= stepsAmount; step += 1) {
    switch (true) {
      // Step completed
      case currentStep > step:
        steps.push(
          <Icon key={`step-${step}-complete`} name="ios-checkmark-circle" style={styles.complete} />,
        );
        break;

      // Step in progress
      case currentStep === step:
        steps.push(
          <View key={`step-${step}-inProgress`} style={styles.inProgress} />,
        );
        break;

      // Step pending
      default:
      case currentStep < step:
        steps.push(
          <View key={`step-${step}-pending`} style={styles.pending} />,
        );
        break;
    }

    // Add separator between steps
    if (step !== stepsAmount) {
      steps.push(
        <View key={`step-${step}-separator`} style={styles.separator} />,
      );
    }
  }

  // Render progress bar with all steps
  return (
    <View style={styles.container}>
      {steps}
    </View>
  );
};

const { number } = PropTypes;

ProgressBar.propTypes = {
  currentStep: number.isRequired,
};

export default ProgressBar;
