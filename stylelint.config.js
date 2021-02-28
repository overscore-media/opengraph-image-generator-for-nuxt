/* eslint-disable quote-props */
module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  rules: {
    'at-rule-blacklist': null,
    'at-rule-empty-line-before': null,
    'at-rule-no-unknown': null,
    'color-hex-case': null,
    'declaration-colon-space-before': null,
    'declaration-empty-line-before': null,
    'indentation': 2,
    'media-feature-colon-space-before': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'property-blacklist': null,
    'property-no-vendor-prefix': null,
    'selector-class-pattern': null,
    'selector-list-comma-newline-after': null,
    'selector-max-specificity': null,
    'string-quotes': 'double'
  },
  'ignoreFiles': ['node_modules/', 'static/', '.nuxt']
}
