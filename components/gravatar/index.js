import React from 'react';
import PropTypes from 'prop-types';
import { Gravatar } from 'react-native-gravatar';

import { DEFAULT_AVATAR_URL } from 'src/constants/app/defaults';

/**
 |------------------------------------------------------------------------------
 | Gravatar wrapper component
 |
 | Simple wrapper component with some default properties
 | to not to write them on each use
 |------------------------------------------------------------------------------
 */

const GravatarWrapper = ({ style, email, size }) => (
  <Gravatar
    style={style}
    options={{
      email,
      parameters: {
        size,
        d: DEFAULT_AVATAR_URL,
      },
      secure: true,
    }}
  />
);

const { object, string, number, oneOfType } = PropTypes;

GravatarWrapper.propTypes = {
  style: oneOfType([object, number]),
  email: string,
  size: number,
};

GravatarWrapper.defaultProps = {
  style: {},
  email: '',
  size: 100,
};

export default GravatarWrapper;
