const {defineConfig} = require('eslint/config')
const eslintConfigPrettier = require('eslint-config-prettier/flat')

module.exports = defineConfig([
  {
    rules: {
      semi: 'error',
      'prefer-const': 'error',
    },
    extends: ['prettier'],
  },
  eslintConfigPrettier,
])
