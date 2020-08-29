const requesterAxios = require('./requester-axios');
const requesterFetch = require('./requester-fetch');
const CurrencyConverterIoC = require('./currency-converter');
const ioc = require('./ioc');

ioc.register('Requester', () => {
  return requesterAxios;
  // return requesterFetch;
});

const cc = new CurrencyConverterIoC;

cc.convert('BRL', 'USD').then(console.log);
