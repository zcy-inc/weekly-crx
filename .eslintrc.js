module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    indent: ['error', 2],
  },
  plugins: ['vue'],
  rules: {
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    'no-console': [0],
  },

  globals: {
    chrome: 'readonly',
  },
};
