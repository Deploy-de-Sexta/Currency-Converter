const fetch = require('node-fetch');

function objToQueryString(params) {
  const searchParams = new URLSearchParams;
  Object.entries(params).forEach(([key, val], _) => searchParams.append(key, val));
  return searchParams.toString();
}

module.exports = {
  async get(url, { params } = {}) {
    const resp = await fetch(`${url}?${objToQueryString(params)}`);

    if (!resp.ok) throw new Error('Problem reaching endpoint');

    return { data: await resp.json() };
  }
};
