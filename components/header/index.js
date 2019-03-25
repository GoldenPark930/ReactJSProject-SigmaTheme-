import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ViewPropTypes from 'react-native/Libraries/Components/View/ViewPropTypes';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Application layout header component
 |------------------------------------------------------------------------------
 |
 |  TODO {Maksym}: add detailed props description / documentation
 |
 |------------------------------------------------------------------------------
 */

const Header = props => (
  <View style={[styles.header, props.styles]}>
    <View style={[styles.centered, props.middleStyles]}>
      {props.middle}
    </View>

    <View style={styles.sides}>
      <View style={[styles.centered, props.leftStyles]}>
        {props.left}
      </View>

      <View style={[styles.centered, props.rightStyles]}>
        {props.right}
      </View>
    </View>
  </View>
);

const { node } = PropTypes;
const { style } = ViewPropTypes;
const { empty } = styles;

Header.propTypes = {
  left: node,
  middle: node,
  right: node,
  leftStyles: style,
  middleStyles: style,
  rightStyles: style,
  styles: style,
};

Header.defaultProps = {
  left: null,
  middle: null,
  right: null,
  leftStyles: empty,
  middleStyles: empty,
  rightStyles: empty,
  styles: empty,
};

export default Header;
