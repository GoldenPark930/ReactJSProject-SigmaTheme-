import React from 'react';
import PropTypes from 'prop-types';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Modal Wrapper
 |
 | Wrapper adds overlay color and closing
 | the modal when user clicks outside of it
 |------------------------------------------------------------------------------
 */

const ModalWithOverlay = ({ animationType, visible, onRequestClose, children }) => (
  <Modal
    transparent
    animationType={animationType}
    visible={visible}
    onRequestClose={onRequestClose}
  >
    <TouchableWithoutFeedback onPress={onRequestClose}>
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback>
          {children}
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const { oneOf, bool, func, node } = PropTypes;

ModalWithOverlay.propTypes = {
  // Flags
  visible: bool.isRequired,
  // Data
  animationType: oneOf(['none', 'slide', 'fade']),
  children: node.isRequired,
  // Functions
  onRequestClose: func.isRequired,
};

ModalWithOverlay.defaultProps = {
  animationType: 'none',
};

export default ModalWithOverlay;
