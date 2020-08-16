'use strict';

const cjsImportRules = {
  'import/no-unresolved': ['error', { commonjs: true }],
};

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
 * JavaScript options
 *
 * @typedef {Object} JavaScriptOptions
 * @property {import('eslint').Linter.ParserOptions['sourceType']} sourceType
 */

/**
 * TypeScript options
 *
 * @typedef {Object} TypeScriptOptions
 * @property {import('@typescript-eslint/parser').ParserOptions['tsconfigRootDir']} rootDir
 * @property {import('@typescript-eslint/parser').ParserOptions['project']} project
 */

/**
 * Options
 *
 * @typedef {Object} Options
 * @property {string[]} additionalPaths
 * @property {JavaScriptOptions} jsOptions
 * @property {TypeScriptOptions} tsOptions
 */

/**
 * Get ESLint config
 *
 * @param {Options} options
 * @returns {import('eslint').Linter.Config}
 */
module.exports = (options) => {
  const additionalPaths = options['additionalPaths'] || [];
  const jsSourceType = options['jsOptions']['sourceType'] || 'module';
  const tsRootDir = options['tsOptions']['rootDir'];
  const tsProject = options['tsOptions']['project'];

  return {
    overrides: [
      {
        files: ['*.js'],

        parserOptions: {
          ecmaVersion: 2020,
          sourceType: jsSourceType,
          ecmaFeatures: { impliedStrict: true },
        },

        plugins: ['import', 'prettier'],
        extends: ['eslint:recommended', 'prettier'],

        settings: {
          'import/resolver': {
            node: {
              paths: additionalPaths,
            },
          },
        },

        env: {
          es2020: true,
          node: true,
        },

        rules: {
          'prettier/prettier': 'error',
          ...(jsSourceType === 'script' ? cjsImportRules : esmImportRules),
        },

        overrides: [
          {
            files: ['*.spec.js'],

            env: {
              es2020: true,
              node: true,
              jest: true,
            },
          },
        ],
      },

      {
        files: ['*.ts'],

        parser: '@typescript-eslint/parser',
        parserOptions: {
          tsconfigRootDir: tsRootDir,
          project: tsProject,
        },

        plugins: ['@typescript-eslint', 'prettier'],
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/eslint-recommended',
          'plugin:@typescript-eslint/recommended',
          'prettier',
          'prettier/@typescript-eslint',
        ],

        settings: {
          'import/extensions': ['.js', '.ts', '.d.ts'],
          'import/external-module-folders': [
            'node_modules',
            'node_modules/@types',
          ],
          'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.d.ts'],
          },
          'import/resolver': {
            node: {
              paths: additionalPaths,
              extensions: ['.js', '.ts', '.d.ts'],
            },
          },
        },

        env: {
          es2020: true,
          node: true,
        },

        rules: {
          'prettier/prettier': 'error',
          ...tsImportRules,
        },

        overrides: [
          {
            files: ['*.spec.ts'],

            env: {
              es2020: true,
              node: true,
              jest: true,
            },
          },
        ],
      },
    ],
  };
};
