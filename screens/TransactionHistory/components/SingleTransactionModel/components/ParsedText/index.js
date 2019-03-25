import React from 'react';
import PropTypes from 'prop-types';
import ParsedText from 'react-native-parsed-text';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Parsed Text wrapper component
 |------------------------------------------------------------------------------
 */

const ParsedTextPatters = [
  / paid /,
  / in /,
  / for /,
  / you /,
  / charged /,
  /Bank Transfer/,
  / transferred a balance from /,
  / to your /,
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
