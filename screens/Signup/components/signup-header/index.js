import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, Image, Keyboard, TouchableOpacity } from 'react-native';

import { clearSignupData } from 'src/store/actions/signup';
import { navigationPropTypes } from 'src/constants/app/defaults';
import { getLocalImage } from 'src/utils/helpers';
import Header from 'src/components/header';
import styles from './styles';

const SignupHeader = ({ backButtonLabel, navigation, clearData }) => {
  const goBack = () => {
    Keyboard.dismiss();
    navigation.goBack(null);
    if (backButtonLabel === 'Cancel') clearData();
  };

  const leftContent = (
    <TouchableOpacity style={styles.backButtonContainer} onPress={goBack}>
      <Text style={styles.backButtonLabel}>
        {backButtonLabel}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Header
      left={leftContent}
    />
  );
};

const { string, func } = PropTypes;

SignupHeader.propTypes = {
  backButtonLabel: string,
  clearData: func.isRequired,
  // Navigation
  ...navigationPropTypes(PropTypes),
};

SignupHeader.defaultProps = {
  backButtonLabel: 'Back',
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    clearData: clearSignupData,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignupHeader);
