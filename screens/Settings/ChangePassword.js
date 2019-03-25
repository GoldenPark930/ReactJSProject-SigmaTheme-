import React from 'react';
import { StyleSheet } from 'react-native';

import {
  Text,
  Container,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Button,
  Item,
  Input,
  Label,
} from 'native-base';

import globalColors from '../../GlobalCss/globalColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';
import NavigationService from '../../utils/helpers/navigation-service';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

export default class ChangePassword extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={global([globalBackgroundColors.white, { borderBottomColor: 'lightgray', borderBottomWidth: 2 }])}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.goBack(null)} >
            <Icon name="arrow-back" style={global(globalColors.royal)} />
          </Button>
        </Left>
        <Body style={{ flex: 1, alignItems: 'center' }}>
          <Text numberOfLines={1} style={global([globalColors.royal, { fontSize: 16 }])}>change password</Text>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
    ),
  });

  render() {
    return (
      <Container style={global(globalBackgroundColors.white)}>
        <Content padder>
          <Item stackedLabel style={global([globalBackgroundColors.white, { marginTop: 20, borderBottomWidth: 0 }])}>
            <Label style={global([globalColors.royal, { fontSize: 12, fontWeight: 'bold' }])}>password</Label>
            <Input
              secureTextEntry
              placeholder="**********"
              placeholderTextColor="#ddd"
              style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1, marginBottom: 10 }}
              onChangeText={text => this.setState({ email: text })}
            />
          </Item>
          <Item stackedLabel style={global([globalBackgroundColors.white, { marginTop: 15, borderBottomWidth: 0 }])}>
            <Label style={global([globalColors.royal, { fontSize: 12, fontWeight: 'bold' }])}>confirm password</Label>
            <Input
              secureTextEntry
              placeholder="**********"
              placeholderTextColor="#ddd"
              style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1, marginBottom: 20 }}
              onChangeText={text => this.setState({ password: text })}
            />
          </Item>
          <Button
            full
            dark
            style={global([globalBackgroundColors.calm, { marginTop: 10, marginBottom: 20 }])}
            onPress={() => NavigationService.navigateWithDebounce('Login', { facebookLogin: false, googleLogin: false })}
          >
            <Text style={global([globalColors.white, { fontSize: 20 }])}>update</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
