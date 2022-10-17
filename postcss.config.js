/* eslint-disable global-require, import/no-extraneous-dependencies */

module.exports = {
  plugins: [
    require('postcss-normalize'),
    require('postcss-import'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      features: {
        'custom-properties': false
      },
      stage: 3
    }),
    require('postcss-simple-vars'),
    require('postcss-nested')
  ]
};
