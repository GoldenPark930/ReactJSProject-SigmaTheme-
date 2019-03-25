import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewPropTypes from 'react-native/Libraries/Components/View/ViewPropTypes';
import TextStylePropTypes from 'react-native/Libraries/Text/TextStylePropTypes';
import StyleSheetPropType from 'react-native/Libraries/StyleSheet/StyleSheetPropType';
import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native';

import styles, { DefaultColors } from './styles';

/**
 |------------------------------------------------------------------------------
 | Customisable Android like switch component
 |------------------------------------------------------------------------------
 |
 | TODO {Maksym}: add better description
 | TODO {Maksym}: add: comments, constants, onPress animation
 | TODO {Maksym}: maybe refactor some names to make them more obvious
 | TODO {Maksym}: fix the issue when only one text passed
 | TODO {Maksym}: try to use native animation driver `useNativeDriver: true,`
 | TODO {Maksym}: fix for Android
 |
 |------------------------------------------------------------------------------
 */

const { bool, number, string, func } = PropTypes;
const TextComponentStylePropTypes = StyleSheetPropType(TextStylePropTypes);

class Switch extends Component {
  static propTypes = {
    onValueChange: func,
    disabled: bool,
    activeText: string,
    inactiveText: string,
    backgroundActive: string,
    backgroundInactive: string,
    value: bool,
    circleActiveColor: string,
    circleInactiveColor: string,
    circleSize: number,
    activeTextStyle: TextComponentStylePropTypes,
    inactiveTextStyle: TextComponentStylePropTypes,
    wrapperStyle: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,
    barHeight: number,
    circleBorderWidth: number,
  };

  static defaultProps = {
    value: false,
    onValueChange: () => null,
    disabled: false,
    activeText: '',
    inactiveText: '',
    backgroundActive: DefaultColors.backgroundActive,
    backgroundInactive: DefaultColors.backgroundInactive,
    circleActiveColor: DefaultColors.circleActiveColor,
    circleInactiveColor: DefaultColors.circleInactiveColor,
    circleSize: 16,
    barHeight: 10,
    circleBorderWidth: 0,
    activeTextStyle: styles.empty,
    inactiveTextStyle: styles.empty,
    wrapperStyle: styles.empty,
    containerStyle: styles.empty,
  };

  constructor(props) {
    super(props);

    const { value, circleSize } = props;

    this.state = {
      value,
      transformSwitch: new Animated.Value(value ? circleSize / 2 : -circleSize / 2),
      backgroundColor: new Animated.Value(value ? 75 : -75),
      circleColor: new Animated.Value(value ? 75 : -75),
    };
  }

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled || nextProps.value === this.props.value) {
      return;
    }

    this.animateSwitch(nextProps.value, () => {
      this.setState({ value: nextProps.value });
    });
  }

  /*
  |-----------------------------------------------------------------------------
  | Styles helpers
  |-----------------------------------------------------------------------------
  */

  getInterpolatedColorAnimation = () => {
    const { backgroundActive, backgroundInactive } = this.props;
    const { backgroundColor } = this.state;

    return backgroundColor.interpolate({
      inputRange: [-75, 75],
      outputRange: [backgroundInactive, backgroundActive],
    });
  };

  getInterpolatedCircleColor = () => {
    const { circleActiveColor, circleInactiveColor } = this.props;
    const { circleColor } = this.state;

    return circleColor.interpolate({
      inputRange: [-75, 75],
      outputRange: [circleInactiveColor, circleActiveColor],
    });
  };

  getContainerStyles = (interpolatedColorAnimation) => {
    const { barHeight, circleSize, containerStyle } = this.props;

    return [
      styles.container,
      containerStyle,
      {
        backgroundColor: interpolatedColorAnimation,
        width: circleSize * 2,
        height: barHeight || circleSize,
        borderRadius: circleSize,
      },
    ];
  };

  getAnimatedContainerStyles = () => {
    const { transformSwitch } = this.state;
    const { circleSize } = this.props;

    return [
      styles.animatedContainer,
      { left: transformSwitch, width: circleSize * 2 },
    ];
  };

  getCircleStyles = (interpolatedCircleColor) => {
    const { circleSize, circleBorderWidth } = this.props;

    return [
      styles.circle,
      {
        borderWidth: circleBorderWidth,
        backgroundColor: interpolatedCircleColor,
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
      },
    ];
  };

  getActiveTextStyles = () =>
    [styles.text, styles.paddingRight, this.props.activeTextStyle];

  getInactiveTextStyles = () =>
    [styles.text, styles.paddingLeft, this.props.inactiveTextStyle];

  /*
  |-----------------------------------------------------------------------------
  | Actions handlers
  |-----------------------------------------------------------------------------
  */

  switchOnPressHandler = () => {
    const { onValueChange, disabled } = this.props;
    const { value } = this.state;

    if (disabled) {
      return;
    }

    onValueChange(!value);
  };

  /*
  |-----------------------------------------------------------------------------
  | Animation handlers
  |-----------------------------------------------------------------------------
  */

  animateSwitch = (value, cb = () => {
  }) => {
    Animated.parallel([
      Animated.spring(this.state.transformSwitch, {
        toValue: value ? this.props.circleSize / 2 : -this.props.circleSize / 2,
      }),
      Animated.timing(this.state.backgroundColor, {
        toValue: value ? 75 : -75,
        duration: 200,
      }),
      Animated.timing(this.state.circleColor, {
        toValue: value ? 75 : -75,
        duration: 200,
      }),
    ]).start(cb);
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const { activeText, inactiveText, wrapperStyle } = this.props;

    const interpolatedColorAnimation = this.getInterpolatedColorAnimation();
    const interpolatedCircleColor = this.getInterpolatedCircleColor();

    return (
      <TouchableWithoutFeedback onPress={this.switchOnPressHandler}>
        <View style={wrapperStyle}>
          <Animated.View style={this.getContainerStyles(interpolatedColorAnimation)}>
            <Animated.View style={this.getAnimatedContainerStyles()}>
              <Text style={this.getActiveTextStyles()}>
                {activeText}
              </Text>

              <Animated.View style={this.getCircleStyles(interpolatedCircleColor)} />

              <Text style={this.getInactiveTextStyles()}>
                {inactiveText}
              </Text>
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Switch;
