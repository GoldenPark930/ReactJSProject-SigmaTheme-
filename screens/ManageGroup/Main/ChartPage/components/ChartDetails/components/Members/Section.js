import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Icon } from 'native-base';
import {
  isOwnerOrAdmin,
  ALL_ROLES,
} from '../../../../../../../../constants/users/roles';
import Currency from '../../../../../../../../components/currency';
import { REGULAR } from '../../../../../../../../constants/fonts';
import { LIGHT_GREY } from '../../../../../../../../constants/colors';

/**
 |------------------------------------------------------------------------------
 | Section -> Members
 |
 | Component
 |------------------------------------------------------------------------------
 */

const Section = ({ state, count, total, onPress, isOpen, groupRole }) => {
  let color = '#00D7AC';
  if (state === 'declined') color = '#F44236';
  if (state === 'uncollected') color = '#666';

  const iconName = isOpen ? 'ios-arrow-down' : 'ios-arrow-forward';
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.wrapper}
      onPress={() => onPress()}
    >
      <View style={styles.leftContainer}>
        <Icon
          name={iconName}
          style={styles.icon}
        />
        <Text style={styles.text}>
          {state.toUpperCase()} ({count})
        </Text>
      </View>
      <View style={styles.devider} />
      {isOwnerOrAdmin(groupRole) ?
        <Currency
          color={color}
          amount={total % 1 === 0 ?
            total :
            total.toFixed(2)}
          numberSize={24}
        />
        : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 25,
    padding: 6,
    paddingLeft: 15,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  leftContainer: {
    flexDirection: 'row',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: REGULAR,
    backgroundColor: 'transparent',
  },
  icon: {
    fontSize: 18,
    width: 15,
    color: 'black',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  devider: {
    flex: 1,
    height: 1,
    marginLeft: 10,
    marginRight: 25,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY,
  },
});

const { func, string, number, bool, oneOf } = PropTypes;
Section.propTypes = {
  state: string.isRequired,
  count: number.isRequired,
  total: number.isRequired,
  isOpen: bool.isRequired,
  onPress: func.isRequired,
  groupRole: oneOf(ALL_ROLES).isRequired,
};

export default Section;
