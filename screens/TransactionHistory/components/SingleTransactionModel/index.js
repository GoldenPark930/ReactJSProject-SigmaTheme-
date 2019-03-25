import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, Text, Image } from 'react-native';

import { getImageUrl } from '../../../../utils/ajax/api/common';
import ParsedText from './components/ParsedText';
// import Button from './components/Button';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | `TransactionHistory` screen
 |
 | Single transaction model representation
 |------------------------------------------------------------------------------
 */

const SingleTransactionModel = ({ userData, data }) => { // we need to leave onPress for like & comment
  let parsedText = '';
  let amountStyle = styles.positiveAmount;
  let showMinus = '+';
  let imageUri = getImageUrl(userData.image);
  if (data.group) {
    imageUri = data.group.imageUrl;
  }
  switch (data.action) {
    case 'paid': //you paid someone
      parsedText = `You paid ${data.user && data.user.id != userData.id ? `${data.user.firstName} ${data.user.lastName}` : `yourself`} for ${data.description} in ${data.group && data.group.name}`;
      amountStyle = styles.negativeAmount;
      showMinus = '-';
      break;
    case 'withdrawal':
      parsedText = data.text;
      break;
    case 'received': //some is paying you
      parsedText = data.text;
      imageUri = data.user.imageUrl;
      break;
    case 'transfer group balance':
      parsedText = `You transferred a balance from ${data.group && data.group.name} to your Payclub account`;
      break;
    default:
      parsedText = data.text ? data.text : '';
      break;
  }
  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.image}
        source={{ uri: imageUri }}
      />

      <View style={styles.descriptionContainer}>
        <ParsedText>
          {parsedText}
        </ParsedText>

        <Text style={styles.time}>
          {moment(data.date).fromNow()}
        </Text>

        {/* <Button type={data.status} onPress={action => onPress(action)} /> 
        */}
      </View>

      <View style={styles.amountConatiner} >
        <Text style={amountStyle}> {showMinus}${data.amount.toFixed(2)}</Text>
      </View>
    </View>
  );
};
const { string, number, shape } = PropTypes;

SingleTransactionModel.propTypes = {
//  onPress: func.isRequired,
  data: shape({
    action: string.isRequired, // "paid","withdrawl","transfer group balance"
    amount: number.isRequired,
    description: string.isRequired, // "Tacos"
    image: number.isRequired, // 16
    text: string, // You paid Alex Grodnik for Tacos in Paco
  }).isRequired,
  userData: shape({
    id: number.isRequired,
  }).isRequired,
  // user: {firstName,lastName}
  // group: {name} Paco
};

export default SingleTransactionModel;
