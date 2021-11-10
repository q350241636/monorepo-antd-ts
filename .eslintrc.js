module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'jest'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    // 'plugin:react/recommended',
    // 'airbnb',
    // 'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
    serviceworker: true,
  },
  ignorePatterns: ['build', '.*.js', '*.config.js', 'node_modules'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-use-before-define': 'warn',
    'import/no-extraneous-dependencies': ['error'],
    // 'import/no-self-import': 'error',
    // 'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
    'import/prefer-default-export': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/prop-types': 'off',
    ' import/no-cycle': 'off',
    // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'tsx'] }],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    'max-len': 'off',
    semi: ['error', 'never'],
    'no-console': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    declaration: 'off',
    'object-curly-newline': 'off',
    'arrow-parens': ['off'],
    // 'no-unused-vars': [
    //   'warn',
    //   {
    //     args: 'after-used',
    //   },
    // ],
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': 'off',
    // 'jsx-a11y/click-events-have-key-events': 'off',
    'no-unused-expressions': ['warn', { allowShortCircuit: true }],

    // 'object-curly-newline': [
    //   'error',
    //   {
    //     ObjectExpression: 'always',
    //     ObjectPattern: { multiline: true },
    //     ImportDeclaration: 'never',
    //     ExportDeclaration: { multiline: true, minProperties: 3 },
    //   },
    // ],
    "no-non-null-assertion": 'off'
  },
}
