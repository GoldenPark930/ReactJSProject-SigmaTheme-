import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TextInput, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';

import { WHITE } from '../../../../constants/colors';
import { getLocalImage } from '../../../../utils/helpers';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group inner settings -> Change group name view
 |
 | Content view
 |------------------------------------------------------------------------------
 */

const { bool, number, string, func, shape, oneOfType } = PropTypes;

class GroupInnerSettingsChangeGroupNameView extends Component {
  static propTypes = {
    // Flags
    updateCurrentGroupRequestInProgress: bool.isRequired,
    // Data
    groupData: shape({
      id: oneOfType([number, string]).isRequired,
      name: string.isRequired,
      image: string,
    }).isRequired,
    // Functions
    updateCurrentGroup: func.isRequired,
  };

  state = {
    groupName: this.props.groupData.name,
    wasGroupNameChanges: false,
    updateStatusMessage: '',
  };

  /*
  |-----------------------------------------------------------------------------
  | Events handlers
  |-----------------------------------------------------------------------------
  */

  groupNameOnChangeEventHandler = (groupName) => {
    this.setState({
      groupName: groupName,
      wasGroupNameChanges: true,
      updateStatusMessage: '',
    });
  };

  /*
  |-----------------------------------------------------------------------------
  | Actions handlers
  |-----------------------------------------------------------------------------
  */

  updateButtonOnPressHandler = () => {
    // Dismiss keyboard
    Keyboard.dismiss();

    const { updateCurrentGroup, groupData: { id } } = this.props;
    const { groupName } = this.state;

    // Update current group data
    updateCurrentGroup(
      id, // group ID
      { name: groupName }, // group data to update
      () => {
        // group update on success callback
        this.setState({ updateStatusMessage: 'Club name was updated' });
      },
    );
  };

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  renderUpdateButton = () => {
    if (this.props.updateCurrentGroupRequestInProgress) {
      return (
        <View style={styles.buttonContainer}>
          <ActivityIndicator color={WHITE} size="small" />
        </View>
      );
    }

    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={this.updateButtonOnPressHandler}>
        <Text style={styles.buttonLabel}>
          Update
        </Text>
      </TouchableOpacity>
    );
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: getLocalImage(this.props.groupData.image)}}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Club Name
          </Text>

          <TextInput
            value={this.state.groupName}
            style={this.state.wasGroupNameChanges ? styles.changedInputText : styles.defaultInputText}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            onChangeText={this.groupNameOnChangeEventHandler}
            onSubmitEditing={this.updateButtonOnPressHandler}
            placeholder="Type your club name"
            returnKeyType="done"
          />

          <View style={styles.separator} />
        </View>

        {this.renderUpdateButton()}

        <View style={styles.statusMessageContainer}>
          <Text style={styles.statusMessageText}>
            {this.state.updateStatusMessage}
          </Text>
        </View>
      </View>
    );
  }
}

export default GroupInnerSettingsChangeGroupNameView;
