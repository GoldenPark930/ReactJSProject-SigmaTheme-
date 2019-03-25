import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import { CALM } from '../../../../constants/colors';

const styles = StyleSheet.create({
  checkBox: {
    width: 17,
    height: 17,
    marginTop: 4,
    marginRight: 8,
    borderWidth: 0,
    borderRadius: 3,
    borderColor: CALM,
  },
});

const CheckBox = ({ checked, checkbtnClicked }) => (
  <TouchableOpacity
    onPress={checkbtnClicked}
    style={styles.checkBox}
  >
    <FontAwesome style={{ fontSize: 18, color: CALM }}>{checked ? Icons.checkSquareO : Icons.squareO}</FontAwesome>
  </TouchableOpacity>
);

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  checkbtnClicked: PropTypes.func.isRequired,
};

export default CheckBox;
