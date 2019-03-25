import React from 'react';
import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { Thumbnail } from 'native-base';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import { TemporaryAlertProps } from '../../../../../constants/app/defaults';
import { isOwnerOrAdmin, isOwner } from '../../../../../constants/users/roles';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Manage friends
 |
 | Single group member model representation
 |------------------------------------------------------------------------------
 */

const canBeRemovedFromGroup = (user, target) =>
  // No one can remove owner
  // Only group owner and admins can remove members
  // Can't remove yourself
  !(isOwner(target.role) || !isOwnerOrAdmin(user) || user.id === target.id);

const renderMemberName = (member) => {
  // Render member name if it exists
  if (member.firstName || member.lastName) {
    return `${member.firstName} ${member.lastName}`;
  }

  // Render member phone number if for some reason there is no firstName or lastName
  // This usually happens with unregistered members
  return member.phone;
};

const SingleGroupMemberModel = ({ memberModel, userId, userRole, showSeparator }) => (
  <View style={[styles.wrapper, showSeparator && styles.separator]}>
    <View style={styles.profile}>
      <Thumbnail
        style={styles.image}
        source={{ uri: memberModel.imageUrl }}
      />
      <View style={styles.profileDescription}>
        <Text style={styles.userRole}>
          {' '}
        </Text>

        <Text style={styles.userName}>
          {renderMemberName(memberModel)}
        </Text>

        <Text style={styles.userRole}>
          {memberModel.role}
        </Text>
      </View>
    </View>

    <View style={styles.controls}>
      {/* {temp()} */}

      {
        canBeRemovedFromGroup({ id: userId, role: userRole }, memberModel)
          ? (
            <TouchableWithoutFeedback
              onPress={() => {
                // TODO: replace alert with actual handler
                Alert.alert(...TemporaryAlertProps);
              }}
            >
              <MaterialCommunityIcon
                name="close-circle-outline"
                style={styles.deleteIcon}
              />
            </TouchableWithoutFeedback>
          )
          : null
      }
    </View>
  </View>
);

// This is temporary container for `i` button UI.
// It isn't present in current UI version but it will
// be integrated in UI version 2
const temp = () => (
  <TouchableWithoutFeedback
    onPress={() => {
      // TODO: replace alert with actual handler
      Alert.alert(...TemporaryAlertProps);
    }}
  >
    <IonIcon name="ios-information-circle" style={styles.infoIcon} />
  </TouchableWithoutFeedback>
);

export default SingleGroupMemberModel;

// TODO {Maksym}: refactor this completely
