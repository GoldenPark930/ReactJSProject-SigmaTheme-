import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Currency from '../../../../../components/currency';

import { CALM, WHITE } from '../../../../../constants/colors';
import styles from './styles';

const ListItem = (props) => {
  const { item: { firstName, lastName, imageUrl, selected, registered, phone },
    amount, handleOnLongPress, handleOnSelect } = props;
  return (
    <TouchableOpacity
      onPress={handleOnSelect}
      onLongPress={handleOnLongPress}
    >
      <View style={styles.listItemContainer}>
        <Image
          style={selected ? [styles.listItemImage,
            { borderWidth: 2, borderColor: CALM }] :
            [styles.listItemImage, { opacity: 0.4 }]
          }
          source={{ uri: imageUrl }}
        />
        <Text style={styles.listItemNameText}>
          {registered ?
            `${firstName} ${lastName !== null && lastName}` :
            phone }
        </Text>
        {
          selected ?
            <Currency
              color={CALM}
              amount={amount}
              numberSize={18}
            /> : null
        }
      </View>
      {
        selected ?
          <View style={styles.listItemCheckContainer}>
            <CheckIcon
              name="check"
              size={11}
              color={WHITE}
            />
          </View> : null
      }
    </TouchableOpacity>
  );
};

ListItem.defaultProps = {
  amount: 0.00,
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  amount: PropTypes.number.isRequired,
  handleOnLongPress: PropTypes.func.isRequired,
  handleOnSelect: PropTypes.func.isRequired,
};

export default ListItem;
