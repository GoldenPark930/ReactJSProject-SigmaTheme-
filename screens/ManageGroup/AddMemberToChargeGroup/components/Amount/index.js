import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';

import { MODES, MODES_TYPES } from '../../constants';
import styles from './styles';
import CurrencyInput from '../../../../../components/currencyInput';

/**
 |------------------------------------------------------------------------------
 | Create charge amount
 |------------------------------------------------------------------------------
 */

const { func, oneOf } = PropTypes;

class Amount extends Component {
  /*
  |-----------------------------------------------------------------------------
  | Props validation
  |-----------------------------------------------------------------------------
  */

  static propTypes = {
    // Data
    mode: oneOf(MODES_TYPES),
    // Functions
    onValueChange: func.isRequired,
    eachModeButtonOnPressHandler: func.isRequired,
    totalModeButtonOnPressHandler: func.isRequired,
  };

  static defaultProps = {
    mode: MODES.EACH,
  };

  state = {
    chargeAmount: 0.00,
  };

  /*
  |-----------------------------------------------------------------------------
  | Event handlers
  |-----------------------------------------------------------------------------
  */

  onChangeText = (value) => {
    this.props.onValueChange('amount', value);
  };

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  getModeButtonStyles = (mode) => {
    if (this.props.mode === mode) {
      return {
        button: [styles.modeButton, styles.activeButton],
        label: [styles.modeButtonLabel, styles.activeButtonLabel],
      };
    }

    return {
      button: styles.modeButton,
      label: styles.modeButtonLabel,
    };
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const eachModeStyles = this.getModeButtonStyles(MODES.EACH);
    const totalModeStyles = this.getModeButtonStyles(MODES.TOTAL);

    return (
      <View style={styles.container}>
        <CurrencyInput onCurrencyChange={value => this.onChangeText(value)} numberSize={40} style={styles.input} />


        <View style={styles.modeContainer}>
          <TouchableOpacity style={eachModeStyles.button} onPress={this.props.eachModeButtonOnPressHandler}>
            <Text style={eachModeStyles.label}>
              Each
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={totalModeStyles.button} onPress={this.props.totalModeButtonOnPressHandler}>
            <Text style={totalModeStyles.label}>
              Total
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Amount;
