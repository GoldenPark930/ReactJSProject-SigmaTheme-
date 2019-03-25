import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {
  Content,
} from 'native-base';

import globalColors from '../../GlobalCss/globalColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';
import withSafeAreaView from '../../utils/helpers/safe-area-hoc';
import Header from '../../components/NewHeader';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

class DeactivateAccount extends React.Component {
  render() {
    const { navigate, goBack } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Deactivate Account"
          leftActionIcon="ios-arrow-back"
          leftAction={() => {
            goBack(null);
          }}
        />
        <ScrollView style={global(globalBackgroundColors.white)}>
          <Content padder>
            <Text style={global([globalColors.royal, { marginLeft: 15, fontSize: 16 }])}>
              Please contact support@payclub.co to deactivate your account. Thanks!
            </Text>
          </Content>
        </ScrollView>
      </View>
    );
  }
}

export default withSafeAreaView(DeactivateAccount);

