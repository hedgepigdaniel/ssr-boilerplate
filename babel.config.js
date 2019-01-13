module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { node: true, browsers: 'last 2 versions' },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      'babel-plugin-emotion',
    ],
  };
};
