import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Thumbnail, Left, Right } from 'native-base';
import Swipeout from 'react-native-swipeout';
import Currency from '../../../../../../../../components/currency';
import { getImageUrl } from 'src/utils/ajax/api/common';
import { isOwnerOrAdmin, ALL_ROLES } from '../../../../../../../../constants/users/roles';
import { REGULAR } from '../../../../../../../../constants/fonts';

/**
 |------------------------------------------------------------------------------
 | Member -> Members
 |
 | Component
 |------------------------------------------------------------------------------
 */

/*
 |------------------------------------------------------------------------------
 | Styles
 |------------------------------------------------------------------------------
 */

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnailContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  text: {
    color: '#00074D',
    fontSize: 12,
    fontFamily: REGULAR,
  },
});

/*
 |------------------------------------------------------------------------------
 | Component
 |------------------------------------------------------------------------------
 */

formatNumber = (phone) => {
  const phoneTest = new RegExp(/^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/);
  phone = phone.trim();
  const results = phoneTest.exec(phone);
  if (results !== null && results.length > 8) {
    return `(${results[3]}) ${results[4]}-${results[5]}${typeof results[8] !== 'undefined' ? ` x${results[8]}` : ''}`;
  }
  return phone;
};

const Member = (props) => {
  const { member, amount, groupRole, onPressEdit, onPressDelete, id, status } = props;
  const { firstName, lastName, phone, image } = member;

  const memberName = firstName !== null ? `${firstName} ${lastName}` : this.formatNumber(phone);
  const swipeoutBtns = [
    {
      text: 'Edit',
      color: '#00074D',
      fontSize: 12,
      fontFamily: REGULAR,
      onPress: () => onPressEdit(),
    },
    {
      text: 'Remove',
      backgroundColor: 'red',
      color: '#FFFFFF',
      fontSize: 12,
      fontFamily: REGULAR,
      onPress: () => onPressDelete(id),
    },
  ];
  return status === 'pending' ?
    (
      isOwnerOrAdmin(groupRole) ?
        <Swipeout right={swipeoutBtns}>
          <View style={styles.wrapper}>
            <Left style={styles.leftContainer}>
              <Thumbnail style={styles.thumbnailContainer} source={{ uri: getImageUrl(image) }} />
              <Text style={styles.text}>{`${memberName}`}</Text>
            </Left>
          
            <Right>
              <Currency
                color="#666"
                amount={amount % 1 === 0 ? amount : amount.toFixed(2)}
                numberSize={14}
              />
            </Right>
        </View>
      </Swipeout>
      :
      <View style={styles.wrapper}>
        <Left style={styles.leftContainer}>
          <Thumbnail style={styles.thumbnailContainer} source={{ uri: getImageUrl(image) }} />
          <Text style={styles.text}>{`${memberName}`}</Text>
        </Left>

    </View>
    ) :
    (
      <View style={styles.wrapper}>
        <Left style={styles.leftContainer}>
          <Thumbnail style={styles.thumbnailContainer} source={{ uri: getImageUrl(image) }} />
          <Text style={styles.text}>{`${memberName}`}</Text>
        </Left>
        { isOwnerOrAdmin(groupRole) ?
          <Right>
            <Currency
              color={status === 'accepted' ? '#00D7AC' : '#F44236'}
              amount={amount % 1 === 0 ? amount : amount.toFixed(2)}
              numberSize={14}
            />
          </Right>
          : null
        }
      </View>
    )
  ;
};

const { string, number, shape, oneOf, func } = PropTypes;

Member.propTypes = {
  member: shape({
    firstName: string.isRequired,
    lastName: string.isRequired,
  }).isRequired,
  status: string.isRequired,
  amount: number.isRequired,
  id: number.isRequired,
  groupRole: oneOf(ALL_ROLES).isRequired,
  onPressEdit: func,
  onPressDelete: func,
};
Member.defaultProps = {
  onPressDelete: null,
  onPressEdit: null,
};

export default Member;
