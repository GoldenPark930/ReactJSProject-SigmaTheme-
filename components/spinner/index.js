import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator } from 'react-native';

import { WHITE, OVERLAY } from 'src/constants/colors';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Application overlay loading spinner
 |
 | Spinner component that will be rendered on top of the whole
 | screen content and will fill the entire screen height and width
 |------------------------------------------------------------------------------
 |
 | This component inherited `color` and `size` props from React Native
 | ActivityIndicator component.
 |
 | ActivityIndicator `animating` prop is renamed to `visible`.
 |
 | Also this component exposes some extra props such as:
 |  - textContent
 |  - overlayColor
 |
 | TODO {Maksym}: expose text styles control
 |
 |------------------------------------------------------------------------------
 */

const SpinnerOverlay = (props) => {
  // Render nothing if spinner is not visible
  if (!props.visible) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: props.overlayColor }]}>
      <View style={styles.background}>
        <ActivityIndicator
          color={props.color}
          size={props.size}
          style={styles.spinner}
        />

        <View style={styles.textContainer}>
          <Text style={styles.textContent}>
            {props.textContent}
          </Text>
        </View>
      </View>
    </View>
  );
};

const { bool, string, oneOf } = PropTypes;

SpinnerOverlay.propTypes = {
  /**
   * The `visible` prop controls whether to show the spinner or hide it.
   *
   * - `true` show
   * - `false` hide
   *
   * Default is set to `true`.
   */
  visible: bool,
  /**
   * The `color` prop controls the foreground color of the spinner.
   *
   * Default is set to `#FFFFFF` (white).
   *
   * Note that the value is stored in a separate component to is might not
   * be the same as this helper text says.
   */
  color: string,
  /**
   * The `size` prop controls the size of the spinner.
   *
   * - `large`
   * - `small`
   *
   * Default is set to `large`
   */
  size: oneOf(['small', 'large']),
  /**
   * The `textContent` prop controls the text that will be rendered under
   * the spinner.
   *
   * Default is set to `Loading...`.
   */
  textContent: string,
  /**
   * The `overlayColor` prop controls the background color of the entire
   * overlay.
   *
   * Default is set to `rgba(0, 0, 0, 0.25)`
   *
   * Note that the value is stored in a separate component to is might not
   * be the same as this helper text says.
   */
  overlayColor: string,
};

SpinnerOverlay.defaultProps = {
  visible: true,
  color: WHITE,
  size: 'large',
  textContent: 'Loading...',
  overlayColor: OVERLAY,
};

export default SpinnerOverlay;
