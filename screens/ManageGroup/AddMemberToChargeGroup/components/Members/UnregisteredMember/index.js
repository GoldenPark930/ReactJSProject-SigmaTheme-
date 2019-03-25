import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Thumbnail } from 'native-base';
import { getImageUrl } from '../../../../../../utils/ajax/api/common';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Create charge unregistered member
 |------------------------------------------------------------------------------
 */

const thumbnails = [
  'https://pbs.twimg.com/profile_images/730271326150103042/gR9RVbmC_400x400.jpg',
  'https://ichef.bbci.co.uk/images/ic/128x128/p059kfp5.jpg',
  'https://a.wattpad.com/useravatar/marissameyer22.128.392600.jpg',
];

const { func, objectOf, any } = PropTypes;

class UnregisteredMember extends Component {
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

  formatNumber = (phone) => {
    const phoneTest = new RegExp(/^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/);
    phone = phone.trim();
    const results = phoneTest.exec(phone);
    if (results !== null && results.length > 8) {
      return `(${results[3]}) ${results[4]}-${results[5]}${typeof results[8] !== 'undefined' ? ` x${results[8]}` : ''}`;
    }
    return phone;
  }


  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const { firstName, lastName, phone, image } = this.props.member;


    const name = `${firstName || 'unknown'} ${lastName ? lastName.charAt(0) : 'u'}.`;
    return (
      (
        <View style={styles.container}>
          <View style={styles.unregistered}>
            <Thumbnail style={styles.thumbnail} source={{ uri: getImageUrl(image) }} />
            <View style={styles.iconBackground} />
          </View>
          <Text numberOfLines={1} style={styles.name}>{this.formatNumber(phone)}</Text>
        </View>
      )
    );
  }
}

export default UnregisteredMember;
