import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { Thumbnail } from 'native-base';
import { getImageUrl } from '../../../../../../utils/ajax/api/common';


import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Create charge unselected member
 |------------------------------------------------------------------------------
 */

const { func, objectOf, any } = PropTypes;

class UnselectedMember extends Component {
  /*
  |-----------------------------------------------------------------------------
  | Props validation
  |-----------------------------------------------------------------------------
  */

  static propTypes = {
    // Data
    member: objectOf(any).isRequired,
    // Functions
    handleOnSelect: func.isRequired,
  };

  /*
  |-----------------------------------------------------------------------------
  | Event handlers
  |-----------------------------------------------------------------------------
  */

  handleOnSelect = () => {
    this.props.handleOnSelect();
  };


  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const { firstName, lastName, image } = this.props.member;
    const name = `${firstName || 'unknown'} ${lastName ? lastName : ''}`;
    return (
      (
        <TouchableOpacity style={styles.container} onPress={() => this.handleOnSelect()} >
          <Thumbnail style={styles.thumbnail} source={{ uri: getImageUrl(image) }} />
          <Text numberOfLines={1} style={styles.name}>{name}</Text>
        </TouchableOpacity>
      )
    );
  }
}

export default UnselectedMember;
