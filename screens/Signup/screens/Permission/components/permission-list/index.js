import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Switch } from 'react-native';

// import Switch from 'src/components/switch';
import styles from './styles';

const PermissionList = ({ permissionConfig, onToggleHandler, requestInProgress }) => (
  <View style={styles.wrapper}>
    {permissionConfig.map((permission, index) => (
      <View key={permission.label}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.iconContainer}>
              {permission.icon}
            </View>

            <Text style={styles.label}>
              {permission.label}
            </Text>
          </View>

          <Switch
            label={permission.label}
            value={permission.status}
            onValueChange={() => onToggleHandler(permission.label)}
            disabled={requestInProgress || permission.status}
            style={styles.toggleContainer}
          />
        </View>

        {index < permissionConfig.length - 1 ? <View style={styles.separator} /> : null}
      </View>
    ))}
  </View>
);

const { bool, string, node, func, arrayOf, shape } = PropTypes;

PermissionList.propTypes = {
  // Flags
  requestInProgress: bool.isRequired,
  // Data
  permissionConfig: arrayOf(shape({
    label: string.isRequired,
    icon: node.isRequired,
    status: bool.isRequired,
  })).isRequired,
  // Functions
  onToggleHandler: func.isRequired,
};

export default PermissionList;
