'use strict';

const eslintNodeConfig = require('./eslint/node');

module.exports = {
  root: true,
  ...eslintNodeConfig({
    jsOptions: {
      sourceType: 'script',
    },
    tsOptions: {
      rootDir: __dirname,
      project: ['./tsconfig.json'],
    },
  }),
};
