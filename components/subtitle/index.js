import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Modal Wrapper
 |
 | Wrapper adds overlay color and closing
 | the modal when user clicks outside of it
 |------------------------------------------------------------------------------
 */

const Subtitle = ({ content, style }) => (
  <View style={[styles.wrapper, style]}>
    <View style={styles.spacer}>
      <View style={styles.line} />
    </View>
    <Text numberOfLines={1} style={[styles.content]}>
      {content}
    </Text>
    <View style={styles.spacer}>
      <View style={styles.line} />
    </View>
  </View>
);

const { string, object } = PropTypes;

Subtitle.propTypes = {
  content: string,
  style: object,
};

Subtitle.defaultProps = {
  content: 'subtitle content',
  style: {},
};

export default Subtitle;
