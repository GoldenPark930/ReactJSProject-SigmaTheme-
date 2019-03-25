import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Container, Body, Header, Left, Right, Icon, Footer, Thumbnail } from 'native-base';

import { navigationPropTypes } from '../../constants/app/defaults';
import headerStyles from '../../GlobalCss/header-styles';
import styles from './styles';
import { getLocalImage } from '../../utils/helpers';
import NavigationService from '../../utils/helpers/navigation-service';


export default class GetHelpThankYou extends React.Component {
  static propTypes = {
    ...navigationPropTypes(PropTypes),
  }
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={headerStyles.wrapper}>
        <Left style={headerStyles.flexOne}>
          <Button
            transparent
            onPress={() => navigation.navigate('DrawerOpen')}
          >
            <Icon name="menu" style={headerStyles.colorRoyal} />
          </Button>
        </Left>

        <Body style={headerStyles.content}>
          <Text numberOfLines={1} style={headerStyles.text}>
            Get Help
          </Text>
        </Body>
        <Right />
      </Header>
    ),
  });

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <View style={styles.globalWrapper}>
          <View style={styles.contentWrapper}>
            <View style={styles.thankWrapper}>
              <Text style={styles.thankTitle}>
              Thank you!
              </Text>
              <Text style={styles.thankText}>
              We have received
              </Text>
              <Text style={styles.thankText}>
              your message, we&#39;ll be getting
              </Text>
              <Text style={styles.thankText}>
              back to you shortly.
              </Text>
              <TouchableOpacity onPress={() => NavigationService.navigateWithDebounce('MyGroups')}>
                <View style={[styles.thankButton, styles.buttonActive]}>
                  <Text style={styles.buttonLabel}>
                    Go to Home
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}
