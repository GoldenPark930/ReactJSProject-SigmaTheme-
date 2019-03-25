import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ListView,
  Alert,
  StyleSheet,
} from 'react-native';
import Member from './Member';
import Section from './Section';
import { ALL_ROLES } from '../../../../../../../../constants/users/roles';
import CommonQuestionModal from '../../../../../../../../components/common-question-modal';
import * as Colors from '../../../../../../../../constants/colors';
import * as FontWeight from '../../../../../../../../constants/fonts/weight-map';
import { manageGroupApis } from '../../../../../../../../scripts';
import ModalEditAmount from '../../../../../../ChargeGroup/components/Members/ModalEditAmount';

const { shape, func, string, number, object, oneOf } = PropTypes;

class ChartInfo extends Component {
  static propTypes = {
    onDetails: func.isRequired,
    data: shape({
      title: string.isRequired,
      count: number.isRequired,
      totals: object.isRequired,
      data: object.isRequired,
    }).isRequired,
    groupRole: oneOf(ALL_ROLES).isRequired,
    loadCharts: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        0: true,
        1: true,
        2: true,
      },
      dataSource: new ListView.DataSource({
        getSectionData: (dataBlob, sectionID) => dataBlob[sectionID],
        getRowData: (dataBlob, sectionID, rowID) => dataBlob[rowID],
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      }),
      deleteModalVisible: false,
      editModalVisible: false,
      member: null,
    };
  }

  onDetails() {
    if (this.props.onDetails) this.props.onDetails();
  }
  onPressEdit = (member, amount, rowData) => {
    this.setState({ editModalVisible: true, rowData, member, amount });
  }

  onPressDelete = (chargeId) => {
    this.setState({ deleteModalVisible: true, chargeId });
  }

  formatData() {
    const { members, totals, data } = this.props.data;
    const states = Object.keys(members);

    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];

    for (let sectionId = 0; sectionId < states.length; sectionId += 1) {
      sectionIDs.push(sectionId);
      const state = states[sectionId];
      dataBlob[sectionId] = {
        state,
        count: data[states[sectionId]],
        total: totals[states[sectionId]],
      };

      rowIDs.push([]);

      for (let j = 0; j < members[state].length; j += 1) {
        const rowId = `${sectionId}:${j}`;
        rowIDs[rowIDs.length - 1].push(rowId);
        dataBlob[rowId] = members[state][j];
      }
    }

    return { dataBlob, sectionIDs, rowIDs };
  }

  toggleSection(sectionID) {
    const { state } = this;
    state.sections[sectionID] = !state.sections[sectionID];
    this.setState(state);
  }

  deleteChargeRequestHandler = () => {
    this.deleteChargeRequest(this.state.chargeId);
    this.closeModal();
  }
  deleteChargeRequest = async (chargeId) => {
    const result = await manageGroupApis.deleteCharge(chargeId);
    if (result.error) return this.handleChargeError(result);
    this.props.loadCharts();
    return null;
  }
  handleChargeError = async result => Alert.alert(result.error.name, result.error.message);

  editChargeRequestHandler = (amount) => {
    this.editChargeRequest(amount, this.state.rowData);
    this.closeModal();
  }

  editChargeRequest = async (amount, rowData) => {
    const chargeId = rowData.id;
    const payload = {
      amount,
      status: rowData.status,
      cause: rowData.cause,
      direction: 'group',
      id: rowData.id,
      chargeRequestId: rowData.chargeRequestId,
      grinkUserId: rowData.grinkUserId,
    };
    const result = await manageGroupApis.editCharge(chargeId, payload);
    if (result.error) return this.handleChargeError(result);
    this.props.loadCharts();
    return null;
  }

  closeModal = () => {
    this.setState({ editModalVisible: false, deleteModalVisible: false });
  }

  renderMember(rowData, sectionID) {
    const { sections } = this.state;
    const { groupRole } = this.props;

    if (!sections[sectionID]) return (<View />);

    const { amount, grinkUser, id, status } = rowData;
    return (<Member
      member={grinkUser}
      amount={amount}
      id={id}
      status={status}
      groupRole={groupRole}
      onPressDelete={this.onPressDelete}
      onPressEdit={() => this.onPressEdit(grinkUser, amount, rowData)}
    />);
  }

  renderMemberSection(sectionData, sectionID) {
    const { sections } = this.state;
    const { state, total, count } = sectionData;
    const { groupRole } = this.props;

    return (<Section
      state={state}
      total={total}
      count={count}
      groupRole={groupRole}
      isOpen={sections[sectionID]}
      onPress={() => this.toggleSection(sectionID)}
    />);
  }

  render() {
    const { dataBlob, sectionIDs, rowIDs } = this.formatData();
    return (
      <View>
        <CommonQuestionModal
          visible={this.state.deleteModalVisible}
          onRequestCloseHandler={this.closeModal}
          onSubmitQuestionHandler={this.deleteChargeRequestHandler}
        >
          <Text style={{
            color: Colors.ROYAL,
            fontWeight: FontWeight.BOLD,
          }}
          >
            Are you sure?
          </Text>
        </CommonQuestionModal>
        <ModalEditAmount
          visible={this.state.editModalVisible}
          onClose={() => this.closeModal()}
          amount={this.state.amount}
          member={this.state.member}
          onCustomAmountUpdate={(member, amount) => this.editChargeRequestHandler(amount)}
        />

        <ListView
          enableEmptySections
          dataSource={this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)}
          renderRow={(rowData, sectionID, rowID) => this.renderMember(rowData, sectionID, rowID)}
          renderSectionHeader={(data, sectionID) => this.renderMemberSection(data, sectionID)}
          renderSeparator={(sectionId, rowId) => {
            const { sections } = this.state;
            if (sections[sectionId]) return (<View key={rowId} style={styles.devider} />);
            return null;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  devider: {
    flex: 1,
    height: 1,
    marginLeft: 49,
    marginRight: 25,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GREY,
  },
});

export default ChartInfo;
