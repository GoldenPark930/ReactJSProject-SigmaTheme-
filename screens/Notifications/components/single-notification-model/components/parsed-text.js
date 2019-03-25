import React from 'react';
import PropTypes from 'prop-types';
import ParsedText from 'react-native-parsed-text';

import styles from '../styles';

/**
 |------------------------------------------------------------------------------
 | Parsed Text wrapper component
 |------------------------------------------------------------------------------
 */

const ParsedTextPatters = [
  /group by/,
  /have been invited to join/,
  /have received a grink payment!/,
];

const ParsedTextConfig = ParsedTextPatters.map(pattern => ({
  style: styles.descriptionNormal,
  pattern,
}));

const ParsedTextComponent = ({ children }) => (
  <ParsedText
    style={styles.descriptionBold}
    parse={ParsedTextConfig}
    childrenProps={{ allowFontScaling: false }}
  >
    {children}
  </ParsedText>
);

ParsedTextComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ParsedTextComponent;
