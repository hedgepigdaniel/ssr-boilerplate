const micromatch = require('micromatch');

const eslintMatcher = '*.{js,jsx,ts,tsx}';

module.exports = {
  '*': (files) =>
    files.map((file) =>
      micromatch.isMatch(file, eslintMatcher)
        ? `yarn run lint --fix '${file}'`
        : `prettier --write '${file}'`,
    ),
  '**/*.ts?(x)': () => 'tsc -b config/tsconfig.json',
};
