import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Image,
} from 'react-native';

import styles from './styles';
import * as colors from '../../../../../../../constants/colors';
import CheckIcon from '../../../../../../../../assets/icons/check.png';

const RadioButton = ({ id, selected, onSelect }) => (
  <TouchableOpacity
    style={
      id === selected ?
        [styles.radioButton, { backgroundColor: colors.CALM }] :
        [styles.radioButton, { borderWidth: 1, borderColor: colors.DARK_BLUE }]
    }
    onPress={() => { onSelect(id); }}
  >
    {
      id === selected && (
        <Image
          style={styles.icon}
          source={CheckIcon}
        />
      )
    }
  </TouchableOpacity>
);

RadioButton.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default RadioButton;
