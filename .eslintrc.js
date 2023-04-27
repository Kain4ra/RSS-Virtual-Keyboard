module.exports = {
  extends: [
    'eslint-config-airbnb-base',
  ],
  env: {
    browser: true,
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'import/extensions': [
          'error',
          'always',
          {
            ignorePackages: true,
          },
        ],
      },
    },
  ],
};
