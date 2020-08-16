'use strict';

const eslintNodeConfig = require('./eslint/node');

module.exports = {
  root: true,
  ...eslintNodeConfig(),
};
