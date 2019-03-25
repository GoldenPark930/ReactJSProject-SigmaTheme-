import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import styles from './styles';

const TabGroup = ({ buttons, selectedIndex, onPressHandler }) => (
  <View style={styles.container}>
    {buttons.map((button, index) => (
      <TouchableOpacity key={index} style={styles.tabContainer} onPress={() => onPressHandler(index)}>
        {button}

        {index === selectedIndex ? <View style={styles.tabUnderline} /> : null}
      </TouchableOpacity>
    ))}
  </View>
);

const { number, node, func, arrayOf } = PropTypes;

TabGroup.propTypes = {
  // Data
  selectedIndex: number.isRequired,
  buttons: arrayOf(node).isRequired,
  // Functions
  onPressHandler: func.isRequired,
};

export default TabGroup;
