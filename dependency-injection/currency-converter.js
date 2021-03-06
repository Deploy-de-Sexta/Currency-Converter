const conf = require('../conf');

module.exports = class CurrencyConverterTraditional {
  #requester;

  constructor(requester) {
    this.#requester = requester;
  }

  async convert(from, to) {
    const fromTo = `${from}_${to}`;

    const { data } = await this.#requester.get(conf.CURRENCY_CONVERTER_URL, {
      params: {
        q: fromTo,
        apiKey: conf.CURRENCY_CONVERTER_API_KEY,
        compact: 'ultra',
      },
    });

    if (!data[fromTo]) throw new Error(`Cannot convert from ${from} to ${to}`);
    return data[fromTo];
  }
}