const Filter = require('bad-words');

const filter = new Filter();

const censorString = (string) => {
  if (Boolean(string)) {
    return filter.clean(string);
  }

  return null;
}

module.exports = censorString;
