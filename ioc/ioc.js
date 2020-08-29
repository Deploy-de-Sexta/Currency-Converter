const cache = {};

module.exports = {
  register(name, func) {
    cache[name] = func;
  },
  unregister(name) {
    delete cache[name];
  },
  make(name) {
    return cache[name]();
  },
}