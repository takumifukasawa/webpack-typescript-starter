const path = require("path");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      files: ["**/*.ts"],
      extends: [
        "airbnb-base",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
      },
      plugins: ["@typescript-eslint"],
      rules: {
        "import/extensions": [
          "error",
          "ignorePackages",
          {
            ts: "never",
          },
        ],
      },
      settings: {
        "import/resolver": {
          // eslintの設定はcommonに書いてあるので、dev,prodではなくcommonを指定
          webpack: { config: path.join(__dirname, "webpack.common.js") },
        },
      },
    },
  ],
};
