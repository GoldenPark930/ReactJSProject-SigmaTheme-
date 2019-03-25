import React from 'react';
import {
  View,
  Text,
  Share,
  StyleSheet,
  ListView,
  Keyboard,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Button,
  Container,
  Left,
  Right,
  Icon,
  Thumbnail,
  Input,
  Item,
} from 'native-base';

import ContactsObject from '../../components/ContactsObject';
import globalColors from '../../GlobalCss/globalColors';
import globalBorderColors from '../../GlobalCss/globalBorderColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';
import withSafeAreaView from '../../utils/helpers/safe-area-hoc';
import Header from '../../components/NewHeader';

const defaultAvatar = require('../../../assets/images/payclub-default-avatar.png');

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

class InviteFriends extends React.Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      ContactsObj: new ContactsObject(),
      fullContacts: [],
      contactsShown: [],
      isLoading: false,
    };
  }

  componentWillMount() {
    this.loadContact(10);
  }

  loadContact() {
    const { ContactsObj } = this.state;
    let intervalId = null;

    const checkIfLoaded = () => {
      const isLoading = ContactsObj.getIsLoading();
      if (!isLoading) {
        const fullContacts = ContactsObj.getContacts();
        this.setState({ ContactsObj, isLoading, fullContacts, contactsShown: fullContacts });
        clearInterval(intervalId);
      }
    };

    ContactsObj.getContactsAsync();
    this.setState({ isLoading: true });
    intervalId = setInterval(checkIfLoaded, 100);
  }

  handleSearch(value) {
    const { fullContacts } = this.state;
    const lowerValue = value.toLowerCase();
    const searchResults = [];
    for (let i = 0; i < fullContacts.length; i++) {
      let n = `${fullContacts[i].givenName} ${fullContacts[i].familyName}`;

      if (fullContacts[i].emailAddresses.length > 0) {
        for (let j = 0; j < fullContacts[i].emailAddresses.length; j++) { n += ` ${fullContacts[i].emailAddresses[j].email}`; }
      }
      if (fullContacts[i].phoneNumbers.length > 0) {
        for (let j = 0; j < fullContacts[i].phoneNumbers.length; j++) { n += ` ${fullContacts[i].phoneNumbers[j].number} ${fullContacts[i].phoneNumbers[j].number.replace(/[^0-9-.]/g, '')}`; }
      }

      n = n.toLowerCase();
      if ((n) && (n.includes(lowerValue))) {
        searchResults.push(fullContacts[i]);
      }
    }
    this.setState({ contactsShown: searchResults });
  }

  handleOnSelect(index) {
    const { contactsShown } = this.state;
    contactsShown[index].selected = !contactsShown[index].selected;
    this.setState({ contactsShown });
    if (contactsShown[index].selected) {
      Share.share({
        title: 'Join Payclub',
        message: `${contactsShown[index].givenName !== null ? contactsShown[index].givenName : ''} ${contactsShown[index].familyName !== null ? `${contactsShown[index].familyName},` : ''} Check out Payclub #JoinThePayclub`,
        url: 'www.payclub.co',
      }, {
        dialogTitle: 'Payclub',
      });
    }
  }

  inviteButton(index) {
    const { contactsShown } = this.state;
    if (contactsShown[index].selected) {
      return (
        <Button
          transparent
          style={global([globalBackgroundColors.white, globalBorderColors.calm,
            { height: 30, width: 70, borderWidth: 1, borderRadius: 5, justifyContent: 'center' }])}
          onPress={() => this.handleOnSelect(index, contactsShown[index])}
        >
          <Text style={global([globalColors.calm, { fontSize: 12 }])}>
            Invited
          </Text>
        </Button>
      );
    }
    return (
      <Button
        transparents
        style={global([globalBackgroundColors.calm,
          { height: 30, width: 70, borderRadius: 5, justifyContent: 'center' }])}
        onPress={() => this.handleOnSelect(index)}
      >
        <Text style={global([globalColors.white, { fontSize: 12 }])}>
          Invite
        </Text>
      </Button>
    );
  }

  contactList() {
    const { contactsShown, isLoading } = this.state;
    if (!isLoading && contactsShown.length <= 0) {
      return (
        <Text style={global([globalColors.mediumgrey, { textAlign: 'center' }])}>
           Sorry, no results found. Try again.
        </Text>
      );
    }
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource.cloneWithRows(contactsShown)}
        renderRow={(contact, rosectionId, rowId) => (
          <Item style={{ padding: 10 }}>
            <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Thumbnail
                circular
                style={{ height: 45, width: 45, borderRadius: 22.5 }}
                source={
                  contact.hasThumbnail ?
                    { uri: contact.thumbnailPath } :
                    defaultAvatar
                }
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={global([globalColors.royal,
                  { fontWeight: 'bold' }])}
                >{`${contact.givenName} ${contact.familyName ? contact.familyName : ''}`}
                </Text>
                <Text style={global([globalColors.mediumgrey, { fontSize: 12 }])}>
                  {contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : null}
                </Text>
              </View>
            </Left>
            <Right>
              {this.inviteButton(rowId)}
            </Right>
          </Item>
        )}
        renderFooter={() => (
          <View style={{ height: 30 }} >
            <ActivityIndicator animating={isLoading} />
          </View>
        )}
      />
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { fullContacts } = this.state;
    const selectedContact = fullContacts.filter(contact => contact.selected);

    const keyboardAvoidingProps = Platform.OS === 'ios' ?
      { behavior: 'padding', keyboardVerticalOffset: 45 } : {};

    return (
      <Container>
        <Header
          title="Invite Friends"
          leftActionIcon="ios-menu-outline"
          leftAction={() => {
            Keyboard.dismiss();
            navigate('DrawerOpen');
          }}
        />
        <View style={global([globalBackgroundColors.white, { flex: 1 }])}>
          <View style={{ padding: 10 }}>
            <Item style={global([globalBorderColors.calm, globalBackgroundColors.white,
              { height: 40, paddingHorizontal: 10, borderWidth: 1, borderRadius: 5 }])}
            >
              <Input
                placeholder="Name, phone or email"
                style={{ fontSize: 14 }}
                onChangeText={value => this.handleSearch(value)}
                value={this.state.token}
              />
              <Icon name="ios-people" />
            </Item>
          </View>
          <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#fff' }}
            contentContainerStyle={global([globalBackgroundColors.white, { flex: 1 }])}
            {...keyboardAvoidingProps}
          >
            {this.contactList()}
          </KeyboardAvoidingView>
        </View>
      </Container>
    );
  }
}

export default withSafeAreaView(InviteFriends);
