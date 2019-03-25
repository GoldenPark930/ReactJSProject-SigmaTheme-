import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import {
  Content,
  Left,
  Right,
  List,
  ListItem,
} from 'native-base';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import { navigationPropTypes } from '../../../constants/app/defaults';
import globalColors from '../../../GlobalCss/globalColors';
import globalBackgroundColors from '../../../GlobalCss/globalBackgroundColors';
import Header from '../../../components/NewHeader';

const globalStyles = styleSheet => StyleSheet.flatten(styleSheet);

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

class LegalView extends Component {
  static propTypes = {
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  render() {
    // TODO fix camera icon on profile picture
    // TODO fix padding on list and underline on list items to look like design

    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Legal"
          leftActionIcon="ios-arrow-back"
          leftAction={() => {
            this.props.navigation.goBack(null);
          }}
        />
        <View style={{ flex: 1 }}>
          <ScrollView style={global(globalBackgroundColors.white)}>
            <Content padder>
              <List>
                <ListItem style={{ height: 40 }} onPress={() => Linking.openURL('https://www.payclub.co/terms-of-service/')}>
                  <Left>
                    <FontAwesome style={global([globalColors.royal, { fontSize: 18, top: 4 }])}>{Icons.fileTextO}</FontAwesome>
                    <Text style={global([globalColors.royal, { marginTop: 5, fontSize: 14 }])}>    Payclub Terms of Service</Text>
                  </Left>
                  <Right>
                    <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome>
                  </Right>
                </ListItem>
                <ListItem style={{ height: 40 }} onPress={() => Linking.openURL('https://www.payclub.co/privacy-policy/')}>
                  <Left>
                    <FontAwesome style={global([globalColors.royal, { fontSize: 18 }])}>{Icons.fileTextO}</FontAwesome>
                    <Text style={global([globalColors.royal, { fontSize: 14 }])}>    Payclub Privacy Policy</Text>
                  </Left>
                  <Right>
                    <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome>
                  </Right>
                </ListItem>
                <ListItem style={{ height: 40 }} onPress={() => Linking.openURL('https://www.dwolla.com/legal/tos/')}>
                  <Left>
                    <FontAwesome style={global([globalColors.royal, { fontSize: 18 }])}>{Icons.fileTextO}</FontAwesome>
                    <Text style={global([globalColors.royal, { fontSize: 14 }])}>    Dwolla Terms of Service</Text>
                  </Left>
                  <Right>
                    <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome>
                  </Right>
                </ListItem>
                <ListItem style={{ height: 40 }} onPress={() => Linking.openURL('https://www.dwolla.com/legal/privacy/')}>
                  <Left>
                    <FontAwesome style={global([globalColors.royal, { fontSize: 18 }])}>{Icons.fileTextO}</FontAwesome>
                    <Text style={global([globalColors.royal, { fontSize: 14 }])}>    Dwolla Privacy Policy</Text>
                  </Left>
                  <Right>
                    <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome>
                  </Right>
                </ListItem>
              </List>
            </Content>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default LegalView;
