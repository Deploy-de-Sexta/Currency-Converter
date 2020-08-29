const axios = require('axios');
const CurrencyConverterDependencyInjection = require('./currency-converter');

const cc = new CurrencyConverterDependencyInjection(axios);

cc.convert('BRL', 'USD').then(console.log);
