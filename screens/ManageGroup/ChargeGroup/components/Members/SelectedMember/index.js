import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';
import { Icon, Thumbnail } from 'native-base';
import { getImageUrl } from '../../../../../../utils/ajax/api/common';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Create charge selected/unselected member
 |------------------------------------------------------------------------------
 */

const { number, func, objectOf, any } = PropTypes;

class SelectedMember extends Component {
  /*
  |-----------------------------------------------------------------------------
  | Props validation
  |-----------------------------------------------------------------------------
  */

  static propTypes = {
    // Data
    member: objectOf(any).isRequired,
    amount: number.isRequired,
    // Functions
    handleOnSelect: func.isRequired,
    handleOnLongPress: func.isRequired,
  };

  /*
  |-----------------------------------------------------------------------------
  | Event handlers
  |-----------------------------------------------------------------------------
  */

  handleOnSelect = () => {
    this.props.handleOnSelect();
  };
  handleOnLongPress = () => {
    this.props.handleOnLongPress();
  };


  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const { amount, member: { firstName, lastName, image, selected } } = this.props;
    const name = `${firstName || 'unknown'} ${lastName}`;
    if (selected) {
      return (
        (
          <TouchableOpacity
            style={styles.container}
            onPress={this.handleOnSelect}
            onLongPress={this.handleOnLongPress}
          >
            <View>
              <Thumbnail style={styles.thumbnail && styles.selected} source={{ uri: getImageUrl(image) }} />
              <View style={styles.iconBackground} />
              <Icon name="ios-checkmark-circle" style={styles.icon} />
            </View>
            <Text numberOfLines={1} style={styles.name}>{firstName}</Text>
            <Text numberOfLines={1} style={styles.name}>{lastName}</Text>

            <Text style={styles.amount}>
              ${isNaN(amount) ? 0 : amount}
            </Text>
          </TouchableOpacity>
        )
      );
    }
    return (
      (
        <TouchableOpacity style={styles.container} onPress={() => this.handleOnSelect()} onLongPress={this.handleOnLongPress} >
          <Thumbnail style={styles.thumbnail} source={{ uri: getImageUrl(image) }} />
          <Text numberOfLines={1} style={styles.name}>{firstName}</Text>
          <Text numberOfLines={1} style={styles.name}>{lastName}</Text>
        </TouchableOpacity>
      )
    );
  }
}

export default SelectedMember;
