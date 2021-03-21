module.exports = {
  extends: [
    'eslint-config-airbnb',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:import/typescript',
  ],
  parser: 'babel-eslint',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
    },
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
      files: './packages/app/**/*',
      env: {
        'shared-node-browser': true,
      },
      rules: {
        'react/jsx-filename-extension': 0,
        'react/prop-types': ['error', { skipUndeclared: true }],
      },
    },
    {
      files: ['./packages/app/scripts/*'],
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
    'import/extensions': [2, { ts: 'never', tsx: 'never' }],
    'import/no-default-export': 2,
    'import/prefer-default-export': 0,
    'react/react-in-jsx-scope': 0,
  },
};
