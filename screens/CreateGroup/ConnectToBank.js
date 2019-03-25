import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
} from 'native-base';

import * as api from '../../scripts/api-functions.js';
import globalColors from '../../GlobalCss/globalColors.js';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors.js';
import NavgationService from '../../utils/helpers/navigation-service';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

export default class ConnectToBank extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={global([globalBackgroundColors.white, { borderBottomColor: 'lightgray', borderBottomWidth: 2 }])}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.goBack(null)}>
            <Icon name="arrow-back" style={global(globalColors.royal)} />
          </Button>
        </Left>
        <Body style={{ flex: 1, alignItems: 'center' }}>
          <Title style={global([globalColors.royal, { fontSize: 16 }])}>Create group</Title>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
    ),
  });

  createNewGroup = async () => {
    try {
      const groupBalance = this.props.navigation.state.params.enableBalance != 0;
      const response = await api.CreateNewGroup(this.props.navigation.state.params.newGroupName, this.props.navigation.state.params.groupMembers, groupBalance);
      if (response) {
        NavgationService.navigateWithDebounce('MyGroups');
      } else {
        Alert.alert(
          'CreateNewGroup Failed',
          'Try again.',
          [
            { text: 'OK' },
          ],
        );
      }
    } catch (error) {
      // console.error(error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Icon active name="paper-plane" />
              <Text>choose where you want the money collected from {params.newGroupName} to go</Text>
              <Right>
                <Icon name="close" />
              </Right>
            </CardItem>
          </Card>
          <Button
            full
            dark
            style={global([{ marginTop: 10 }, globalBackgroundColors.calm])}

            onPress={() => this.createNewGroup()}
          >
            <Text style={global([globalColors.white, { fontWeight: 'bold' }])}>done</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
