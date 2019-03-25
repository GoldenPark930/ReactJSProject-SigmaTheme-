import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Text,
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

import { authApis } from '../../scripts';
import globalColors from '../../GlobalCss/globalColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';
import NavigationService from '../../utils/helpers/navigation-service';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

export default class EnterEmail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={global([globalBackgroundColors.white, { borderBottomColor: 'lightgray', borderBottomWidth: 2 }])}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.goBack(null)} >
            <Icon name="arrow-back" style={global(globalColors.royal)} />
          </Button>
        </Left>
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
      email: '',
    };
  }

  onValueChange(value) {
    this.setState({ email: value });
  }

  sendLink = async () => {
    const email = this.state.email;
    if (email === '') { return alert('Please enter a valid email'); }

    const data = { email };
    authApis.triggerResetPassword(data);
    NavigationService.navigateWithDebounce('Update');
  };


  render() {
    return (
      <Container style={global(globalBackgroundColors.white)}>
        <Content padder>
          <Text style={global([globalColors.royal, { marginTop: 20, textAlign: 'center', fontSize: 16 }])}>
            That&lsquo;s okay, it happens!
          </Text>
          <Text style={global([globalColors.royal, { textAlign: 'center', fontSize: 16 }])}>
            Enter your email and we&lsquo;ll help you
          </Text>
          <Text style={global([globalColors.royal, { marginBottom: 15, textAlign: 'center', fontSize: 16 }])}>
            reset your password
          </Text>
          <Item
            stackedLabel
            style={global([globalBackgroundColors.white,
              { marginTop: 20, marginBottom: 10, borderBottomWidth: 0 }])}
          >
            <Label style={global([globalColors.royal, { fontSize: 14, fontWeight: 'bold', marginBottom: 3 }])}>
              E-mail Address
            </Label>
            <Input
              placeholder="example@abc.com"
              placeholderTextColor="#ddd"
              returnKeyType="next"
              style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1 }}
              onChangeText={value => this.onValueChange(value)}
            />
          </Item>
          <Button
            full
            dark
            style={global([{ marginTop: 20 }, globalBackgroundColors.calm])}
            onPress={() => this.sendLink()}
          >
            <Text style={global([globalColors.white, { fontSize: 20 }])}>send</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
