module.exports = function getConfig(api) {
  const isDevelopmentEnv = api.env('development');
  const isProductionEnv = api.env('production');

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        modules: false,
        exclude: ['transform-typeof-symbol'],
        corejs: {
          version: '3.11.2'
        }
      }
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: isDevelopmentEnv,
        useBuiltIns: true
      }
    ]
  ];

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-transform-runtime',
      { useESModules: true, regenerator: false }
    ]
  ];

  if (isDevelopmentEnv) {
    plugins.push('react-refresh/babel');
  }

  if (isProductionEnv) {
    plugins.push([
      'babel-plugin-transform-react-remove-prop-types',
      { removeImport: true }
    ]);
  }

  return {
    presets,
    plugins
  };
};
