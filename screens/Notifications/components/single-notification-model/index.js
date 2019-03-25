import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, Text, Image } from 'react-native';

import ParsedText from './components/parsed-text';
import Button from './components/button';
import styles from './styles';
import { WHITE, LIGHT_GREY } from '../../../../constants/colors';


/**
 |------------------------------------------------------------------------------
 | `Notifications` screen
 |
 | Single notification model representation
 |------------------------------------------------------------------------------
 */

const SingleNotificationModel = ({ data }) => (
  <View style={[styles.mainContainer,
    data.status === 'READ' ?
      { backgroundColor: WHITE } :
      { backgroundColor: LIGHT_GREY }]}
  >
    <Image
      style={styles.image}
      source={{ uri: data.destinationImage }}
    />

    <View style={styles.descriptionContainer}>
      <ParsedText>
        {data.message}
      </ParsedText>

      <Text style={styles.time}>
        {data.createdAt && moment(data.createdAt).fromNow()}
      </Text>
    </View>

    <Button />
  </View>
);

const { string, number, bool, shape, oneOfType } = PropTypes;

SingleNotificationModel.propTypes = {
  data: shape({
    id: number.isRequired,
    read: bool.isRequired,
    message: string.isRequired,
    deliveryType: string.isRequired,
    notificationType: string.isRequired,
    createdAt: oneOfType([string, number]).isRequired,
    destinationImage: string.isRequired,
  }).isRequired,
};

export default SingleNotificationModel;
