module.exports = {
  extends: [
    'eslint-config-airbnb-base',
  ],
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
