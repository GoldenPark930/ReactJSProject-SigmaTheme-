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

const SingleBankModel = ({ data, onPress, color }) => (
  <TouchableWithoutFeedback onPress={() => onPress(data)}>
    <View
      key={data.id}
      style={styles.bankInfoWrapper}
    >
      <View style={styles.bankInfoDescription}>

        <Text style={[styles.bankName, { color }]}>
          {data.bankName} ** {data.mask}
        </Text>
      </View>

      <View style={styles.arrowButtonWrapper}>
        <FontAwesome style={[styles.arrowButton, { color }]}>
          {Icons.chevronRight}
        </FontAwesome>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const { string, number, func, shape, oneOfType } = PropTypes;

SingleBankModel.propTypes = {
  data: shape({
    id: oneOfType([number, string]).isRequired,
    name: string.isRequired,
  }).isRequired,
  onPress: func,
  color: string,
};

SingleBankModel.defaultProps = {
  onPress: () => {},
  color: '#000',
};

export default SingleBankModel;
