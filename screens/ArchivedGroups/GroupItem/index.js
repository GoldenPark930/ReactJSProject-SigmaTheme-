import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  ROYAL,
  WHITE,
  GREY,
} from '../../../constants/colors';
import styles from './styles';

const GroupItem = ({ data }) => (
  <TouchableOpacity style={styles.container}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{ uri: data.group.imageUrl }}
      />
      { data.role === 'owner' && (
        <View style={styles.starContainer}>
          <Icon
            style={styles.star}
            name="ios-star"
            size={14}
            color={WHITE}
          />
        </View>
      )}
    </View>
    <View style={styles.textContainer}>
      <View style={styles.titleContainer}>
        { data.group.enableBalance === true && (
          <Icon
            style={styles.lock}
            name="ios-lock"
            size={16}
            color={ROYAL}
          />
        )}
        <Text style={styles.titleText}>
          {data.group.name}
        </Text>
      </View>
      <Text style={styles.friendsText}>
        {data.GroupCount} friends
      </Text>
    </View>
    <Icon
      name="ios-arrow-forward"
      size={20}
      color={GREY}
    />
  </TouchableOpacity>
);

GroupItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GroupItem;
