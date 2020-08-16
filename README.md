# @evgenymarkov/codestyle

Utilities for maintaining code style

## Installation

```shell script
npm install --save-dev @evgenymarkov/codestyle typescript
```

## Configuration

### EditorConfig

`.editorconfig`:

```
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
max_line_length = 80
trim_trailing_whitespace = true
```

### Prettier

`.prettierrc.js`:

```js
'use strict';

const prettierConfig = require('@evgenymarkov/codestyle/prettier');

module.exports = {
  ...prettierConfig,
};
```

`.prettierignore`:

```
# NPM
node_modules/
package.json
package-lock.json
```

### Stylelint

`.stylelintrc.js`:

```js
'use strict';

const stylelintConfig = require('@evgenymarkov/codestyle/stylelint');

module.exports = {
  ...stylelintConfig,
};
```

`.stylelintignore`:

```
# NPM
node_modules/
```

### ESLint

#### For server side

`.eslintrc.js`:

```js
'use strict';

const eslintNodeConfig = require('@evgenymarkov/codestyle/eslint/node');

module.exports = {
  root: true,
  ...eslintNodeConfig({
    additionalPaths: ['.'], // Like NODE_PATH, this is optional
    jsOptions: {
      sourceType: 'script', // Choose CommonJS or ECMAScript modules
    },
    tsOptions: {
      rootDir: __dirname,
      project: ['./tsconfig.json'],
    },
  }),
};
```

`.eslintignore`:

```
# NPM
node_modules/
```

#### For client side

`.eslintrc.js`:

```js
'use strict';

const eslintBrowserConfig = require('@evgenymarkov/codestyle/eslint/browser');

module.exports = {
  root: true,
  ...eslintBrowserConfig({
    additionalPaths: ['.'], // Like resolve.modules in Webpack config
    tsOptions: {
      rootDir: __dirname,
      project: ['./tsconfig.json'],
    },
  }),
};
```

`.eslintignore`:

```
# NPM
node_modules/
```
