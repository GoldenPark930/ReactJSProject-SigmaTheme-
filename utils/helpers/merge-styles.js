import { StyleSheet } from 'react-native';

export default (...styleSheets) => StyleSheet.flatten(styleSheets);
