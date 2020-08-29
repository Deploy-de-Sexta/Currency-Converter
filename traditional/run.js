const CurrencyConverterTraditional = require('./currency-converter');

const cc = new CurrencyConverterTraditional;
cc.convert('BRL', 'USD').then(console.log);
