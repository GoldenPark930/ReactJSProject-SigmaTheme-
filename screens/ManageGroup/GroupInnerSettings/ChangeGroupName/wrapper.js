import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { navigationPropTypes } from '../../../../constants/app/defaults';
import GroupInnerSettingsChangeGroupNameView from './view';
import styles from './styles';
import Header from '../../../../components/NewHeader';

/**
 |------------------------------------------------------------------------------
 | Group inner settings -> Change group name wrapper
 |
 | Wrapper adds header to the screen
 |------------------------------------------------------------------------------
 */

const GroupInnerSettingsChangeGroupNameWrapper = props => (
  <View style={styles.globalWrapper}>
    <Header
      title="Change Club Name"
      leftActionIcon="ios-arrow-back"
      leftAction={() => {
        props.navigation.goBack(null);
      }}
    />

    <GroupInnerSettingsChangeGroupNameView {...props} />
  </View>
);

GroupInnerSettingsChangeGroupNameWrapper.propTypes = {
  // Navigation
  ...navigationPropTypes(PropTypes),
};

export default GroupInnerSettingsChangeGroupNameWrapper;
