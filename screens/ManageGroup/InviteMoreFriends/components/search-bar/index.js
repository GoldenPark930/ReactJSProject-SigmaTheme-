import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableWithoutFeedback } from 'react-native';
import EvilIcon from 'react-native-vector-icons/dist/EvilIcons';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group settings -> Invite more friends
 |
 | Search bar for contacts list
 |------------------------------------------------------------------------------
 */

const { string, func } = PropTypes;

class SearchBar extends Component {
  static propTypes = {
    value: string.isRequired,
    inputOnChangeHandler: func.isRequired,
    onSubmitHandler: func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    // TODO {Maksym}: add trimming logic
    return this.props.value !== nextProps.value;
  }

  render() {
    const { value, inputOnChangeHandler, onSubmitHandler } = this.props;

    return (
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={() => this.textInput.focus()}>
          <View style={styles.inputWrapper}>
            <EvilIcon name="search" style={styles.searchIcon} />

            <TextInput
              autoCapitalize="none"
              keyboardType="default"
              style={[styles.input, !value && styles.italic]}
              placeholder="Type name, email or username"
              placeholderTextColor="#6C6C6C"
              returnKeyType="search"
              autoCorrect={false}
              value={value}
              onSubmitEditing={onSubmitHandler}
              onChangeText={(text) => {
                inputOnChangeHandler(text);
              }}
              ref={(target) => {
                this.textInput = target;
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default SearchBar;
