module.exports = (api) => {
  const webpack = api.env((envName) => envName.split('-').includes('webpack'));
  const client = api.env((envName) => envName.split('-').includes('client'));
  const development = api.env((envName) =>
    envName.split('-').includes('development'),
  );
  const emotion = webpack;
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { node: true, browsers: 'last 2 versions' },
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
          importSource: emotion ? '@emotion/react' : undefined,
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      emotion && '@emotion/babel-plugin',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      webpack && '@babel/plugin-syntax-dynamic-import',
      webpack &&
        client &&
        development && [('react-refresh/babel', { skipEnvCheck: true })],
    ].filter(Boolean),
  };
};
