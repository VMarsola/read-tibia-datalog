/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-empty-function": [
      "error",
      { allow: ["arrowFunctions"] },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
