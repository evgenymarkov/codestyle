'use strict';

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
  const jsSourceType = options['jsOptions']['sourceType'];
  const tsRootDir = options['tsOptions']['rootDir'];
  const tsProject = options['tsOptions']['project'];

  return {
    overrides: [
      {
        files: ['*.js'],

        parserOptions: {
          ecmaVersion: 2020,
          sourceType: jsSourceType || 'module',
          ecmaFeatures: { impliedStrict: true },
        },

        plugins: ['prettier'],
        extends: ['eslint:recommended', 'prettier'],

        env: {
          es2020: true,
          node: true,
        },

        rules: {
          'prettier/prettier': 'error',
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

        env: {
          es2020: true,
          node: true,
        },

        rules: {
          'prettier/prettier': 'error',
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
