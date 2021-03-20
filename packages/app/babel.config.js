const path = require('path');

module.exports = (api) => {
  const webpack = api.env(
    (envName) => envName.split('-').indexOf('webpack') !== -1,
  );
  const client = api.env(
    (envName) => envName.split('-').indexOf('client') !== -1,
  );
  const dev = api.env((envName) => envName.split('-').indexOf('dev') !== -1);
  return {
    extends: path.resolve(__dirname, '../../babel.config.js'),
    plugins: [
      webpack && '@babel/plugin-syntax-dynamic-import',
      webpack && client && dev[('react-refresh/babel', { skipEnvCheck: true })],
    ].filter(Boolean),
  };
};
