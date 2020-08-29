# Currency Converter

## Setup

Grab an API key on [free.currencyconverterapi.com/free-api-key](https://free.currencyconverterapi.com/free-api-key).

Then run `npm install`.

## Run

Traditional version
```
npx cross-env CURRENCY_CONVERTER_API_KEY=<Your-API-key> npm run traditional
```

Dependepcy injection version
```
npx cross-env CURRENCY_CONVERTER_API_KEY=<Your-API-key> npm run dependency-injection
```

IoC version
```
npx cross-env CURRENCY_CONVERTER_API_KEY=<Your-API-key> npm run ioc
```

## Test

```
npm test
```