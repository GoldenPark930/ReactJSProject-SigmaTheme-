import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import CustomIcon from '../../../../../../../constants/fonts/custom_icons';
import styles from './styles';

/**
 |--------------------------------------------------------------------------
 | `Notifications` screen
 |
 | Single notification model representation
 |--------------------------------------------------------------------------
 */

const SingleBankModel = ({ data, onPress }) => (
  <View
    key={data.id}
    style={styles.bankInfoWrapper}
  >
    <View style={styles.bankInfoDescription}>
      <View style={styles.bankIconWrapper}>
        <CustomIcon name="bank" style={styles.bankIcon} />
      </View>

      <Text style={styles.bankName}>
        {data.name}
      </Text>
    </View>

    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.arrowButtonWrapper}>
        <FontAwesome style={styles.arrowButton}>
          {Icons.chevronRight}
        </FontAwesome>
      </View>
    </TouchableWithoutFeedback>
  </View>
);

const { string, number, func, shape, oneOfType } = PropTypes;

SingleBankModel.propTypes = {
  data: shape({
    id: oneOfType([number, string]).isRequired,
    name: string.isRequired,
  }).isRequired,
  onPress: func,
};

SingleBankModel.defaultProps = {
  onPress: () => {},
};

export default SingleBankModel;
