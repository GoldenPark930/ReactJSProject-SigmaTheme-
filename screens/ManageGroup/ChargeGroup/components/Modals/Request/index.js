import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Thumbnail } from 'native-base';
import Modal from 'react-native-modal';

import { retrieveUsername } from 'src/common/localStorage';
import { getLocalImage } from 'src/utils/helpers';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Create charge ModalRequest
 |------------------------------------------------------------------------------
 */

const { func, bool, string, number } = PropTypes;

class ModalRequest extends Component {
  /*
  |-----------------------------------------------------------------------------
  | Props validation
  |-----------------------------------------------------------------------------
  */

  static propTypes = {
    // Flags
    visible: bool.isRequired,
    // Data
    groupName: string.isRequired,
    total: number.isRequired,
    selectedMemberCount: number.isRequired,
    description: string.isRequired,
    // Functions
    onClose: func.isRequired,
    onValidate: func.isRequired,
  };

  state = {
    username: '',
  };

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentWillMount() {
    this.getProps();
  }

  /*
  |-----------------------------------------------------------------------------
  | Event handlers
  |-----------------------------------------------------------------------------
  */

  getProps = async () => {
    const username = await retrieveUsername();
    this.setState({ username });
  };

  closeModal = () => {
    this.props.onClose();
  };

  validate = () => {
    this.props.onValidate();
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const { visible, loading } = this.props;
    const { global, content, header } = styles;

    return (
      <Modal isVisible={visible} >
        <TouchableWithoutFeedback onPress={() => this.closeModal()}>
          <View style={global.wrapper}>
            <TouchableWithoutFeedback>
              <View style={content.wrapper} >
                <View>
                  <Text style={content.textBigBold}>
                    {this.props.description}
                  </Text>
                  <Text style={content.text}>
                    {this.props.selectedMemberCount} friend{this.props.selectedMemberCount > 1 ? 's' : ''}
                  </Text>
                </View>
                <TouchableOpacity
                  style={content.validateButton}
                  onPress={() => this.validate()}
                  disabled={loading}
                >
                  <Text style={content.validateText}>
                    Request ${this.props.total}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal >
    );
  }
}

export default ModalRequest;
