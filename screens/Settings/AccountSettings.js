import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {
  Content,
  Left,
  Right,
  Icon,
  List,
  ListItem,
} from 'native-base';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import globalColors from '../../GlobalCss/globalColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';
import {
  selectUserData,
} from '../../store/selectors/user';
import withSafeAreaView from '../../utils/helpers/safe-area-hoc';
import Header from '../../components/NewHeader';
import NavigationService from '../../utils/helpers/navigation-service';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};
const { number, string, oneOfType, shape } = PropTypes;

class AccountSettings extends React.Component {
  static propTypes = {
    // Data
    userData: shape({
      id: oneOfType([number, string]).isRequired,
      status: string.isRequired,
    }).isRequired,

  };

  render() {
    const { status } = this.props.userData;

    // TODO fix padding on list and udnerline on listitems to look like design
    // TODO fix text so all imline
    return (
      <View style={{ flex: 1 }}>
         <Header
          title="Account Settings"
          leftActionIcon="ios-arrow-back"
          leftAction={() => {
            this.props.navigation.goBack(null);
          }}
        />
        <ScrollView style={global(globalBackgroundColors.white)}>
          <Content padder>
            <List>
              {/* <ListItem style={{ borderBottomWidth: 0 }}> */}
              {/* <Text style={global([globalColors.royal, { fontSize: 14, fontWeight: 'bold' }])}>preferences</Text> */}
              {/* </ListItem> */}
              <ListItem style={{ height: 40 }} onPress={() => NavigationService.navigateWithDebounce('DeactivateAccount')}>
                <Left>
                  <Icon name="person" style={global([globalColors.royal, { fontSize: 25 }])} />
                  <Text style={global([globalColors.royal, { marginTop: 5, fontSize: 14 }])}>   Deactivate Account</Text>
                </Left>
                <Right>
                  <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome>
                </Right>
              </ListItem>
              {status === 'retry' ?
                <ListItem style={{ height: 40 }} onPress={() => NavigationService.navigateWithDebounce('VerifyMyAccount')}>
                  <Left>
                    <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.archive}</FontAwesome>
                    <Text style={global([globalColors.royal, { fontSize: 14 }])}>    Verify My Account</Text>
                  </Left>
                  <Right>
                    <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome>
                  </Right>
                </ListItem>
                : null}
              {status === 'document' ?
                <ListItem style={{ height: 40 }} onPress={() => NavigationService.navigateWithDebounce('UploadVerificationDocument')}>
                  <Left>
                    <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.archive}</FontAwesome>
                    <Text style={global([globalColors.royal, { fontSize: 14 }])}>    Upload Verification Document</Text>
                  </Left>
                  <Right>
                    <FontAwesome style={global([globalColors.royal, { fontSize: 15 }])}>{Icons.chevronRight}</FontAwesome>
                  </Right>
                </ListItem>
                : null}
            </List>
          </Content>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  userData: selectUserData(state),
});


const withSafeArea = withSafeAreaView(AccountSettings);

export default connect(mapStateToProps)(withSafeArea);
