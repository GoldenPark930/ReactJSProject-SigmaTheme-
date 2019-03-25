import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Image, Text } from 'react-native';
import { Button, Content } from 'native-base';
import { NavigationActions } from 'react-navigation';

import { getLocalImage } from 'src/utils/helpers';
import { navigationPropTypes } from 'src/constants/app/defaults';
import { getUserData } from 'src/store/actions/user';
import styles from './styles';

const { func } = PropTypes;

class CongratulationScreen extends Component {
  static propTypes = {
    // Functions
    getUserData: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  static navigationOptions = () => {
    const { header, common } = styles;
  };

  /*
  |-----------------------------------------------------------------------------
  | Event handlers
  |-----------------------------------------------------------------------------
  */

  nextPressed = () => {
    this.props.getUserData();
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'MainApp' }),
      ],
    }));
  };

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  renderContent = () => {
    const { content } = styles;
    return (
      <Content style={content.wrapper}>

        <Text style={content.timeToCollect}>{'It\'s time to start collecting!'}</Text>
        <Button full style={content.buttonContainer} onPress={this.nextPressed}>
          <Text style={content.buttonText}>CONTINUE</Text>
        </Button>
      </Content>
    );
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const { global, content } = styles;

    return (
      <View style={global.wrapper}>
        <Text style={content.title}>You are now a member of</Text>
        <Image resizeMode="contain" style={content.imageContainer} source={getLocalImage('payClubLogo')} />
        {this.renderContent()}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserData }, dispatch);

export default connect(null, mapDispatchToProps)(CongratulationScreen);
