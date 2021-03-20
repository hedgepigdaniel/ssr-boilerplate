const path = require('path');

module.exports = {
  extends: ['eslint-config-airbnb', 'plugin:prettier/recommended', 'prettier'],
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      lerna: {
        packages: path.resolve(__dirname, './packages'),
      },
    },
  },
  overrides: [
    {
      files: ['./*'],
      rules: {
        'import/no-extraneous-dependencies': [
          2,
          {
            devDependencies: true,
          },
        ],
      },
    },
    {
      files: "./packages/app/**/*",
      env: {
        'shared-node-browser': true,
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.browser.js', '.server.js', '.js', '.css'],
          },
        },
      },
      rules: {
        'react/jsx-filename-extension': 0,
        'react/prop-types': ['error', { skipUndeclared: true }],
      },
    },
    {
      files: ['./packages/app/server/*', './packages/app/server/serveDev.js'],
      rules: {
        'import/no-extraneous-dependencies': [
          2,
          {
            devDependencies: true,
            packageDir: ['./', 'packages/app'],
          },
        ],
      },
    },
  ],
  rules: {
    'prettier/prettier': 'warn',
    'no-use-before-define': [
      'error',
      { functions: false, classes: false, variables: false },
    ],
    'no-underscore-dangle': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-nested-ternary': 0,
    'import/no-default-export': 2,
    'import/prefer-default-export': 0,
    'react/jsx-fragments': [2, 'element'],
  },
};
