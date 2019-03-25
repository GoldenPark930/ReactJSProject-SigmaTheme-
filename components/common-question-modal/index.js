import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import ModalWithOverlay from 'src/components/modal-with-overlay';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Modal window component with question
 |------------------------------------------------------------------------------
 */

const CommonQuestionModal = props => (
  <ModalWithOverlay
    animationType="fade"
    visible={props.visible}
    onRequestClose={props.onRequestCloseHandler}
  >
    <View style={styles.wrapper}>
      <View style={styles.questionContainer}>
        {props.children || props.question}
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={props.onRequestCloseHandler}>
          <View style={[styles.controlsButton, styles.controlsNoButton]}>
            <Text style={styles.controlsNoLabel}>
              no
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={props.onSubmitQuestionHandler}>
          <View style={[styles.controlsButton, styles.controlsYesButton]}>
            <Text style={styles.controlsYesLabel}>
              yes
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </ModalWithOverlay>
);

const { bool, node, func } = PropTypes;

CommonQuestionModal.propTypes = {
  // Flags
  visible: bool.isRequired,
  // Data
  children: node,
  question: node,
  // Functions
  onRequestCloseHandler: func.isRequired,
  onSubmitQuestionHandler: func.isRequired,
};

CommonQuestionModal.defaultProps = {
  children: (
    <Text>
      Are you sure?
    </Text>
  ),
  question: null,
};

export default CommonQuestionModal;
