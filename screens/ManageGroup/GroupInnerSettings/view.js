import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import CommonQuestionModal from '../../../components/common-question-modal';
import { navigationPropTypes } from '../../../constants/app/defaults';
import { ALL_ROLES, isOwner } from '../../../constants/users/roles';
import GroupSettings from './constants/group-settings-config';
import InnerSettingsItem from './components/inner-settings-item';
import NavigationService from '../../../utils/helpers/navigation-service';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Group inner settings view
 |
 | Content view
 |------------------------------------------------------------------------------
 */

const { number, string, func, shape, oneOf } = PropTypes;

class GroupInnerSettingsView extends Component {
  static propTypes = {
    // Data
    userId: number.isRequired,
    groupData: shape({
      id: number.isRequired,
      name: string.isRequired,
      role: oneOf(ALL_ROLES).isRequired,
    }).isRequired,
    // Functions
    leaveCurrentGroup: func.isRequired,
    updateNavWorkaroundState: func.isRequired,
    // Navigation
    ...navigationPropTypes(PropTypes),
  };

  state = {
    leaveGroupQuestionModalVisible: false,
  };

  /*
  |-----------------------------------------------------------------------------
  | Events handlers
  |-----------------------------------------------------------------------------
  */

  leaveGroupOnSubmitEventHandler = () => {
    const { userId, leaveCurrentGroup, navigation, groupData: { id } } = this.props;

    // Close question modal
    this.closeQuestionModal();

    // Leave current group and navigate back to the groups list
    leaveCurrentGroup(id, userId, () => NavigationService.navigateWithDebounce('MyGroups'));
  };

  /*
  |-----------------------------------------------------------------------------
  | Actions handlers
  |-----------------------------------------------------------------------------
  */

  leaveGroupButtonOnPressHandler = () => {
    this.setState({ leaveGroupQuestionModalVisible: true });
  };

  closeQuestionModal = () => {
    this.setState({ leaveGroupQuestionModalVisible: false });
  };

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  renderLeaveGroupButton = () => {
    const { groupData: { role } } = this.props;
    const buttonLabel = 'Leave Club';

    // Group owner can not leave his/her group so render the simple <View> that
    // looks like a disable button with the hint instead of the actual leave button
    if (isOwner(role)) {
      return (
        <View style={styles.buttonWrapper}>
          <View style={[styles.buttonContainer, styles.buttonDisabled]}>
            <Text style={[styles.buttonLabel, styles.buttonLabelDisabled]}>
              {buttonLabel}
            </Text>
          </View>

          <Text style={styles.buttonHint}>
            You can not leave your own club.
            To leave your club you need to transfer club ownership first
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={this.leaveGroupButtonOnPressHandler}
          style={[styles.buttonContainer, styles.buttonActive]}
        >
          <Text style={[styles.buttonLabel, styles.buttonLabelActive]}>
            {buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const { leaveGroupQuestionModalVisible } = this.state;
    const { groupData, navigation, updateNavWorkaroundState } = this.props;

    return (
      <View>
        <CommonQuestionModal
          visible={leaveGroupQuestionModalVisible}
          onRequestCloseHandler={this.closeQuestionModal}
          onSubmitQuestionHandler={this.leaveGroupOnSubmitEventHandler}
        >
          <Text style={styles.questionText}>
            Are you sure?
          </Text>
        </CommonQuestionModal>

        <View style={styles.scrollView}>
          <ScrollView scrollEnabled={false}>
            {GroupSettings.map((setting, index) => (
              <InnerSettingsItem
                showSeparator={GroupSettings.length - 1 !== index}
                key={setting.label}
                settingData={setting}
                groupData={groupData}
                navigation={navigation}
                updateNavWorkaroundState={updateNavWorkaroundState}
              />
            ))}
          </ScrollView>
        </View>

        {this.renderLeaveGroupButton()}
      </View>
    );
  }
}

export default GroupInnerSettingsView;
