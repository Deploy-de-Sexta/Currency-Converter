const axios = require('axios');
const CurrencyConverter = require('./currency-converter');
const conf = require('../conf');

jest.mock('axios');

describe('Currency Converter (Traditional)', () => {
  beforeAll(() => {
    // Jest runs each test file in its own sandbox.
    // That's why this config if overriden but
    // its value is not restored after all the tests.
    //
    // DON'T RELY ON THIS BEHAVIOR WHEN USING OTHER FRAMEWORKS,
    // otherwise one test may affect another, which is VERY BAD!
    conf.CURRENCY_CONVERTER_API_KEY = 'spam';
  });

  afterEach(() => jest.clearAllMocks());

  it('Calls correct URL', async () => {
    axios.get.mockResolvedValue({ data: { 'ABC_DEF': 1.2 } });

    const cc = new CurrencyConverter;
    await cc.convert('ABC', 'DEF');

    const [ firstArg, secondArg ] = axios.get.mock.calls[0];
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(firstArg).toEqual(conf.CURRENCY_CONVERTER_URL)
    expect(secondArg).toEqual({
      params: {
        q: 'ABC_DEF',
        apiKey: conf.CURRENCY_CONVERTER_API_KEY,
        compact: 'ultra',
      },
    });
  });

  it('Returns correct convertion', async () => {
    axios.get.mockResolvedValue({ data: { 'ABC_XYZ': 1.7 } });

    const cc = new CurrencyConverter;
    const result = await cc.convert('ABC', 'XYZ');

    expect(result).toEqual(1.7);
  });

  it('Throws error when response has no convertion', async () => {
    axios.get.mockResolvedValue({ data: {} });

    expect.assertions(1);

    try {
      const cc = new CurrencyConverter;
      const result = await cc.convert('ABC', 'XYZ');
    } catch (err) {
      expect(err).toEqual(new Error('Cannot convert from ABC to XYZ'));
    }
  });

  it('Throws error when request is not successful', async () => {
    axios.get.mockRejectedValue(new Error);

    expect.assertions(1);

    try {
      const cc = new CurrencyConverter;
      const result = await cc.convert('ABC', 'XYZ');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
