import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import moment from 'moment';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | GroupFeed screen
 |
 | Single Feed model representation
 |------------------------------------------------------------------------------
 */

textFixes = (data) => {
  let text = data.text;
  text = text
    .replace('Group Owner', `${data.fromUser.firstName} ${data.fromUser.lastName}`)
    .replace('null null', `${data.fromUser.phone.replace('+1', '')}`)
    .replace('requests', 'requested');

  return text;
};

const MessageText = ({ data }) => (
  <View>
    <ParsedText
      style={styles.boldText}
      parse={[
        { pattern: /was charged for/, style: styles.text },
        { pattern: /paid for/, style: styles.text },
        { pattern: /added |,|and |to the group/, style: styles.text },
        { pattern: /requested |for |from /, style: styles.text },
      ]}
      childrenProps={{ allowFontScaling: false }}
    >{textFixes(data)}
    </ParsedText>
  </View>
);

const { string, number, shape, oneOfType } = PropTypes;

MessageText.propTypes = {
  data: shape({
    id: number.isRequired,
    text: string.isRequired,
    fromUserId: number.isRequired,
    fromUser: shape({
      id: number.isRequired,
      phone: string.isRequired,
      firstName: string.isRequired,
      lastName: string.isRequired,
      destinationImage: string.isRequired,
    }).isRequired,
    createdAt: oneOfType([string, number]).isRequired,
  }).isRequired,
};

export default MessageText;
