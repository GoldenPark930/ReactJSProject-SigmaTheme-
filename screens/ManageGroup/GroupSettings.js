import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Button,
  Container,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Thumbnail,
} from 'native-base';

import globalColors from '../../GlobalCss/globalColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';
import globalBorderColors from '../../GlobalCss/globalBorderColors';

const defaultAvatar = require('../../../assets/images/payclub-default-avatar.png');

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

export default class GroupSettings extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={global([globalBackgroundColors.white, { borderBottomColor: 'lightgray', borderBottomWidth: 2 }])}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.goBack(null)} >
            <Icon name="arrow-back" style={global(globalColors.royal)} />
          </Button>
        </Left>
        <Body style={{ flex: 1, alignItems: 'center' }}>
          <Text numberOfLines={1} style={global([globalColors.royal, { fontSize: 16 }])}>Charge Club</Text>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
    ),
  });


  render() {
    return (

      <View style={{ flex: 1 }}>
        <Container style={global(globalBackgroundColors.white)}>
          <Content padder scrollEnabled={false}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 0.33 }}>
                <Thumbnail
                  style={global([globalBorderColors.calm, { width: 70, height: 70, borderRadius: 35, borderWidth: 3 }])}
                  source={defaultAvatar}
                />
              </View>
              <View style={{ flex: 0.66, flexDirection: 'column' }} />
            </View>
          </Content>
        </Container>
      </View>
    );
  }
}
