import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import { getLocalImage } from '../../../../utils/helpers';
import styles from './styles';

const WelcomeScreen = ({ onFacebookPress, onGooglePress, onSignUpPress, onLoginPress }) => (
  <View style={styles.wrapper}>
    <View style={styles.logoContainer}>
      <Text style={styles.titleText}>
        Welcome to
      </Text>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={getLocalImage('payClubLogo')}
      />
    </View>

    <View style={styles.collectAndManageContainer} >
      <Text style={styles.collectAndManageText}>
        Organize and collect money,
      </Text>
      <Text style={styles.collectAndManageText}>
        together.
      </Text>
    </View>

    <TouchableOpacity
      style={styles.facebookButtonContainer}
      onPress={onFacebookPress}
    >
      <Text style={styles.facebookButtonText}>
        Signup via Facebook
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.signupButtonContainer}
      onPress={onSignUpPress}
    >
      <Text style={styles.signUpButtonText}>
        No Facebook?
      </Text>
    </TouchableOpacity>
    <View style={styles.loginContainer} >
      <TouchableOpacity onPress={onLoginPress}>
        <Text style={styles.loginText}>
          Already a member? Login
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

WelcomeScreen.propTypes = {
  onFacebookPress: PropTypes.func.isRequired,
  onGooglePress: PropTypes.func.isRequired,
  onLoginPress: PropTypes.func.isRequired,
  onSignUpPress: PropTypes.func.isRequired,
};

export default WelcomeScreen;
