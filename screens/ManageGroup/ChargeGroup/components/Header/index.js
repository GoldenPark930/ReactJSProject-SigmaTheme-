import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const Header = ({ title, imageUrl, closed, onLeftPress }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerRowContainer}>
      <TouchableOpacity
        style={styles.headerBackButtonContainer}
        onPress={onLeftPress}
      >
        <Icon
          name="ios-arrow-back"
          size={30}
          color="#fff"
        />
      </TouchableOpacity>
      <View style={styles.headerMiddleContainer}>
        <Text style={styles.headerTitleText}>
          {title}
        </Text>
        <AwesomeIcon
          name={closed ? 'lock' : 'unlock'}
          size={17}
          color="#fff"
        />
      </View>
    </View>
  </View>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  closed: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onLeftPress: PropTypes.func.isRequired,
};

export default Header;
