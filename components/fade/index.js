import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

const { bool, number, shape } = PropTypes;

class Fade extends React.Component {
  static propTypes = {
    visible: bool.isRequired,
    style: shape({}).isRequired,
    children: shape({}).isRequired,
    delay: number,
    duration: number,
  };

  static defaultProps = {
    delay: 0,
    duration: 300,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  componentWillMount() {
    this.visibility = new Animated.Value(this.props.visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    const { delay, duration } = this.props;

    if (nextProps.visible) {
      this.setState({ visible: true });
    }

    Animated.timing(this.visibility, {
      toValue: nextProps.visible ? 1 : 0,
      delay,
      duration,
    }).start(() => {
      this.setState({ visible: nextProps.visible });
    });
  }

  render() {
    const { visible, style, children, ...rest } = this.props;

    const containerStyle = {
      opacity: this.visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this.visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };

    const combinedStyle = [containerStyle, style];
    return (
      <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
        {this.state.visible ? children : null}
      </Animated.View>
    );
  }
}

export default Fade;
