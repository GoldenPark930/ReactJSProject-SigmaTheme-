import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
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
} from 'native-base';

import globalColors from '../../GlobalCss/globalColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';
import NavigationService from '../../utils/helpers/navigation-service';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

export default class ChangePhone extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={global([globalBackgroundColors.white, { borderBottomColor: 'lightgray', borderBottomWidth: 2 }])}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.goBack(null)} >
            <Icon name="arrow-back" style={global(globalColors.royal)} />
          </Button>
        </Left>
        <Body style={{ flex: 1, alignItems: 'center' }}>
          <Text numberOfLines={1} style={global([globalColors.royal, { fontSize: 16 }])}>change phone</Text>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
    ),
  });

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <Container style={global(globalBackgroundColors.white)}>
          <Content padder>
            <Text style={global([globalColors.royal,
              { marginTop: 80, textAlign: 'center', fontSize: 16, fontWeight: 'bold' }])}
            >what&lsquo;s your number?</Text>
            <Text style={global([globalColors.royal,
              { marginTop: 5, textAlign: 'center', fontSize: 12 }])}
            >don&lsquo;t worry, we won&lsquo;t</Text>
            <Text style={global([globalColors.royal,
              { textAlign: 'center', fontSize: 12 }])}
            >tell anyone.</Text>
            <Item style={{ flexDirection: 'row', borderBottomWidth: 0 }}>
              <Input
                placeholder="+1"
                placeholderTextColor="#ddd"
                style={{ flex: 0.15, height: 45, marginTop: 50, textAlign: 'center', textAlignVertical: 'center', borderWidth: 1, marginBottom: 25, marginRight: 7 }}
                onChangeText={text => this.setState({ password2: text })}
              />
              <Input
                placeholder="mobile number"
                placeholderTextColor="#ddd"
                style={{ flex: 0.85, height: 45, marginTop: 50, textAlign: 'center', textAlignVertical: 'center', borderWidth: 1, marginBottom: 25, marginLeft: 7 }}
                onChangeText={text => this.setState({ password2: text })}
              />
            </Item>
            <Button
              full
              style={global([globalBackgroundColors.calm, { marginTop: 1, height: 45 }])}
              onPress={() => NavigationService.navigateWithDebounce('Verify')}
            >
              <Text style={global([globalColors.white, { fontSize: 20 }])}>next</Text>
            </Button>
          </Content>
        </Container>
      </View>
    );
  }
}
