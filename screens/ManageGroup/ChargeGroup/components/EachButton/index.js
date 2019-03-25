import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const EachButton = ({ each, onEachPress, onTotalPress }) => (
  <View
    style={styles.eachTotalButtonContainer}
  >
    <TouchableOpacity
      onPress={onEachPress}
      style={
        each ?
          [styles.eachTotalButtonCheckContainer, styles.checkContainer] :
          [styles.eachTotalButtonCheckContainer, styles.uncheckContainer]}
    >
      <Text style={
        each ?
          [styles.eachTotalButtonText, styles.checkText] :
          [styles.eachTotalButtonText, styles.uncheckText]}
      >
        Each
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onTotalPress}
      style={
        each ?
          [styles.eachTotalButtonCheckContainer, styles.uncheckContainer] :
          [styles.eachTotalButtonCheckContainer, styles.checkContainer]}
    >
      <Text style={
        each ?
          [styles.eachTotalButtonText, styles.uncheckText] :
          [styles.eachTotalButtonText, styles.checkText]}
      >
        Total
      </Text>
    </TouchableOpacity>
  </View>);

EachButton.propTypes = {
  each: PropTypes.bool.isRequired,
  onEachPress: PropTypes.func.isRequired,
  onTotalPress: PropTypes.func.isRequired,
};

export default EachButton;
