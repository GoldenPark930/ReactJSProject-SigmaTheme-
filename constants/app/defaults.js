import { StyleSheet } from 'react-native';

export const DEFAULT_AVATAR_URL = 'https://www.grink.co/avatar.png';
export const DEFAULT_LIMIT = 25;
export const PERSISTENT_PREFIX = '__PERSISTENT__';

export const navigationPropTypes = ({ shape, func, object }) => ({
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
    setParams: func.isRequired,
    state: object.isRequired,
  }).isRequired,
});

export const TemporaryAlertProps = [
  'Coming soon',
  'This feature is coming soon! Stay tuned and watch for updates!',
  [{ text: 'close' }],
];

export const StackNavigatorStyles = StyleSheet.create({
  cardStyle: {
    shadowColor: '#fff',
    shadowOpacity: 0,
    shadowRadius: 0,
  },
});
