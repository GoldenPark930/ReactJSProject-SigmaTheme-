import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';
import ViewPropTypes from 'react-native/Libraries/Components/View/ViewPropTypes';
import upperFirst from 'lodash/upperFirst';

import { WHITE, BLACK } from 'src/constants/colors';
import { getPadding, getViewStyles } from './helpers';
import styles from './styles';

const { string, node, oneOf, shape } = PropTypes;

const TOP = 'top';
const BOTTOM = 'bottom';

class SafeAreaView extends Component {
  static propTypes = {
    children: node.isRequired,
    style: ViewPropTypes.style,
    disableSide: string.isRequired,
    colors: shape({
      top: string,
      bottom: string,
      vertical: string,
    }),
    forceInset: shape({
      top: oneOf(['never', 'always']),
      bottom: oneOf(['never', 'always']),
      vertical: oneOf(['never', 'always']),
    }),
  };

  static defaultProps = {
    style: {},
    colors: {},
    forceInset: {},
    onlyBottom: false,
  };

  getSafeAreaStyle = () => {
    const { forceInset, colors } = this.props;
    const { paddingTop, paddingBottom } = getViewStyles(this.props.style);

    const style = {
      paddingTop: getPadding('top'),
      paddingBottom: getPadding('bottom'),
      colorTop: WHITE,
      colorBottom: WHITE,
    };

    if (forceInset) {
      Object.keys(forceInset).forEach((key) => {
        let padding = 0;

        if (forceInset[key] === 'always') {
          padding = getPadding(key);
        }

        if (forceInset[key] === 'never') {
          padding = 0;
        }

        switch (key) {
          case 'vertical': {
            style.paddingTop = padding;
            style.paddingBottom = padding;
            break;
          }

          case 'top':
          case 'bottom': {
            style[`padding${upperFirst(key)}`] = padding;
            break;
          }

          default:
            break;
        }
      });
    }

    if (colors) {
      Object.keys(colors).forEach((key) => {
        switch (key) {
          case 'vertical': {
            style.colorTop = colors[key];
            style.colorBottom = colors[key];
            break;
          }

          case 'top':
          case 'bottom': {
            style[`color${upperFirst(key)}`] = colors[key];
            break;
          }

          default:
            break;
        }
      });
    }

    return {
      top: {
        paddingTop: style.paddingTop + paddingTop,
        backgroundColor: style.colorTop,
      },
      bottom: {
        paddingBottom: style.paddingBottom + paddingBottom,
        backgroundColor: style.colorBottom,
      },
    };
  };

  render() {
    if (Platform.OS !== 'ios') {
      return (
        <View style={styles.container}>
          {this.props.children}
        </View>
      );
    }
 
    const safeAreaStyle = this.getSafeAreaStyle();
    return (
      <View style={styles.container}>
        {
          this.props.disableSide === TOP || <View style={safeAreaStyle.top} />
        }
        {this.props.children}
        {
          this.props.disableSide === BOTTOM || <View style={safeAreaStyle.bottom} />
        }
      </View>
    );
  }
}

export default SafeAreaView;
