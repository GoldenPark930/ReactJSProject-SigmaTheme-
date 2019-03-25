import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Modal Wrapper
 |
 | Wrapper adds overlay color and closing
 | the modal when user clicks outside of it
 |------------------------------------------------------------------------------
 */
const numbertFormat = (amount) => {
  if (amount.toString() === '')
    return '0';
  
  if (amount.toString().substring(0,1) === '.')
    return '0';
  
  if (amount.toString().indexOf('.') === -1) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  const roundNum = amount.toString().slice(0, amount.toString().indexOf('.'));
  const formattedNum = roundNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedNum;
};


const decimalFormat = (amount) => {
  if (amount === '.') {
    return '00';
  }
  
  let n = amount.toString().replace('$', '');

  n = Math.abs(amount);
  n = (parseFloat(n) - Math.floor(parseFloat(n))) * 100;
  return n < 10 ? `0${Math.round(n)}` : Math.round(n);
};


const Currency = ({ amount, numberSize, color, input, onPress }) => (
  <View style={styles.wrapper} onPress={onPress}>
    <Text style={[styles.symbol, { fontSize: numberSize * .6, color, marginTop: numberSize * .14 }]}>$</Text>
    <Text numberOfLines={1} style={[styles.number, { fontSize: numberSize, color }]}>
      {numbertFormat(amount)}
    </Text>
    {
      amount.toString().indexOf('.') !== -1 ? 
        <Text style={[styles.decimal, { fontSize: numberSize * .6, color, marginTop: numberSize * .1 }]}>
          {decimalFormat(amount)}
        </Text>
        : null}
  </View>
);

const { string, number, bool, func } = PropTypes;

Currency.propTypes = {
  amount: string,
  numberSize: number,
  color: string,
  input: bool,
  onPress: func,
};

Currency.defaultProps = {
  amount: '$0.00',
  numberSize: 32,
  color: '#000000',
  input: false,
  onPress: () => {},
};

export default Currency;
