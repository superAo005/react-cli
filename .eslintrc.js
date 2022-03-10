module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // 这个规则比较奇怪
    //https://github.com/typescript-eslint/typescript-eslint/blob/v5.4.0/packages/eslint-plugin/docs/rules/no-var-requires.md
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-extra-semi': 0,
  },
}
