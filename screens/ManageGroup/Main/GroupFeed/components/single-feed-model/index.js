import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import MessageText from '../messageText';
import moment from 'moment';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | GroupFeed screen
 |
 | Single Feed model representation
 |------------------------------------------------------------------------------
 */

const SingleFeedModel = ({ data }) => (
  <View style={styles.wrapper}>
    <Image style={styles.image} source={{ uri: data.fromUser.imageUrl }} />
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <MessageText data={data} />
      </View>
      <Text style={styles.italicText}>
        {moment(data.createdAt).fromNow()}
      </Text>
    </View>
  </View>
);

const { string, number, shape, oneOfType } = PropTypes;

SingleFeedModel.propTypes = {
  data: shape({
    id: number.isRequired,
    text: string.isRequired,
    fromUserId: number.isRequired,
    fromUser: shape({
      id: number.isRequired,
      phone: string.isRequired,
      firstName: string.isRequired,
      lastName: string.isRequired,
      imageUrl: string.isRequired,
    }).isRequired,
    createdAt: oneOfType([string, number]).isRequired,
  }).isRequired,
};

export default SingleFeedModel;
