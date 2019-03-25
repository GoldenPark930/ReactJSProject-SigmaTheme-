import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AsyncStorage,
  StatusBar,
  Platform,
} from 'react-native';
import { Sentry } from 'react-native-sentry';
import OneSignal from 'react-native-onesignal';
import { GoogleTagManager } from 'react-native-google-analytics-bridge';

import {
  onesignalIdReceived,
  pushNotificationReceived,
  getNotificationsCount,
} from './store/actions/notifications';
import {
  requestDataLoadingInterval,
  resetDataLoadingInterval,
} from './store/actions/interval';
import { setTokenToAxios } from './common/localStorage';
import { getUserData } from './store/actions/user';
import { checkAllPermission } from './store/actions/permission';
import RootNavigator from './RootNavigator';

const GtmContainerId = Platform.OS === 'ios' ? 'GTM-WPQL5T4' : 'GTM‌-5H4R5JN';

Sentry.config('https://a2b9e656c6f8444ab1711dc6da73cf83:ee6186b89d524a23bc0637442e1f6797@sentry.io/264702').install();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      playerId: null,
      connected: false,
      isReady: false,
    };
  }

  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);

    this.props.checkAllPermission();
  }

  componentDidMount() {
    this.loadStorage();
    GoogleTagManager.openContainerWithId(GtmContainerId);
  }

  componentDidUpdate() {
    const { userId, connected, isReady, playerId } = this.state;

    if (userId && connected && isReady) {
      if (playerId) this.props.onesignalIdReceived(userId, playerId);
    }
  }

  componentWillUnmount() {
    this.props.resetDataLoadingInterval();

    OneSignal.removeEventListener('received');
    OneSignal.removeEventListener('opened');
    OneSignal.removeEventListener('registered');
    OneSignal.removeEventListener('ids');
  }

  onReceived = (notification) => {
    // console.log('onReceived ', 'Notification received: ', notification);
    this.props.pushNotificationReceived(notification);
  }

  onOpened = (openResult) => {
    // console.log('onOpened ', 'openResult: ', openResult);
  }

  onRegistered = (notifData) => {
    // console.log('onRegistered ', 'Device had been registered for push notifications!', notifData);
  }

  onIds = (device) => {
    // console.log('onIds ', 'Device info: ', device);
    this.setState({ playerId: device.userId });
  }


  loadStorage = async () => {
    try {
      const connectedUser = await AsyncStorage.multiGet(['id', 'token']);
      const userId = connectedUser[0][1];
      const token = connectedUser[1][1];

      if (userId !== null && token !== null) {
        setTokenToAxios(token);

        this.props.getUserData(() => {
          this.props.requestDataLoadingInterval();
          this.setState({ connected: true, userId, isReady: true });
        }, () => {
          this.setState({ isReady: true });
        });
      } else {
        this.setState({ isReady: true });
      }
    } catch (error) {
      console.log(error);
    }
  };


  render() {
    const { connected, isReady } = this.state;
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') StatusBar.setBackgroundColor('white');

    if (!isReady) return null;
    return <RootNavigator isLoggedIn={connected} />;
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    pushNotificationReceived,
    getNotificationsCount,
    getUserData,
    checkAllPermission,
    onesignalIdReceived,
    requestDataLoadingInterval,
    resetDataLoadingInterval,
  }, dispatch);

App.propTypes = {
  getUserData: PropTypes.func.isRequired,
  checkAllPermission: PropTypes.func.isRequired,
  onesignalIdReceived: PropTypes.func.isRequired,
  pushNotificationReceived: PropTypes.func.isRequired,
  requestDataLoadingInterval: PropTypes.func.isRequired,
  resetDataLoadingInterval: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
