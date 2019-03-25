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
  Input,
} from 'native-base';
import globalColors from '../../GlobalCss/globalColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';
import NavigationService from '../../utils/helpers/navigation-service';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

export default class MyGroupsNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      groupsShown: [],
      username: '',
      firstname: '',
      lastname: '',
      userId: null,
      loading: true,
      fetchingGroupList: false,
    };
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <Header style={global([globalBackgroundColors.white,
          { borderBottomColor: 'lightgray', borderBottomWidth: 2 }])}
        >
          <Left>
            <Button
              transparent
              onPress={() => navigate('DrawerOpen')}
            >
              <Icon name="menu" style={global(globalColors.royal)} />
            </Button>
          </Left>
          <Body>
            <Text numberOfLines={1} style={global([globalColors.royal, { fontSize: 16 }])}>
              @{username}
            </Text>
          </Body>
          <Right />
        </Header>
        <Container style={global(globalBackgroundColors.white)}>
          <Content padder>
            <View style={{ marginTop: 220 }}>
              <Text style={global([globalColors.royal,
                { marginBottom: 40, textAlign: 'center', fontSize: 20 }])}
              >
                no clubs added yet!
              </Text>
              <View>
                <Input
                  placeholder="find existing group"
                  placeholderTextColor="#ddd"
                  style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1 }}
                  onChangeText={text => this.setState({ email: text })}
                />
                <Icon
                  name="ios-search"
                  style={global([globalColors.royal,
                    { position: 'absolute', bottom: 7, right: 20 }])}
                />
              </View>
              <Text style={global([globalColors.lightgrey,
                { marginTop: 20, textAlign: 'center', fontSize: 20 }])}
              >
                -- or --
              </Text>
              <Button
                full
                style={global([globalBackgroundColors.calm, { marginTop: 20 }])}
                onPress={() => NavigationService.navigateWithDebounce('NameNewGroup')}
              >
                <Text style={global([globalColors.white, { fontSize: 20 }])}>
                  create club
                </Text>
              </Button>
            </View>
          </Content>
        </Container>
      </View>
    );
  }
}
