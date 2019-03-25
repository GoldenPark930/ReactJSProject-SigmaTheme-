import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Container } from 'native-base';
import RadioForm from 'react-native-simple-radio-button';

import styles, { PlaceholderTextColor } from './styles';
import { navigationPropTypes } from '../../constants/app/defaults';
import {
  submitSupport,
} from '../../store/actions/user';
import withSafeAreaView from '../../utils/helpers/safe-area-hoc';
import Header from '../../components/NewHeader';
import NavigationService from '../../utils/helpers/navigation-service';

const { func } = PropTypes;

class GetHelp extends React.Component {
  static propTypes = {
    submitSupport: func.isRequired,
    ...navigationPropTypes(PropTypes),
  }

  constructor(props) {
    super(props);
    this.state = {
      messageType: 0,
      message: 'help',
    };
  }

  onSendButtonPress = () => {
    const { navigate } = this.props.navigation;
    const { submitSupport } = this.props;
    const { messageType, message } = this.state;
    submitSupport(
      messageType,
      message,
      () => {
        NavigationService.navigateWithDebounce('GetHelpThankYou');
      },
    );
  }
  render() {
    const radioProps = [
      { label: 'Suggest feature', value: 'suggest feature', color: '#00074D' },
      { label: 'Help', value: 'help', color: '#00074D' },
      { label: 'Report bug', value: 'report bug', color: '#00074D' },
    ];
    return (
      <Container>
        <Header
          title="Get Help"
          leftActionIcon="ios-menu-outline"
          leftAction={() => this.props.navigation.navigate('DrawerOpen')}
        />
        <View style={styles.globalWrapper}>
          <View style={styles.contentWrapper}>
            <View style={styles.componentWrapper}>
              <View style={styles.innerWrapper}>
                <Text style={styles.blockLabel}>
                Message Type
                </Text>
                <RadioForm
                  radio_props={radioProps}
                  initial={0}
                  buttonColor={'#00074D'}
                  buttonSize={7}
                  buttonOuterSize={20}
                  onPress={(messageType) => { this.setState({ messageType }); }}
                  style={styles.radioForm}
                />
                <TextInput
                  style={styles.input}
                  multiline
                  onChangeText={message => this.setState({ message })}
                  placeholder="Message"
                  placeholderTextColor={PlaceholderTextColor}
                />
                <TouchableOpacity onPress={this.onSendButtonPress}>
                  <View style={[styles.button, styles.buttonActive]}>
                    <Text style={styles.buttonLabel}>
                    Send Message
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

      </Container>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    submitSupport,
  }, dispatch);

const withSafeArea = withSafeAreaView(GetHelp);

export default connect(null, mapDispatchToProps)(withSafeArea);
