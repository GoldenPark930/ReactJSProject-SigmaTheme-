import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import { range } from 'lodash';

import styles from './styles';

const Members = (props) => {
  const totalCount = props.members.totalCount;
  const shownMembers = props.members.rows.slice(0, 5);
  if(totalCount > 5) shownMembers.push({ 
    additionalMemberCount : totalCount - 5 
  });
  
  
renderItem = item => {  
    return (
      <View style={[styles.itemContainer, { marginLeft: -12 }]}>
        { typeof item.item.additionalMemberCount === 'undefined' ?
        <Image
          style={styles.item}
          source={{ uri: item.item.grinkUser.imageUrl }}
        />
        :
        <View style={styles.additionalMemberCount}>
          <Text style={styles.additionalMemberCountText}>+{item.item.additionalMemberCount}</Text>
        </View>
        }
      </View>);
  }
    
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.membersTitle}>{props.members.totalCount} Members</Text>
      </View>
      <FlatList
        data={shownMembers}
        renderItem={renderItem}
        columnWrapperStyle={styles.columnContainer}
        numColumns={11}
      />
    </View>
  );
};

Members.propTypes = {
};

Members.defaultProps = {
};

export default Members;
