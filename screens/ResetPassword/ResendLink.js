import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  Button,
  Container,
  Body,
  Content,
  Header,
  Left,
  Right,
} from 'native-base';

import globalColors from '../../GlobalCss/globalColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';
import globalBorderColors from '../../GlobalCss/globalBorderColors';
import NavigationService from '../../utils/helpers/navigation-service';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

export default class ResendLink extends React.Component {
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
      newGroupName: '',
      contactsReceived: false,
      fullContacts: [],
      value: null,
      contactsShown: [],
      isSearching: false,
      friendsAdded: [],
      contactsLoaded: false,
    };
  }

  render() {
    return (
      <Container style={global(globalBackgroundColors.white)}>
        <Content padder>
          <Text style={global([globalColors.royal, { marginTop: 20, textAlign: 'center', fontSize: 16 }])}>
             we sent a link to your email address!
          </Text>
          <Text style={global([globalColors.royal, { marginBottom: 30, textAlign: 'center', fontSize: 16 }])}>
              check your inbox
          </Text>
          <Button
            full

            dark
            style={global([globalBackgroundColors.white, globalBorderColors.calm, { marginTop: 10, borderWidth: 2 }])}
            onPress={() => NavigationService.navigateWithDebounce('Update')}
          >
            <Text style={global([globalColors.calm, { fontSize: 20 }])}>
              resend link?
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
