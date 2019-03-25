import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Create charge ModalRequest
 |------------------------------------------------------------------------------
 */

const { func, bool } = PropTypes;

class ModalRequest extends Component {
  /*
  |-----------------------------------------------------------------------------
  | Props validation
  |-----------------------------------------------------------------------------
  */

  static propTypes = {
    visible: bool.isRequired,
    onClose: func.isRequired,
    onValidate: func.isRequired,
  };

  state = {
    cause: '',
  };

  /*
  |-----------------------------------------------------------------------------
  | Event handlers
  |-----------------------------------------------------------------------------
  */

  onValueChange = cause => this.setState({ cause });

  onClose = () => this.props.onClose();

  onValidate = () => this.props.onValidate(this.state.cause);

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const { visible } = this.props;
    const { cause } = this.state;
    const { global, content, colors } = styles;
    return (
      <Modal isVisible={visible} >
        <TouchableWithoutFeedback onPress={this.onClose}>
          <View style={global.wrapper}>
            <TouchableWithoutFeedback >
              <View style={content.wrapper}>
                <View style={content.header}>
                  <Text style={content.redText}>Are you sure?</Text>
                </View>
                <View style={content.body}>
                  <TextInput
                    ref={(ref) => { this.numberInput = ref; }}
                    returnKeyType="done"
                    placeholder="I am rejecting because..."
                    placeholderTextColor={colors.LIGHT_GREY}
                    underlineColorAndroid={colors.RED}
                    onChangeText={this.onValueChange}
                    style={content.inputNumberText}
                    value={cause}
                  />
                </View>
                <View style={content.footer}>
                  <TouchableOpacity style={content.button} onPress={this.onClose}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={content.button} onPress={this.onValidate}>
                    <Text style={content.redText}>Confirm</Text>
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

export default ModalRequest;
