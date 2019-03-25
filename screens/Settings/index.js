import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {
  Content,
  Left,
  Right,
  Icon,
  Button,
  List,
  ListItem,
} from 'native-base';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import { APP_VERSION } from '../../constants/app';
import globalColors from '../../GlobalCss/globalColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';
import Header from '../../components/NewHeader';
import withSafeAreaView from '../../utils/helpers/safe-area-hoc';
import NavigationService from '../../utils/helpers/navigation-service';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

class Settings extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Settings"
          leftActionIcon="ios-menu-outline"
          leftAction={() => this.props.navigation.navigate('DrawerOpen')}
        />
        <ScrollView style={global(globalBackgroundColors.white)}>
          <Content padder>
            <List>
              <ListItem style={{ borderBottomWidth: 0 }}>
                <Text style={global([globalColors.royal, { fontSize: 14, fontWeight: 'bold' }])}>Preferences</Text>
              </ListItem>
              <ListItem style={{ height: 40 }} onPress={() => NavigationService.navigateWithDebounce('EditProfile', { parentRoute: 'Settings' })}>
                <Left>
                  <Icon name="person" style={global([globalColors.royal, { fontSize: 25 }])} />
                  <Text style={global([globalColors.royal, { marginTop: 5, fontSize: 14 }])}>   Edit Profile</Text>
                </Left>
                <Right>
                  <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome>
                </Right>
              </ListItem>
              <ListItem style={{ height: 40 }} onPress={() => NavigationService.navigateWithDebounce('BanksAndCards', { parentRoute: 'Settings' })}>
                <Left>
                  <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.university}</FontAwesome>
                  <Text style={global([globalColors.royal, { fontSize: 14 }])}>    Bank Accounts</Text>
                </Left>
                <Right>
                  <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome>
                </Right>
              </ListItem>
              <ListItem style={{ height: 40 }} onPress={() => NavigationService.navigateWithDebounce('AccountSettings')}>
                <Left>
                  <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.vcard}</FontAwesome>
                  <Text style={global([globalColors.royal, { fontSize: 14 }])}>    Account Settings</Text>
                </Left>
                <Right>
                  <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome>
                </Right>
              </ListItem>
              <ListItem style={{ height: 40 }} onPress={() => NavigationService.navigateWithDebounce('ArchivedGroups')}>
                <Left>
                  <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.archive}</FontAwesome>
                  <Text style={global([globalColors.royal, { fontSize: 14 }])}>    Archived Clubs</Text>
                </Left>
                <Right>
                  <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome>
                </Right>
              </ListItem>
              <ListItem style={{ borderBottomWidth: 0 }}>
                <Text style={global([globalColors.royal, { fontSize: 14, fontWeight: 'bold' }])}>Information</Text>
              </ListItem>
              <ListItem style={{ height: 40 }} onPress={() => NavigationService.navigateWithDebounce('Legal')}>
                <Left>
                  <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.gavel}</FontAwesome>
                  <Text style={global([globalColors.royal, { fontSize: 14 }])}>    Legal</Text>
                </Left>
                <Right>
                  <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome>
                </Right>
              </ListItem>
              <ListItem style={{ height: 40 }} onPress={() => NavigationService.navigateWithDebounce('GetHelp')}>
                <Left>
                  <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.envelopeO}</FontAwesome>
                  <Text style={global([globalColors.royal, { fontSize: 14 }])}>    Help & Feedback</Text>
                </Left>
                <Right>
                  <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome>
                </Right>
              </ListItem>
              {/* <ListItem style={{ height: 40 }} onPress={() => navigate("NotificationsSettings")}> */}
              {/* <Left> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.bellO}</FontAwesome> */}
              {/* <Text style={global([globalColors.royal, { fontSize: 14 }])}>   notifications</Text> */}
              {/* </Left> */}
              {/* <Right> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome> */}
              {/* </Right> */}
              {/* </ListItem> */}
              {/* <ListItem style={{ height: 40 }} onPress={() => navigate("ChangePhone")}> */}
              {/* <Left> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.mobile}</FontAwesome> */}
              {/* <Text style={global([globalColors.royal, { fontSize: 14 }])}>   change phone number</Text> */}
              {/* </Left> */}
              {/* <Right> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome> */}
              {/* </Right> */}
              {/* </ListItem> */}
              {/* <ListItem style={{ height: 40 }} onPress={() => navigate("TouchIDAndPIN")}> */}
              {/* <Left> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.unlock}</FontAwesome> */}
              {/* <Text style={global([globalColors.royal, { fontSize: 14 }])}>   touch id & pin</Text> */}
              {/* </Left> */}
              {/* <Right> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome> */}
              {/* </Right> */}
              {/* </ListItem> */}
              {/* <ListItem style={{ borderBottomWidth: 0 }} onPress={() => navigate("ChangePassword")}> */}
              {/* <Left> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.lock}</FontAwesome> */}
              {/* <Text style={global([globalColors.royal, { fontSize: 14 }])}>   change password</Text> */}
              {/* </Left> */}
              {/* <Right> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome> */}
              {/* </Right> */}
              {/* </ListItem> */}
              {/* </List> */}
              {/* <List> */}
              {/* <ListItem style={{ borderBottomWidth: 0 }}> */}
              {/* <Text style={global([globalColors.royal, { fontSize: 14, fontWeight: 'bold' }])}>grink</Text> */}
              {/* </ListItem> */}
              {/* <ListItem style={{ height: 40 }}> */}
              {/* <Left> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.fileTextO}</FontAwesome> */}
              {/* <Text style={global([globalColors.royal, { fontSize: 14 }])}>   legal</Text> */}
              {/* </Left> */}
              {/* <Right> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome> */}
              {/* </Right> */}
              {/* </ListItem> */}
              {/* <ListItem style={{ height: 40 }}> */}
              {/* <Left> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.questionCircleO}</FontAwesome> */}
              {/* <Text style={global([globalColors.royal, { fontSize: 14 }])}>   faqs</Text> */}
              {/* </Left> */}
              {/* <Right> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome> */}
              {/* </Right> */}
              {/* </ListItem> */}
              {/* <ListItem style={{ height: 40 }}> */}
              {/* <Left> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.envelopeO}</FontAwesome> */}
              {/* <Text style={global([globalColors.royal, { fontSize: 14 }])}>   send feedback</Text> */}
              {/* </Left> */}
              {/* <Right> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome> */}
              {/* </Right> */}
              {/* </ListItem> */}
              {/* <ListItem style={{ height: 40 }}> */}
              {/* <Left> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.starO}</FontAwesome> */}
              {/* <Text style={global([globalColors.royal, { fontSize: 14 }])}>   rate grink</Text> */}
              {/* </Left> */}
              {/* <Right> */}
              {/* <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome> */}
              {/* </Right> */}
              {/* </ListItem> */}
            </List>
            <Button
              full
              style={global([globalBackgroundColors.calm, { marginTop: 25, marginLeft: 15, marginBottom: 20, height: 40, width: 150, borderRadius: 3 }])}
              onPress={() => NavigationService.navigateWithDebounce('Logout')}
            >
              <Text style={global([globalColors.white, { fontSize: 14 }])}>Sign Out of Payclub</Text>
            </Button>
            <Text style={global([globalColors.royal, { marginLeft: 15, fontSize: 12 }])}>Version {APP_VERSION}</Text>
          </Content>
        </ScrollView>
      </View>
    );
  }
}


export default withSafeAreaView(Settings);
