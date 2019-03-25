import ajax from '../services';

export const getGroupMembers = groupId =>
  ajax.get(`Groups/${groupId}/members`);

export const getGroupMessages = groupId =>
  ajax.get(`Groups/${groupId}/messages`);

export const getNonMembersUsers = (groupId, params) =>
  ajax.get(`Groups/${groupId}/suggestions`, { params });

export const inviteUsersToGroup = (groupId, payload) =>
  ajax.post(`Groups/${groupId}/bulkInvite`, payload);

export const getGroupData = groupId =>
  ajax.get(`Groups/${groupId}`);

export const getGroupBanksAccounts = groupId =>
  ajax.get(`Groups/${groupId}/BankAccounts`);

export const transfertToGroupBank = (groupId, payload) =>
  ajax.post(`Groups/${groupId}/banks/transfer`, payload);

export const transfertToOwnerBank = (groupId, payload) =>
  ajax.post(`Groups/${groupId}/owner/banks/transfer`, payload);

export const transfertToOwnerBalance = (groupId, payload) =>
  ajax.post(`Groups/${groupId}/owner/balance/transfer`, payload);

export const leaveGroup = (groupId, payload) =>
  ajax.post(`Groups/${groupId}/leave`, payload);

export const updateGroup = (groupId, payload) =>
  ajax.patch(`Groups/${groupId}`, payload);

export const transferOwnership = (groupId, payload) =>
  ajax.post(`Groups/${groupId}/ownership`, payload);

export const updateGroupImage = (groupId, payload) =>
  ajax.post(`Groups/${groupId}/image`, payload);

export const getArchivedGroups = () =>
  ajax.get('/Groups/mine?archived=true');

export const getAllGroups = (limit, skip) =>
  ajax.get(`/Groups/mine?archived=false&withMembers=true&withCharges=true&limit=${limit}&skip=${skip}`);
