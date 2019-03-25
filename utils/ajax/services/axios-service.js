import axios from 'axios';

import { URL } from '../../../constants/api';

// Set default params and headers for axios
axios.defaults.baseURL = URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

const AxiosService = (function () {
  let AuthorizationToken = null;

  function addHeaders(userConfig) {
    const globalHeaders = {};

    // You can set global headers here
    if (AuthorizationToken) {
      globalHeaders.Authorization = AuthorizationToken;
    }

    const { params, headers, ...restConfigs } = userConfig;
    const { filter, ...restParams } = params || {};

    // Return extended config
    return {
      ...restConfigs,
      headers: {
        ...globalHeaders,
        ...headers,
      },
      params: {
        ...restParams,
        filter: JSON.stringify(filter || {}),
      },
    };
  }

  // Set authorization token
  function setAuthorizationToken(token) {
    AuthorizationToken = token;
  }

  // GET method
  function get(endPoint, userConfig = {}) {
    return axios.get(endPoint, addHeaders(userConfig));
  }

  // POST method
  function post(endPoint, params = {}, userConfig = {}) {
    return axios.post(endPoint, params, addHeaders(userConfig));
  }

  // Patch method
  function patch(endPoint, params = {}, userConfig = {}) {
    return axios.patch(endPoint, params, addHeaders(userConfig));
  }

  function del(endPoint, userConfig = {}) {
    return axios.delete(endPoint, addHeaders(userConfig));
  }

  return {
    setAuthorizationToken,
    get,
    post,
    patch,
    del,
  };
});

export default AxiosService();
