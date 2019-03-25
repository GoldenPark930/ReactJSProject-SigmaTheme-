import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import {
  Body,
  Thumbnail,
  ListItem,
  View,
} from 'native-base';

import Currency from '../../../../components/currency';
import { isOwnerOrAdmin } from '../../../../constants/users/roles';
import MyPending from '../MyPending';

import * as Colors from '../../../../constants/colors';
import styles from './styles';


class GroupItem extends React.PureComponent {
  render() {
    const { item, onSingleGroupPressHandler } = this.props;
    return (
      <ListItem
        onPress={() => onSingleGroupPressHandler(item)}
        style={styles.groupItem}
      >

        <Body style={styles.groupBody}>
          <View style={styles.groupItemHeaderContainer}>
            <View style={styles.groupItemHeaderDetails}>
              <Text style={styles.groupName}>
                {item.name}
              </Text>
              <Text style={styles.clubDetails}>
                {`${item.enableBalance ? 'Closed' : 'Open'} Club | ${item.members.totalCount} Member${item.members.totalCount !== 1 ? 's' : ''}`}
              </Text>
            </View>
            <View style={styles.groupItemHeaderThumbnailContainer}>
              <View style={styles.groupThumbnailBorder}>
                <Thumbnail
                  circular
                  style={[styles.groupThumbnail]}
                  source={{ uri: item.imageUrl }}
                />
              </View>
            </View>
          </View>

          <View style={styles.groupMiddleSection}>
            <View style={styles.groupOwnerThumbnailBorder}>
              <Thumbnail
                style={[styles.groupOwnerThumbnail]}
                source={{ uri: item.owner.imageUrl }}
              />
            </View>
            <View style={styles.clubDetailsOwner}>
              <Text style={styles.clubOwner}>{item.owner.firstName} {item.owner.lastName}</Text>
              <Text style={styles.clubSeparator}> | </Text>
              <Text style={styles.clubOwnerUsername}>@{item.owner.username}</Text>
            </View>
            {isOwnerOrAdmin(item.role) && item.enableBalance ?
              <View style={styles.clubDetailsBalance}>
                <Currency
                  amount={item.balance}
                  numberSize={24}
                  color={Colors.GREEN}
                />
              </View>
              : null}
          </View>

        </Body>
        <MyPending charges={item.charges} />
      </ListItem>
    );
  }
}

const { func, objectOf, any } = PropTypes;
GroupItem.propTypes = {
  item: objectOf(any).isRequired,
  onSingleGroupPressHandler: func.isRequired,
};

export default GroupItem;
