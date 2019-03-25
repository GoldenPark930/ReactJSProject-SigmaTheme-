import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  TextInput,
  Animated,
  Vibration,
} from 'react-native';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Modal Wrapper
 |
 | Wrapper adds overlay color and closing
 | the modal when user clicks outside of it
 |------------------------------------------------------------------------------
 */
import Currency from '../currency';

const { func, number, string } = PropTypes;
let decimal = false;
let decimalLocation = -1;
class CurrencyInput extends React.Component {
  static propTypes = {
    amount: number,
    numberSize: number,
    limit: number,
    color: string,
    // Data
    onCurrencyChange: func.isRequired,
  };
  static defaultProps = {
    amount: 0.00,
    numberSize: 64,
    limit: false,
    color: '#000',
  }

  constructor() {
    super();
    this.state = {
      amount: 0.00,
      reset: true,
    };
  }

  componentWillMount = () => {
    this._shake = new Animated.Value(0);

    this.setState({
      amount: this.props.amount,
    });
  }

  onPressCurrency = () => {
    this.refs.amountInput.focus();
  }

  onChangeAmount = (value) => {
    const { reset } = this.state;
    if (reset) {
      value = value.substr(-1);
      this.setState({ reset: false });
    }

    const alertedValue = this.updateText(value);

    this.setState({
      amount: `${alertedValue}`,
    });
    this.props.onCurrencyChange(alertedValue);

    if (!this.props.limit)
      {return;}
    if (parseFloat(this.props.limit) >= parseFloat(alertedValue))
      {return;}

    this.shake();
  };

  updateText = (text) => {
    let value = text;

    if ((text.substring(text.length - 1, text.length).includes('.')) && (decimal === true)) {
      value = text.substring(0, text.length - 1) + text.substring(text.length - 1, text.length).replace('.', '');
    } else if (text.includes('.') === false) {
      decimal = false;
    } else if ((text.includes('.')) && (decimal === false)) {
      decimal = true;
      decimalLocation = text.indexOf('.');
    }
    if ((decimal === true) && ((text.substring(decimalLocation, text.length).length > 2))) {
      value = text.substring(0, decimalLocation + 1) + text.substring(decimalLocation + 1, decimalLocation + 3);
    }
    if (value === '') {
      value = 0;
    }

    if (!decimal) {
      value = parseFloat(value);
    }
    return value;
  }

  shake = () => {
    this._shake.setValue(0);
    Vibration.vibrate(500);
    Animated.spring(this._shake, {
      toValue: 1,
      friction: 2,
      duration: 3000,
    }).start(() => {
      this._shake.setValue(0);
    });
  };

  render() {
    const animatedStyle = {
      transform: [
        {
          translateX: this._shake.interpolate({
            inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            outputRange: [0, 2, -3, 4, -4, 3, -3, 4, -5, 2, 0],
          }),
        },
      ],
    };

    return (
      <Animated.View style={animatedStyle}>
        <TouchableOpacity style={styles.container} onPress={() => this.onPressCurrency()}>
          <Currency color={this.props.color} amount={`${this.state.amount}`} style={{ width: 100 }} numberSize={this.props.numberSize} />
          <View>
            <TextInput
              ref="amountInput"
              keyboardType="numeric"
              returnKeyType={'done'}
              maxLength={7} // this should be a bit smarter down the line
              underlineColorAndroid="transparent"
              onChangeText={this.onChangeAmount}
              style={styles.input}
              value={`${this.state.amount}`}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>

    );
  }
}
export default CurrencyInput;
