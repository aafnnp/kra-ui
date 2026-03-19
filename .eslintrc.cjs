module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // 避免默认 any，提升类型安全
    '@typescript-eslint/no-explicit-any': 'warn',
    // 控制圈复杂度，鼓励拆分函数
    complexity: ['warn', 10],
    // 函数长度控制，避免过长
    'max-lines-per-function': ['warn', { max: 160, skipBlankLines: true, skipComments: true }],
    // React 17+ JSX 转换，不强制显式 import React
    'react/react-in-jsx-scope': 'off',
    // React Native 规则微调，兼顾示例代码与可维护性
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/sort-styles': 'warn',
    'react-native/no-raw-text': [
      'error',
      {
        skip: ['Heading', 'Code', 'Highlight', 'Link'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: null,
      },
    },
    {
      files: ['packages/docs/**/*.ts'],
      env: {
        node: true,
      },
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
    },
  ],
  ignorePatterns: [
    'node_modules',
    'lib',
    'dist',
    '.expo',
    '.vitepress/dist',
    '**/android',
    '**/ios',
  ],
};
