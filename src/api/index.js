import axios from 'axios';

const url = 'https://tdcx-node.herokuapp.com/api';

/**
 * Default dynamic API call
 * @param {String} uri
 * @param {String} method
 * @param {Object} data
 * @returns Object
 */
export const apiRequest = async (uri, method, data = {}) => {
  const headers = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  return await axios({ method, url: `${url}/${uri}`, data, headers }).then(
    (response) => {
      return response.data;
    }
  );
};
