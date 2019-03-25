import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { toLower } from 'lodash';

import RadioButton from '../RadioButton';
import BankIcon from '../../../../../../../../assets/icons/bank.png';
import styles from './styles';

const BankItem = ({ radioId, name, selected, onSelect, isLast }) => (
  <View style={styles.mainContainer}>
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.iconFrame}>
          <Image
            style={styles.icon}
            source={BankIcon}
          />
        </View>
        <Text style={styles.labelText}>
          {name}
        </Text>
      </View>
      <RadioButton
        id={radioId}
        selected={selected}
        onSelect={onSelect}
      />
    </View>
    {
      !isLast && (
        <View style={styles.divider} />
      )
    }
  </View>
);

BankItem.propTypes = {
  radioId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired,
};

export default BankItem;
