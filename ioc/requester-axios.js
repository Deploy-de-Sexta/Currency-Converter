const axios = require('axios');

module.exports = {
  get(url, { params } = {}) {
    return axios.get(url, { params });
  },
};
