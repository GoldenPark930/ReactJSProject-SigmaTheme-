import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';

import ListItemSeparator from '../../../../../components/list-item-separator';
import { navigationPropTypes, TemporaryAlertProps } from '../../../../../constants/app/defaults';
import { ALL_ROLES } from '../../../../../constants/users/roles';
import NavigationService from '../../../../../utils/helpers/navigation-service';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group inner settings single item
 |------------------------------------------------------------------------------
 */

const InnerSettingsItem = (props) => {
  const {
    navigation,
    showSeparator,
    groupData: { role },
    updateNavWorkaroundState,
    settingData: { disabled, label, screen, visibleTo },
  } = props;

  // Render only visible group inner settings options
  if (visibleTo.includes(role)) {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={disabled
            ? () => Alert.alert(...TemporaryAlertProps)
            : () => {
              updateNavWorkaroundState({ [screen]: true });
              NavigationService.navigateWithDebounce(screen);
            }
          }
          style={styles.content}
        >
          <View style={styles.textWrapper}>
            <Text style={styles.text}>
              {label}
            </Text>
          </View>

          <View style={styles.button}>
            <EntypoIcon name="chevron-thin-right" style={styles.arrow} />
          </View>
        </TouchableOpacity>

        {showSeparator ? <ListItemSeparator /> : null}
      </View>
    );
  }

  return null;
};

const { bool, string, func, oneOf, shape, arrayOf } = PropTypes;

InnerSettingsItem.propTypes = {
  // Flags
  showSeparator: bool.isRequired,
  // Data
  groupData: shape({
    role: oneOf(ALL_ROLES).isRequired,
  }).isRequired,
  settingData: shape({
    disabled: bool,
    label: string.isRequired,
    screen: string.isRequired,
    visibleTo: arrayOf(oneOf(ALL_ROLES)).isRequired,
  }).isRequired,
  // Functions
  updateNavWorkaroundState: func.isRequired,
  // Navigation
  ...navigationPropTypes(PropTypes),
};

export default InnerSettingsItem;

// TODO {Maksym}: remove Alert usage when each setting will be implemented
