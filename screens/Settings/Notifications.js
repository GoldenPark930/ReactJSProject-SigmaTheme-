import React from 'react';
import { StatusBar, View, Text, StyleSheet } from 'react-native';
import {
  Button,
  Container,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
} from 'native-base';

import globalColors from '../../GlobalCss/globalColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

export default class Notifications extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={global([globalBackgroundColors.white, { borderBottomColor: 'lightgray', borderBottomWidth: 2 }])}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.goBack(null)} >
            <Icon name="arrow-back" style={global(globalColors.royal)} />
          </Button>
        </Left>
        <Body style={{ flex: 1, alignItems: 'center' }}>
          <Text numberOfLines={1} style={global([globalColors.royal, { fontSize: 16 }])}>notifications</Text>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
    ),
  });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <Container style={global(globalBackgroundColors.white)}>
          <Content padder />
        </Container>
      </View>
    );
  }
}
