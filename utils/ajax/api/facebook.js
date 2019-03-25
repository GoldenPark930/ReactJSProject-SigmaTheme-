import axios from 'axios';

const host = 'https://graph.facebook.com/';

export const facebookProfile = (accessToken) => {
  const params = `?fields=id,name,about,email,first_name,last_name,link,picture,cover&access_token=${accessToken}`;
  return axios.get(`${host}me${params}`);
};
