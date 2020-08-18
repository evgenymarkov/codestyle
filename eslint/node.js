'use strict';

const jsExtensions = ['.js', '.cjs', '.mjs'];
const tsExtensions = ['.ts', '.d.ts'];

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
 * @typedef {Object} JSOptions
 * @property {import('eslint').Linter.ParserOptions['sourceType']} sourceType
 */

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
 * @property {string[]=} additionalPaths
 * @property {JSOptions=} jsOptions
 * @property {TSOptions=} tsOptions
 */

/**
 * Get ESLint config
 *
 * @param {Options=} options
 * @returns {import('eslint').Linter.Config}
 */
module.exports = (options = {}) => {
  const additionalPaths = options.additionalPaths || [];
  const jsOptions = options.jsOptions || { sourceType: 'script' };
  const tsOptions = options.tsOptions;

  return {
    overrides: [
      {
        files: ['*.js', '*.cjs', '*.mjs'],

        parserOptions: {
          ecmaVersion: 2020,
          sourceType: jsOptions.sourceType,
          ecmaFeatures: { impliedStrict: true },
        },

        plugins: ['import', 'prettier'],
        extends: ['eslint:recommended', 'prettier'],

        settings: {
          'import/resolver': {
            node: {
              paths: additionalPaths,
              extensions: tsOptions
                ? [...jsExtensions, ...tsExtensions]
                : jsExtensions,
            },
          },
        },

        env: {
          es2020: true,
          node: true,
        },

        rules: {
          'prettier/prettier': 'error',
          ...(jsOptions.sourceType === 'script'
            ? cjsImportRules
            : esmImportRules),
        },

        overrides: [
          {
            files: [
              '*.test.js',
              '*.test.cjs',
              '*.test.mjs',
              '*.spec.js',
              '*.spec.cjs',
              '*.spec.mjs',
              '*.e2e-test.js',
              '*.e2e-test.cjs',
              '*.e2e-test.mjs',
              '*.e2e-spec.js',
              '*.e2e-spec.cjs',
              '*.e2e-spec.mjs',
            ],

            env: {
              es2020: true,
              node: true,
              jest: true,
            },
          },
        ],
      },

      tsOptions && {
        files: ['*.ts'],

        parser: '@typescript-eslint/parser',
        parserOptions: {
          tsconfigRootDir: tsOptions.rootDir,
          project: tsOptions.project,
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
          'import/extensions': [...jsExtensions, ...tsExtensions],
          'import/external-module-folders': [
            'node_modules',
            'node_modules/@types',
          ],
          'import/parsers': {
            '@typescript-eslint/parser': tsExtensions,
          },
          'import/resolver': {
            node: {
              paths: additionalPaths,
              extensions: [...jsExtensions, ...tsExtensions],
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
            files: ['*.test.ts', '*.spec.ts', '*.e2e-test.ts', '*.e2e-spec.ts'],

            env: {
              es2020: true,
              node: true,
              jest: true,
            },
          },
        ],
      },
    ].filter(Boolean),
  };
};
