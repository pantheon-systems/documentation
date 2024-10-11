import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: ['node_modules/**'],
  },
  ...compat.config({
    extends: ['plugin:prettier/recommended'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
    globals: {
      MktoForms2: 'readonly',
      jQuery: 'readonly',
      $: 'readonly',
    },
  }),
  prettier,
];
