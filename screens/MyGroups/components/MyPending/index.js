import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';

import styles from './styles';

const MyPending = ({ charges }) => {
  return charges.totalCount > 0 ? (
    <View style={styles.container}>
      <View>
        <View style={styles.pendingCount}>
          <Text style={styles.pendingCountText}>{charges.totalCount}</Text>
        </View>
      </View>
    </View>
  )
    : null;
};

const { number, shape } = PropTypes;
MyPending.propTypes = {
  charges: shape({
    totalCount: number.isRequired,
  }).isRequired,
};

export default MyPending;
