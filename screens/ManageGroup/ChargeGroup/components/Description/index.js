import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Create charge description
 |------------------------------------------------------------------------------
 */

const { func } = PropTypes;

class Description extends Component {
  /*
  |-----------------------------------------------------------------------------
  | Props validation
  |-----------------------------------------------------------------------------
  */

  static propTypes = {
    onValueChange: func.isRequired,
  };

  /*
  |-----------------------------------------------------------------------------
  | Event handlers
  |-----------------------------------------------------------------------------
  */

  onChangeText = (value) => {
    this.props.onValueChange('description', value);
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    return (
      <TextInput
        placeholder="What's it for?"
        placeholderTextColor="#AAA"
        underlineColorAndroid="transparent"
        onChangeText={text => this.onChangeText(text)}
        style={styles.input}
      />
    );
  }
}

export default Description;
