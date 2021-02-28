module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  plugins: [
    'babel',
    'json-format',
    'no-secrets',
    'vue'
  ],
  extends: [
    '@nuxtjs',
    'alloy',
    'alloy/vue',
    'plugin:array-func/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue-scoped-css/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'padded-blocks': 0,
    'default-case-last': 0,
    'new-cap': 0,
    'no-useless-backreference': 0,
    'no-unused-vars': 1,
    'quotes': ['error', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [2, 'never'],
    'quote-props': 0,
    'vue/component-tags-order': ['error', {
      'order': ['template', 'script', 'style']
    }],
    'vue/html-self-closing': 'off',
    'vue/html-closing-bracket-newline': ['warn', {
      'multiline': 'never'
    }],
    'vue/max-attributes-per-line': ['warn', {
      'singleline': {
        'max': 5
      },
      'multiline': {
        'max': 3
      }
    }],
    'vue/no-v-html': 0,
    'vue/no-duplicate-attributes': 0,
    'vue/require-default-prop': 0,
    'vue-scoped-css/require-scoped': 0,
    'vue/singleline-html-element-content-newline': ['warn', {
      'ignores': ['pre', 'textarea', 'nuxt-link']
    }],
    'vue-scoped-css/no-unused-selector': 0
  },
  ignorePatterns: []
}
