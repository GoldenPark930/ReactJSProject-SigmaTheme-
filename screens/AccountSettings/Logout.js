import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import globalColors from '../../GlobalCss/globalColors';
import globalBackgroundColors from '../../GlobalCss/globalBackgroundColors';

global = (styleSheet) => {
  const newFormat = StyleSheet.flatten(styleSheet);
  return newFormat;
};

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Container>
          <Container style={global(globalBackgroundColors.white)}>
            <View style={{ marginTop: 150, alignItems: 'center', flex: 1, flexDirection: 'column' }}>
              <Text style={global([globalColors.calm, { textAlign: 'center', fontSize: 20 }])}>
                you have successfully
              </Text>
              <Text style={global([globalColors.calm, { textAlign: 'center', fontSize: 20 }])}>
                logged out
              </Text>
            </View>
            <View style={{ marginTop: 150, alignItems: 'center', flex: 1, flexDirection: 'column' }}>
              <Text style={global([globalColors.royal, { textAlign: 'center', fontSize: 20 }])}>
                come back soon
              </Text>
              <Text style={global([globalColors.royal, { textAlign: 'center', fontSize: 20 }])}>
                we&lsquo;ll be missing you!!
              </Text>
            </View>
          </Container>
        </Container>
      </View>
    );
  }
}
