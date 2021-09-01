module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'comma-dangle': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'max-len': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-throw-literal': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': 'off',
    'object-curly-newline': 'off',
    'no-shadow': 'off',
    'prefer-const': 'off',
    'quote-props': 'off',
    'camelcase': 'off',
    'operator-linebreak': 'off',
    'react/jsx-wrap-multilines': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/jsx-curly-newline': 'off',
    'react/destructuring-assignment': 'off',
    'prefer-template': 'off',
    'function-paren-newline': 'off',
    'eqeqeq': 'off',
    'linebreak-style': 'off',
    'new-cap': 'off',
    'no-use-before-define': 'off',
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/prefer-default-export': 'off',
    'no-nested-ternary': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-equals-spacing': 'off',
    'no-restricted-globals': 'off',
    'import/no-named-as-default': 'off',
    'prefer-destructuring': 'off',
  },
};
