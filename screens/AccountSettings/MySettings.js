import React from 'react';
import { StatusBar, View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import {
  Button,
  Container,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Input,
  Item,
  Tab,
  Tabs,
  TabHeading,
  List,
  ListItem,
  Thumbnail,
} from 'native-base';
import Modal from 'react-native-modal';
import { RadioForm } from 'react-native-simple-radio-button';

import globalColors from '../../GlobalCss/globalColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';
import globalBorderColors from '../../GlobalCss/globalBorderColors';
import NavigationService from '../../utils/helpers/navigation-service';

const defaultAvatar = require('../../../assets/images/payclub-default-avatar.png');

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

export default class MySettings extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={global([globalBackgroundColors.white, { borderBottomColor: 'lightgray', borderBottomWidth: 2 }])}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
            <Icon name="menu" style={global(globalColors.royal)} />
          </Button>
        </Left>
        <Body style={{ flex: 1, alignItems: 'center' }}>
          <Title style={global([globalColors.royal, { fontSize: 16 }])}>My settings</Title>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })


  // TODO fix red X buttons to be red x in circle icons and fix icon images and make them
  // not get cut off
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    const radio_props = [
      { label: 'checking          ', value: 0, color: '#00074D' },
      { label: 'savings', value: 1, color: '#00074D' },
    ];

    // TODO change all buton onPress functions to be correct and store input data
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <Modal isVisible={this.state.isModalVisible}>
          <TouchableWithoutFeedback onPress={() => this._hideModal()}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableWithoutFeedback>
                <View style={global([globalBackgroundColors.white, { width: 350, height: 500 }])}>
                  <Container style={global(globalBackgroundColors.white)}>
                    <Content padder scrollEnabled={false}>
                      <Tabs
                        initialPage={0}
                        tabBarUnderlineStyle={global(globalBackgroundColors.calm)}
                        selectedStyle={global(globalColors.calm)}
                      >
                        <Tab
                          heading={<TabHeading style={global(globalBackgroundColors.white)}>
                            <Text style={global([globalColors.royal, { fontSize: 18 }])}>
                              bank account
                            </Text>
                          </TabHeading>}
                        >
                          <Text style={global([globalColors.royal,
                            { marginTop: 10, marginBottom: 10, fontSize: 12, fontWeight: 'bold' }])}
                          >
                            account type
                          </Text>
                          <RadioForm
                            formHorizontal
                            radio_props={radio_props}
                            initial={0}
                            buttonColor={'#00074D'}
                            buttonSize={7}
                            buttonOuterSize={20}
                            onPress={(value) => { this.setState({ value }); }}
                            labelStyle={global(globalColors.royal)}
                          />
                          <Text style={global([globalColors.royal,
                            { marginTop: 10, fontSize: 12, fontWeight: 'bold' }])}
                          >
                            routing number
                          </Text>
                          <Input
                            placeholder="222222226"
                            placeholderTextColor="#ddd"
                            style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1 }}
                            onChangeText={text => this.setState({ password: text })}
                          />
                          <Text style={global([globalColors.royal,
                            { marginTop: 10, fontSize: 12, fontWeight: 'bold' }])}
                          >
                            account number
                          </Text>
                          <Input
                            placeholder="123456789"
                            placeholderTextColor="#ddd"
                            style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1, marginBottom: 10 }}
                            onChangeText={text => this.setState({ password2: text })}
                          />
                          <Input
                            placeholder="re-enter account number"
                            placeholderTextColor="#ddd"
                            style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1 }}
                            onChangeText={text => this.setState({ password2: text })}
                          />
                          <Item style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0 }}>
                            <Text style={global([globalColors.royal,
                              { marginTop: 10, fontSize: 12, fontWeight: 'bold' }])}
                            >
                              account name
                            </Text>
                            <Text style={global([globalColors.royal,
                              { marginTop: 10, fontSize: 12 }])}
                            >
                              (optional)
                            </Text>
                          </Item>
                          <Input
                            placeholder="my checking account"
                            placeholderTextColor="#ddd"
                            style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1 }}
                            onChangeText={text => this.setState({ password2: text })}
                          />
                          <Button
                            full
                            style={global([globalBackgroundColors.calm, { marginTop: 20 }])}
                            onPress={() => signUp()}
                          >
                            <Text style={global([globalColors.white, { fontSize: 20 }])}>add account</Text>
                          </Button>
                        </Tab>
                        <Tab
                          heading={<TabHeading style={global(globalBackgroundColors.white)}>
                            <Text style={global([globalColors.royal, { fontSize: 18 }])}>
                              credit card
                            </Text>
                          </TabHeading>}
                        >
                          <Item style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0 }}>
                            <Button
                              style={global([globalBackgroundColors.lightgrey,
                                { marginTop: 20, width: 70, height: 45 }])}
                              onPress={() => signUp()}
                            >
                              <Text>visa</Text>
                            </Button>
                            <Button
                              style={global([globalBackgroundColors.lightgrey,
                                { marginTop: 20, width: 70, height: 45 }])}
                              onPress={() => signUp()}
                            >
                              <Text>mastercard</Text>
                            </Button>
                            <Button
                              style={global([globalBackgroundColors.lightgrey,
                                { marginTop: 20, width: 70, height: 45 }])}
                              onPress={() => signUp()}
                            >
                              <Text>maestro</Text>
                            </Button>
                            <Button
                              style={global([globalBackgroundColors.lightgrey,
                                { marginTop: 20, width: 70, height: 45 }])}
                              onPress={() => signUp()}
                            >
                              <Text>paypal</Text>
                            </Button>
                          </Item>
                          <Text style={global([globalColors.royal,
                            { marginTop: 25, fontSize: 12, fontWeight: 'bold' }])}
                          >
                            card number
                          </Text>
                          <Input
                            placeholder="4111-1111-1111-1111"
                            placeholderTextColor="#ddd"
                            style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1 }}
                            onChangeText={text => this.setState({ password: text })}
                          />
                          <Item style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0 }}>
                            <Text style={global([globalColors.royal,
                              { marginTop: 20, fontSize: 12, fontWeight: 'bold' }])}
                            >
                              expire date
                            </Text>
                            <Body>
                              {/* TODO figure out how to alighn text correctly without need for spaces */}
                              <Text style={global([globalColors.royal,
                                { marginTop: 20, fontSize: 12, fontWeight: 'bold', textAlign: 'left' }])}
                              >
                                security code
                              </Text>
                            </Body>
                          </Item>
                          <Item style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0 }}>
                            <Input
                              placeholder="07/2017"
                              placeholderTextColor="#ddd"
                              style={{ textAlign: 'center',
                                textAlignVertical: 'center',
                                borderWidth: 1,
                                marginBottom: 10,
                                marginRight: 7 }}
                              onChangeText={text => this.setState({ password2: text })}
                            />
                            <Input
                              placeholder="***"
                              placeholderTextColor="#ddd"
                              style={{ textAlign: 'center',
                                textAlignVertical: 'center',
                                borderWidth: 1,
                                marginBottom: 10,
                                marginLeft: 7 }}
                              onChangeText={text => this.setState({ password2: text })}
                            />
                          </Item>
                          <Text style={global([globalColors.royal,
                            { marginTop: 10, fontSize: 12, fontWeight: 'bold' }])}
                          >
                            name on card
                          </Text>
                          <Input
                            style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1 }}
                            onChangeText={text => this.setState({ password2: text })}
                          />
                          <Button
                            full
                            style={global([globalBackgroundColors.calm, { marginTop: 30 }])}
                            onPress={() => signUp()}
                          >
                            <Text style={global([globalColors.white, { fontSize: 20 }])}>add card</Text>
                          </Button>
                        </Tab>
                      </Tabs>
                    </Content>
                  </Container>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Container style={global(globalBackgroundColors.white)}>
          <Content padder>
            <Header style={global([
              globalBackgroundColors.white, {
                paddingTop: 60,
                borderBottomWidth: 0,
              }])}
            >
              <Left style={{ flexDirection: 'row', flex: 1 }}>
                <Thumbnail
                  style={{ width: 90, height: 90, borderWidth: 1, borderRadius: 45 }}
                  source={defaultAvatar}
                />
                <Button
                  style={global([globalBackgroundColors.calm,
                    { height: 30, width: 30, marginTop: 50, borderRadius: 15 }])}
                >
                  <Icon
                    name="camera"
                    style={global([globalColors.white, { fontSize: 15 }])}
                  />
                </Button>
              </Left>
              <Right>
                <Button
                  full
                  style={global([globalBackgroundColors.red, { width: 120, height: 30, borderRadius: 5 }])}
                  onPress={() => navigate('Logout')}
                >
                  <Text style={global([globalColors.white, { fontSize: 16 }])}>
                  logout
                  </Text>
                </Button>
              </Right>
            </Header>
            <Text style={global([globalColors.royal, { marginTop: 60, fontSize: 12, fontWeight: 'bold' }])}>name</Text>
            <Input
              placeholder={'Hermione Granger'.toLowerCase()}
              placeholderTextColor="#ddd"
              style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1 }}
              onChangeText={text => this.setState({ email: text })}
            />
            <Text style={global([globalColors.royal, { marginTop: 10, fontSize: 12, fontWeight: 'bold' }])}>email</Text>
            <Input
              placeholder="example@email.com"
              placeholderTextColor="#ddd"
              style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1 }}
              onChangeText={text => this.setState({ password: text })}
            />
            <Text style={global([globalColors.royal,
              { marginTop: 10, fontSize: 12, fontWeight: 'bold' }])}
            >
              password
            </Text>
            <Input
              secureTextEntry
              placeholder="**********"
              placeholderTextColor="#ddd"
              style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1 }}
              onChangeText={text => this.setState({ password2: text })}
            />
            <Text style={global([globalColors.royal,
              { marginTop: 10, fontSize: 12, fontWeight: 'bold' }])}
            >
              confirm password
            </Text>
            <Input
              secureTextEntry
              placeholder="**********"
              placeholderTextColor="#ddd"
              style={{ textAlign: 'center', textAlignVertical: 'center', borderWidth: 1 }}
              onChangeText={text => this.setState({ password2: text })}
            />
            <Button
              full
              style={global([globalBackgroundColors.grey, { marginTop: 10 }])}
              onPress={() => navigate('MyGroups')}
            >
              <Text style={global([globalColors.white, { fontSize: 20 }])}>update</Text>
            </Button>
            <Item style={{ borderBottomWidth: 0 }}>
              <Left>
                <Text
                  numberOfLines={0}
                  style={global([globalColors.royal,
                    { marginTop: 25, fontSize: 20 }])}
                >
                  bank accounts & credit cards
                </Text>
              </Left>
              <Button
                full
                style={global([globalBackgroundColors.calm, { width: 55, height: 30, marginTop: 20, borderRadius: 5 }])}
                onPress={() => this._showModal()}
              >
                <Text style={global([globalColors.white, { fontSize: 12 }])}>add</Text>
              </Button>
            </Item>
            <List>
              <ListItem>
                <Left>
                  <Button
                    disabled
                    style={global([globalBackgroundColors.white, globalBorderColors.calm,
                      { width: 60, height: 30, borderWidth: 1 }])}
                  >
                    <Icon
                      name="camera"
                      style={global([globalColors.royal,
                        { backgroundColor: 'rgba(52, 52, 52, 0)' }])}
                    />
                  </Button>
                  <Text style={global([globalColors.royal, { marginTop: 5, fontSize: 16 }])}>   bank of america</Text>
                </Left>
                <Button
                  full
                  style={global([globalBackgroundColors.white, globalBorderColors.red,
                    { width: 60, height: 30, borderWidth: 1, borderRadius: 15 }])}
                  onPress={() => navigate('MyGroups')}
                >
                  <Text style={global([globalColors.red, { fontSize: 16 }])}>X</Text>
                </Button>
              </ListItem>
              <ListItem>
                <Left>
                  <Button
                    disabled
                    style={global([globalBackgroundColors.white, globalBorderColors.calm,
                      { width: 60, height: 30, borderWidth: 1 }])}
                  >
                    <Icon
                      name="camera"
                      style={global([globalColors.royal,
                        { backgroundColor: 'rgba(52, 52, 52, 0)' }])}
                    />
                  </Button>
                  <Text style={global([globalColors.royal,
                    { marginTop: 5, fontSize: 16 }])}
                  >
                    XXXX-XXXX-XXXX-2572
                  </Text>
                </Left>
                <Button
                  full
                  style={global([globalBackgroundColors.white, globalBorderColors.red,
                    { width: 60, height: 30, borderWidth: 1, borderRadius: 15 }])}
                  onPress={() => navigate('MyGroups')}
                >
                  <Text style={global([globalColors.red, { fontSize: 16 }])}>X</Text>
                </Button>
              </ListItem>
              <ListItem style={{ borderBottomWidth: 0 }}>
                <Left>
                  <Button
                    disabled
                    style={global([globalBackgroundColors.white, globalBorderColors.calm,
                      { width: 60, height: 30, borderWidth: 1 }])}
                  >
                    <Icon
                      name="camera"
                      style={global([globalColors.royal,
                        { backgroundColor: 'rgba(52, 52, 52, 0)' }])}
                    />
                  </Button>
                  <Text style={global([globalColors.royal,
                    { marginTop: 5, fontSize: 16 }])}
                  >
                    XXXX-XXXX-XXXX-8970
                  </Text>
                </Left>
                <Button
                  full
                  style={global([globalBackgroundColors.white, globalBorderColors.red,
                    { width: 60, height: 30, borderWidth: 1, borderRadius: 15 }])}
                  onPress={() => navigate('MyGroups')}
                >
                  <Text style={global([globalColors.red, { fontSize: 16 }])}>X</Text>
                </Button>
              </ListItem>
            </List>
            <Item style={{ flex: 0.75, justifyContent: 'center', borderBottomWidth: 0 }}>
              <Button
                full
                style={global([globalBackgroundColors.white, globalBorderColors.red,
                  { marginBottom: 10, height: 30, borderWidth: 1, borderRadius: 10 }])}
                onPress={() => navigate('MyGroups')}
              >
                <Text style={global([globalColors.red, { fontSize: 16 }])}>deactivate grink account</Text>
              </Button>
            </Item>
          </Content>
        </Container>
      </View>
    );
  }
}
