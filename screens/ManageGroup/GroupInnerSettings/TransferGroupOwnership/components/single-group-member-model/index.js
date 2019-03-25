import React from 'react';
import PropTypes from 'prop-types';
import { Thumbnail } from 'native-base';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { getImageUrl } from 'src/utils/ajax/api/common';
import { getLocalImage } from 'src/utils/helpers';

import Gravatar from '../../../../../../components/gravatar';
import styles, { GRAVATAR_SIZE } from './styles';

/**
 |------------------------------------------------------------------------------
 | Group inner settings -> Transfer group owner
 |
 | Single group member model
 |------------------------------------------------------------------------------
 */

const SingleGroupMemberModel = ({ model, modelOnPressHandler }) => (
  <TouchableOpacity onPress={() => modelOnPressHandler(model)} style={styles.contactInfoWrapper}>
    <View style={styles.profile}>
      <Thumbnail
        style={styles.image}
        source={model.image
          ? { uri: getImageUrl(model.image) }
          : getLocalImage('defaultUserProfileImage')}
      />
      <Text style={styles.contactName}>
        {model.username ? `${model.firstName} ${model.lastName || model.username}` : `${model.phone}`}
      </Text>
    </View>

    <MaterialCommunityIcon
      name={model.selected ? 'check-circle' : 'checkbox-blank-circle-outline'}
      style={styles.checkbox}
    />
  </TouchableOpacity>
);

const { bool, number, string, func, shape } = PropTypes;

SingleGroupMemberModel.propTypes = {
  // Data
  model: shape({
    selected: bool.isRequired,
    id: number.isRequired,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    image: string,
    phone: string,
  }).isRequired,
  // Functions
  modelOnPressHandler: func.isRequired,
};

export default SingleGroupMemberModel;
