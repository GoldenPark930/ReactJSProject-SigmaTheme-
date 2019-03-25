import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import { ROYAL } from '../../constants/colors';

const Header = ({
  title,
  leftAction,
  leftActionIcon,
  rightAction,
  rightActionTitle,
  rightActionColor,
  spinning,
}) => (
  <View style={styles.headerMainContainer}>
    <View style={styles.headerInnerContainer}>
      <View style={styles.backButton}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={leftAction}
        >
          <Icon
            name={leftActionIcon}
            backgroundColor={ROYAL}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {title}
        </Text>
      </View>
      <View style={styles.rightButton}>
        { rightActionTitle === '' || (spinning ? <ActivityIndicator size="large" /> :
          <TouchableOpacity
            onPress={rightAction}
          >
            <Text style={
              rightActionColor !== '' ?
                [styles.rightButtonText, { color: rightActionColor }] :
                styles.rightButtonText
            }
            >
              {rightActionTitle}
            </Text>
          </TouchableOpacity>)}
      </View>
    </View>
  </View>
);

Header.defaultProps = {
  rightAction: () => {},
  rightActionTitle: '',
  rightActionColor: '',
  spinning: false,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  leftAction: PropTypes.func.isRequired,
  leftActionIcon: PropTypes.element.isRequired,
  rightAction: PropTypes.func,
  rightActionTitle: PropTypes.string,
  rightActionColor: PropTypes.string,
  spinning: PropTypes.bool,
};

export default Header;
