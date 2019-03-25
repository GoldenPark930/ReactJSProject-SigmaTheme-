import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  Button,
  Card,
  CardItem,
  Body,
} from 'native-base';

import PropTypes from 'prop-types';
import globalColors from '../../../GlobalCss/globalColors';
import globalBackgroundColors from '../../../GlobalCss/globalBackgroundColors';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

export default class Contact extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired,
    // isInvited: PropTypes.bool.isRequired,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    onSelect: () => { },
  }

  handleSelect() {
    if (this.props.onSelect) {
      this.props.onSelect();
    }
  }

  renderButton = () => {
    const { selected } = this.props.contact;
    if (selected) {
      return (
        <Button small style={global(globalBackgroundColors.red)} onPress={() => this.handleSelect()} >
          <Text style={global([globalColors.white, { fontSize: 12 }])}>remove</Text>
        </Button>
      );
    }

    return (
      <Button small style={global(globalBackgroundColors.calm)} onPress={() => this.handleSelect()} >
        <Text style={global([globalColors.white, { fontSize: 12 }])}>add</Text>
      </Button>
    );
  }

  render() {
    const { contact } = this.props;
    return (
      <Card>
        <CardItem header>
          <Body>
            <Text style={global([globalColors.calm, { fontWeight: 'bold' }])}>{contact.name}</Text>
            <Text style={global(globalColors.mediumgrey)}>{contact.name} friends</Text>
          </Body>
          {this.renderButton}
        </CardItem>
      </Card>
    );
  }
}
