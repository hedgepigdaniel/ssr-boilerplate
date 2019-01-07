const path = require("path");

module.exports = {
  extends: [
    "eslint-config-airbnb",
    "plugin:prettier/recommended",
    "prettier/react",
  ],
  parser: "babel-eslint",
  settings: {
    "import/resolver": {
      lerna: {
        packages: path.resolve(__dirname, "./packages"),
      },
    },
  },
  rules: {
    "prettier/prettier": "warn",
    "no-use-before-define": [
      "error",
      { functions: false, classes: false, variables: false },
    ],
    "no-underscore-dangle": 0,
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-nested-ternary": 0,
    "import/no-extraneous-dependencies": [
      2,
      {
        devDependencies: ["config/**"],
      },
    ],
  },
};
