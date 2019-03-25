import lowerCase from 'lodash/lowerCase';
import last from 'lodash/last';
import isNil from 'lodash/isNil';
import {
  retrieveToken,
  retrieveUser,
  StoreUserAccountInfo,
} from '../common/localStorage';
import ApiConstants, { URL } from '../constants/api';
import FetchService from '../utils/ajax/services/fetch-service';

const format = require('string-template');

const { APIROUTES } = ApiConstants;

/*
|-------------------------------------------------------------------------------
| GrinkUsers
|-------------------------------------------------------------------------------
*/

// NOT USED
async function VerifyPhone(phone) {
  const accessToken = await retrieveToken();
  const url = `${URL}${APIROUTES.userVerifyPhone}`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone }),
  };
  const result = await FetchService.customFetch(url, options);
  return result;
}

/*
|-------------------------------------------------------------------------------
| Groups
|-------------------------------------------------------------------------------
*/

// USED
async function UploadNewGroupImage({ fileName = 'camera-image.jpg', data: base64string }) {
  const accessToken = await retrieveToken();
  const url = `${URL}${APIROUTES.groupImage}`;
  const extension = lowerCase(last(fileName.split('.')));

  const payload = {
    type: 'profile',
    file: base64string,
    extension,
  };
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  const result = await FetchService.customFetch(url, options);
  return result;
}

// USED 
async function CreateNewGroupInDatabase(groupname, groupTopic, enableBalance, imageInfo, publicGroup) {
  let image = null;
  if (imageInfo) {
    image = await UploadNewGroupImage(imageInfo);
  }
  const accessToken = await retrieveToken();
  const url = `${URL}${APIROUTES.group}`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: groupname,
      topic: groupTopic,
      enableBalance,
      public: publicGroup,
      image: image ? image.id : null,
    }),
  };
  const result = await FetchService.customFetch(url, options);
  return result;
}

// USED 
async function InviteUserToGroupBulk(groupId, users) {
  const accessToken = await retrieveToken();
  const url = `${URL}${format(APIROUTES.groupBulkInvite, { groupId })}`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(users),
  };
  const result = await FetchService.customFetch(url, options);
  return result;
}

// USED IN CREATE NEW GROUP
async function CreateNewGroup(groupname, groupTopic, usersToInvite, groupBalance, imageInfo, publicGroup) {
  const users = [];
  for (let i = 0; i < usersToInvite.length; i += 1) {
    const data = {
      phone: usersToInvite[i].phone,
      role: 'member',
    };
    users.push(data);
  }
  const newGroupObject = await CreateNewGroupInDatabase(groupname, groupTopic, groupBalance, imageInfo, publicGroup);
  const groupId = newGroupObject.id;
  if (users.length > 0) {
    await InviteUserToGroupBulk(groupId, users);
  }
  return newGroupObject;
}


module.exports = {
  CreateNewGroup,
  CreateNewGroupInDatabase,
  UploadNewGroupImage,
  VerifyPhone,
};
