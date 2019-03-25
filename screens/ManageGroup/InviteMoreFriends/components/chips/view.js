import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';


import DefaultImage from '../../../../../../assets/images/payclub-default-avatar.png';
import styles from './styles';
import {
  LIGHT_GREY,
  GREY,
  CALM,
} from '../../../../../constants/colors';


class ChipsView extends Component {
  onContentSizeChangeEventHandler = () => {
    this.scrollViewRef.scrollToEnd();
  };

  onRemovePress = (item) => {
    this.props.removeUserFromInvitationList(item.id ? item.id : item.phone);
  }

  scrollViewReference = (element) => {
    this.scrollViewRef = element;
  };

  render() {
    const { list, onSearchInputChange, searchRef } = this.props;
    return (
      <View style={styles.wrapper}>
        <View style={styles.chipsContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            onContentSizeChange={this.onContentSizeChangeEventHandler}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            ref={this.scrollViewReference}
          >
            {list.map(user => (
              <TouchableOpacity
                style={styles.chipWrapper}
                onPress={() => this.onRemovePress(user)}
              >
                <Image
                  style={styles.chipAvatar}
                  source={
                    user.image === undefined ?
                      DefaultImage :
                      { uri: user.image }
                  }
                />

                <Text style={styles.chipLabel}>
                  {user.firstName && user.lastName ?
                    `${user.firstName} ${user.lastName || user.username}` :
                    user.phone
                  }
                </Text>

                <View style={styles.removeIconContainer}>
                  <Icon
                    name="clear"
                    size={10}
                    color={LIGHT_GREY}
                  />
                </View>
              </TouchableOpacity>
            ))}
            <TextInput
              style={styles.search}
              ref={searchRef}
              onChangeText={onSearchInputChange}
              autoCapitalize="none"
              authCorrect={false}
              underlineColorAndroid="transparent"
              selectionColor={CALM}
              placeholderTextColor={GREY}
              placeholder={
                list.length ?
                  '' :
                  'Type name, email or username'
              }
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

ChipsView.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeUserFromInvitationList: PropTypes.func.isRequired,
  onSearchInputChange: PropTypes.func.isRequired,
  searchRef: PropTypes.func.isRequired,
};

export default ChipsView;
