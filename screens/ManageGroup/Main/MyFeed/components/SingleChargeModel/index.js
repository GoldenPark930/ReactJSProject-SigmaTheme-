import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import ParsedText from './components/ParsedText';
import Button from './components/Button';
import Currency from '../../../../../../components/currency';
import { BLACK } from '../../../../../../constants/colors';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | `Notifications` screen
 |
 | Single notification model representation
 |------------------------------------------------------------------------------
 */

const SingleChargeModel = ({ data, onPress, acceptedChargeId, acceptChargesInProgress }) => (
  <View style={styles.mainWrapper}>
    <View style={styles.mainContainer}>
      <Image
        style={styles.image}
        source={{ uri: data.chargeRequest.grinkUser.imageUrl }}
      />

      <View style={styles.descriptionContainer}>
        <ParsedText>
          {`${data.chargeRequest.grinkUser.firstName} charged for ${data.chargeRequest.description}`}
        </ParsedText>

        <Text style={styles.time}>
          {moment(data.chargeRequest.creationDate).fromNow()}
        </Text>
      </View>

      { acceptedChargeId === data.id && (
        <ActivityIndicator
          style={styles.indicator}
          animating={acceptChargesInProgress}
          size="small"
          color={BLACK}
        />
      )}
    </View>

    <View style={styles.chargeBottom}>
      <Button
        type={data.status}
        onPress={action => onPress(action)}
      />

      <View style={styles.amountConatiner} >
        <Text style={styles.dueIn}>{data.dueDate ? 'Due in 4 days' : ''}</Text>
        <Currency
          amount={data.amount.toFixed(2)}
          numberSize={19}
        />
      </View>
    </View>
  </View>

);

const { string, number, bool, shape, oneOfType, func } = PropTypes;

SingleChargeModel.propTypes = {
  acceptedChargeId: number.isRequired,
  acceptChargesInProgress: bool.isRequired,
  onPress: func.isRequired,
  data: shape({
    id: number.isRequired,
    read: bool.isRequired,
    message: string.isRequired,
    deliveryType: string.isRequired,
    notificationType: string.isRequired,
    createdAt: oneOfType([string, number]).isRequired,
    destinationImage: string.isRequired,
  }).isRequired,
};

export default SingleChargeModel;
