import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Thumbnail } from 'native-base';
import Modal from 'react-native-modal';


import { getLocalImage } from 'src/utils/helpers';
import CurrencyInput from '../../../../../../components/currencyInput';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Create charge ModalEditAmount
 |------------------------------------------------------------------------------
 */
let decimal = false;
let decimalLocation = -1;

const { func, bool, objectOf, number, any } = PropTypes;

class ModalEditAmount extends Component {
  /*
  |-----------------------------------------------------------------------------
  | Props validation
  |-----------------------------------------------------------------------------
  */

  static propTypes = {
    // Flags
    visible: bool.isRequired,
    // Data
    amount: number.isRequired,
    member: objectOf(any).isRequired,
    // Functions
    onClose: func.isRequired,
    onCustomAmountUpdate: func.isRequired,
  };

  state = {
    amount: 0,
  };

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    this.setState({ amount: nextProps.amount });
  }

  /*
  |-----------------------------------------------------------------------------
  | Event handlers
  |-----------------------------------------------------------------------------
  */

  onCustomAmountUpdate = () => {
    this.props.onCustomAmountUpdate(this.props.member, this.state.amount);
  };
  updateText = (text) => {
    /*
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
    }*/
    this.setState({ amount: text });
  }

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    if (!this.props.member) {
      return null;
    }
    const { visible } = this.props;
    const { global, content } = styles;
    const { member: { firstName, lastName, imageUrl, username, phone }, amount } = this.props;
    const name = username ? `${firstName || 'unknown'} ${lastName || ''}` : phone;
    return (
      <Modal isVisible={visible} >
        <TouchableWithoutFeedback onPress={() => this.props.onClose()}>
          <View style={global.wrapper}>
            <TouchableWithoutFeedback>
              <View style={content.wrapper} >
                <View style={content.innerWrapper}>
                  <Thumbnail style={content.thumbnail} source={{ uri: imageUrl }} />
                  <Text numberOfLines={1} style={content.name}>{name}</Text>
                  <View style={content.amountContainer}>
                    <CurrencyInput
                      style={content.input}
                      onCurrencyChange={(value) => { this.updateText(value); }}
                      numberSize={45}
                      amount={this.state.amount}
                    />
                  </View>
                </View>
                <View style={content.buttonWrapper}>
                  <TouchableOpacity style={content.cancelButton} onPress={() => this.props.onClose()}>
                    <Text style={content.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={content.updateButton} onPress={() => this.onCustomAmountUpdate()}>
                    <Text style={content.updateText}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal >
    );
  }
}

export default ModalEditAmount;
