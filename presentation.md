# Mocks

## Por quê?

### Difícil replicação
E se fosse necessário instalar e configurar alguma dependência complexa? (ElasticSearch por exemplo.)

### Lentidão
E se mesmo automatizando a inicialização de uma dependência os testes ficarem lentos?

### Confiança
E se a gente decidir bater numa API externa durante testes e estivermos sem conexão com a internet?  
E se a gente cumprimentar o usuário com "bom dia" pela menhã e "boa noite" durante a noite? Como retornar resultados consistentes independente do momento quando a gente rode o teste?

## Test Double

Esse é o termo mais genérico (e mais correto) para se refenciar a mocks. Abaixo seguem as diferentes categorias de test double.

### Dummy

Não são usados pra nada no código. Normalmente só satisfazem parâmetros.

#### In production
```js
class Calculator {
  #logger;
  #lastResult;

  constructor(logger) {
    if (!logger) throw new Error('It is mandatory to provide a logger');
    this.#logger = logger;
  }

  add(a, b) {
    this.#lastResult = a + b;
    return this.#lastResult;
  }

  get memo() {
    if (this.#lastResult) return this.#lastResult;
    this.#logger.warn('No result computed yet');
  }
}
```

#### During tests
```js
const calculator = new Calculator({});
expect(calculator.add(1, 2)).toEqual(3);
```

### Fake

Objetos funcionais usando somente durante testes (ex.: implementação de banco de dados em memória.)

#### In production
```js
class Calculator {
  #cache;

  constructor(cache) {
    this.#cache = cache;
  }

  add(a, b) {
    const result = a + b;
    this.#cache.set(`${a}+${b}`, result);
    return result
  }
}

class RedisCache {
  #client;
  constructor(redisUrl) { this.#client = redis.createClient(redisUrl); }
  set(key, value) { this.#client.set(key, value); }
  get(key) { return this.#client.get(key); }
}

const calculator = new Calculator(new RedisCache('redis://@localhost:6379'));
```

#### During tests
```js
class InMemoryCache {
  #storage = {};
  set(key, value) { this.#storage[key] = value }
  get(key) { return this.#storage[key] }
}

const calculator = new Calculator(new InMemoryCache);
expect(calculator.add(1, 2)).toEqual(3);
```

### Stub

Tem implementações pré-programadas para algumas chamadas durante o teste.

#### In production
```js
class Calculator {
  #logger;
  #lastResult;

  constructor(logger) {
    if (!logger) throw new Error('It is mandatory to provide a logger');
    this.#logger = logger;
  }

  add(a, b) {
    this.#lastResult = a + b;
    return this.#lastResult;
  }

  get memo() {
    if (this.#lastResult) return this.#lastResult;
    this.#logger.warn('No result computed yet');
  }
}

const calculator = new Calculator(new FileLogger('/my-file.log', { mode: 'append' });
```

#### During tests
```js
const loggerStub = { warn: jest.fn() };
const calculator = new Calculator(loggerStub);

calculator.memo;

expect(loggerStub.warn).toHaveBeenCalledWith('No result computed yet');
```

### Spy

"Espia" chamadas de métodos para futura verificação (pode ou não substituir implementação real.)

#### During tests
```js
class InMemoryCache {
  #storage = {};
  set(key, value) { this.#storage[key] = value }
  get(key) { return this.#storage[key] }
}

const inMemoryCache = new InMemoryCache;
jest.spyOn(inMemoryCache, 'get');
const calculator = new Calculator(inMemoryCache);

calculator.add(1, 2);
calculator.add(1, 2);

expect(inMemoryCache.get).toHaveBeenCalledTimes(1);
```

### Mock

Objetos configurados com expectativas pré-definidas do que deve ser executado e com quais parâmetros.

### In production (`redis-cache.js`)
```js
module.exports = class RedisCache {
  #client;
  constructor(redisUrl) { this.#client = redis.createClient(redisUrl); }
  set(key, value) { this.#client.set(key, value); }
  get(key) { return this.#client.get(key); }
}
```

#### During tests
```js
const RedisCache = require('./redis-cache');
jest.mock('./redis-cache');

test('when "calculator.add" is called then the result is cached', () => {
  const cacheMock = new RedisCache('dummy-url');
  const calculator = new Calculator(cacheMock);

  calculator.add(1, 2);

  expect(cacheMock.set).toHaveBeenCalledTimes(1);
  expect(cacheMock.set).toHaveBeenCalledWith('1+2', 3);
});
```

## Evite mocks
Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks Evite mocks

## Como fazer na prática?

Talk is cheap. Show me the code.