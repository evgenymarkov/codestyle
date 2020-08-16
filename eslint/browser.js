'use strict';

const esmImportRules = {
  'import/default': 'error',
  'import/export': 'error',
  'import/named': 'error',
  'import/namespace': 'error',
  'import/no-unresolved': 'error',

  'import/no-duplicates': 'warn',
  'import/no-named-as-default': 'warn',
  'import/no-named-as-default-member': 'warn',
};

const tsImportRules = {
  ...esmImportRules,
  'import/named': 'off',
};

/**
 * TypeScript options
 *
 * @typedef {Object} TSOptions
 * @property {string} rootDir
 * @property {string | string[]} project
 */

/**
 * Options
 *
 * @typedef {Object} Options
 * @property {string[]} additionalPaths
 * @property {TSOptions} tsOptions
 */

/**
 * Get ESLint config
 *
 * @param {Options=} options
 * @returns {import('eslint').Linter.Config}
 */
module.exports = (options = {}) => {
  const additionalPaths = options.additionalPaths || [];
  const tsOptions = options.tsOptions;

  return {
    overrides: [
      {
        files: ['*.js', '*.jsx'],

        parserOptions: {
          ecmaVersion: 2020,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
            impliedStrict: true,
          },
        },

        plugins: ['react', 'react-hooks', 'jsx-a11y', 'import', 'prettier'],
        extends: [
          'eslint:recommended',
          'plugin:react/recommended',
          'plugin:jsx-a11y/recommended',
          'prettier',
          'prettier/react',
        ],

        settings: {
          'react': {
            version: 'detect',
          },
          'import/extensions': ['.js', '.jsx'],
          'import/resolver': {
            node: {
              paths: additionalPaths,
              extensions: tsOptions
                ? ['.js', '.jsx', '.ts', '.tsx', '.d.ts']
                : ['.js', '.jsx'],
            },
          },
        },

        env: {
          es2020: true,
          browser: true,
        },

        rules: {
          'prettier/prettier': 'error',
          'react-hooks/rules-of-hooks': 'error',
          'react-hooks/exhaustive-deps': 'error',
          ...esmImportRules,
        },

        overrides: [
          {
            files: ['*.spec.js', '*.spec.jsx'],

            env: {
              es2020: true,
              browser: true,
              jest: true,
            },
          },
        ],
      },

      tsOptions && {
        files: ['*.ts', '*.tsx'],

        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaFeatures: { jsx: true },
          tsconfigRootDir: tsOptions.rootDir,
          project: tsOptions.project,
        },

        plugins: [
          '@typescript-eslint',
          'react',
          'react-hooks',
          'jsx-a11y',
          'import',
          'prettier',
        ],
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/eslint-recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:react/recommended',
          'plugin:jsx-a11y/recommended',
          'prettier',
          'prettier/@typescript-eslint',
          'prettier/react',
        ],

        settings: {
          'react': {
            version: 'detect',
          },
          'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
          'import/external-module-folders': [
            'node_modules',
            'node_modules/@types',
          ],
          'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
          },
          'import/resolver': {
            node: {
              paths: additionalPaths,
              extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
            },
          },
        },

        env: {
          es2020: true,
          browser: true,
        },

        rules: {
          'prettier/prettier': 'error',
          'react-hooks/rules-of-hooks': 'error',
          'react-hooks/exhaustive-deps': 'error',
          ...tsImportRules,
        },

        overrides: [
          {
            files: ['*.spec.ts', '*.spec.tsx'],

            env: {
              es2020: true,
              browser: true,
              jest: true,
            },
          },
        ],
      },
    ].filter(Boolean),
  };
};
