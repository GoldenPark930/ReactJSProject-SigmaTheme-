import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import CommonQuestionModal from '../../../../../../components/common-question-modal';
import styles from '../styles';

/**
 |------------------------------------------------------------------------------
 | Modal window component with question
 |------------------------------------------------------------------------------
 */

const QuestionModal = props => (
  <CommonQuestionModal
    visible={props.visible}
    onRequestCloseHandler={props.onRequestClose}
    onSubmitQuestionHandler={props.onSubmitQuestionHandler}
  >
    <Text style={styles.questionText}>
      are you sure you want to
    </Text>

    <Text style={styles.questionText}>
      transfer {props.amount}?
    </Text>
  </CommonQuestionModal>
);

const { bool, number, func, string, oneOfType } = PropTypes;

QuestionModal.propTypes = {
  // Flags
  visible: bool.isRequired,
  // Data
  amount: oneOfType([number, string]).isRequired,
  // Functions
  onRequestClose: func.isRequired,
  onSubmitQuestionHandler: func.isRequired,
};

export default QuestionModal;
