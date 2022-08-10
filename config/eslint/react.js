module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['./index.js', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-unescaped-entities': 0,
  },
}
