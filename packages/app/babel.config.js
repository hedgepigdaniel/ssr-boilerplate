const path = require('path');

module.exports = (api) => {
  const webpackClient = api.env('webpack-client');
  const webpackServer = api.env('webpack-server');
  return {
    extends: path.resolve(__dirname, '../../babel.config.js'),
    plugins: [
      (webpackClient || webpackServer) && '@babel/plugin-syntax-dynamic-import',
      webpackClient && ['react-refresh/babel', { skipEnvCheck: true }],
    ].filter(Boolean),
  };
};
