const path = require('path');

module.exports = (api) => {
  api.cache(true);
  return {
    extends: path.resolve(__dirname, '../../babel.config.js'),
  };
};
