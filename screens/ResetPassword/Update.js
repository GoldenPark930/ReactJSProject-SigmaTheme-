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
  Button,
  Item,
  Input,
  Label,
} from 'native-base';
import { authApis } from '../../scripts';

import globalColors from '../../GlobalCss/globalColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';
import NavigationService from '../../utils/helpers/navigation-service';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

export default class Update extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={global([globalBackgroundColors.white, { borderBottomColor: 'lightgray', borderBottomWidth: 2 }])}>
        <Left style={{ flex: 1 }} />
        <Body style={{ flex: 1, alignItems: 'center' }}>
          <Text numberOfLines={1} style={global([globalColors.royal, { fontSize: 16 }])}>Reset password</Text>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmedPassword: '',
    };
  }

  onValueChange(element, value) {
    const state = this.state;
    state[element] = value;
    this.setState(state);
  }

  resetPassword = async () => {
    const password = this.state.password;
    const confirmedPassword = this.state.confirmedPassword;
    if (password === '' || confirmedPassword === '') { return alert('Please fill all fields'); } else if (password !== confirmedPassword) { return alert('The new password must match with the confirm-password'); }

    const token = 'zuXuH1YX0TbqWgUOQJCursLNaVrKJyCDSOyB8EXvcgj8mNGRv21KXuUY8WeKu4xb';
    const data = { newPassword: password };
    authApis.resetPassword(data, token);
    NavigationService.navigateWithDebounce('Login', { facebookLogin: false, googleLogin: false });
  };


  render() {
    return (
      <Container style={global(globalBackgroundColors.white)}>
        <Content padder>
          <Item
            stackedLabel
            style={global([globalBackgroundColors.white,
              { marginTop: 20, marginBottom: 10, borderBottomWidth: 0 }])}
          >
            <Label style={global([globalColors.royal, { fontSize: 14, fontWeight: 'bold', marginBottom: 3 }])}>
              Password
            </Label>
            <Input
              secureTextEntry
              placeholder="**********"
              placeholderTextColor="#ddd"
              style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1 }}
              onChangeText={value => this.onValueChange('password', value)}
            />
          </Item>
          <Item
            stackedLabel
            style={global([globalBackgroundColors.white,
              { marginTop: 15, marginBottom: 20, borderBottomWidth: 0 }])}
          >
            <Label style={global([globalColors.royal, { fontSize: 14, fontWeight: 'bold', marginBottom: 3 }])}>
              Confirm Password
            </Label>
            <Input
              secureTextEntry
              placeholder="**********"
              placeholderTextColor="#ddd"
              style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1, marginBottom: 20 }}
              onChangeText={value => this.onValueChange('confirmedPassword', value)}
            />
          </Item>
          <Button
            full
            dark
            style={global([globalBackgroundColors.calm, { marginTop: 10, marginBottom: 20 }])}
            onPress={() => this.resetPassword()}
          >
            <Text style={global([globalColors.white, { fontSize: 20 }])}>
              update
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
