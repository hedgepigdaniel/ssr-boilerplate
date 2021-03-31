import {
  Configuration,
  HotModuleReplacementPlugin,
  WebpackPluginInstance,
} from 'webpack';
import { StatsWriterPlugin } from 'webpack-stats-plugin';
import EsLintPlugin from 'eslint-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import { isTruthy, resolveFromCwd } from './helpers';

export const makeConfig = ({
  isServer,
}: {
  isServer: boolean;
}): Configuration & { output: { publicPath: string; path: string } } => {
  const isClient = !isServer;
  const isDev = process.env.NODE_ENV === 'development';
  const isProd = !isDev;
  return {
    name: isServer ? 'server' : 'client',
    target: isServer ? 'node' : 'web',
    mode: isDev ? 'development' : 'production',
    devtool: isProd
      ? 'source-map'
      : isClient
      ? 'eval-source-map'
      : 'inline-source-map',
    entry: [
      isClient &&
        isDev &&
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
      isClient && 'core-js/stable',
      isClient && 'regenerator-runtime/runtime',
      isServer ? './src/render-server.tsx' : './src/render-browser.tsx',
    ].filter(isTruthy),
    output: {
      filename: `[name]${isClient && isProd ? '.[contenthash]' : ''}.js`,
      chunkFilename: `[name]${isClient && isProd ? '.[contenthash]' : ''}.js`,
      path: resolveFromCwd(isServer ? './dist/server' : './dist/client'),
      publicPath: '/static/',
      libraryTarget: isServer ? 'commonjs2' : undefined,
    },
    module: {
      strictExportPresence: true, // If you import something that isn't exported
      rules: [
        {
          test: /\.(j|t)sx?$/,
          // Skip node_modules, with the exception of packages in the monorepo
          exclude: /[\\/]node_modules[\\/](?!@hedgepigdaniel)/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              envName: `webpack-${isServer ? 'client' : 'server'}-${
                isDev ? 'dev' : 'prod'
              }`,
            },
          },
        },
        {
          test: /node_modules\/@hedgepigdaniel\//,
          enforce: 'pre',
          use: 'source-map-loader',
        },
      ],
    },
    resolve: {
      symlinks: false,
      extensions: ['.wasm', '.mjs', '.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    optimization: {
      runtimeChunk: isClient && {
        name: 'bootstrap',
      },
      splitChunks: (isClient || isDev) && {
        maxSize: 50000,
        chunks: 'initial',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
          },
        },
      },
    },
    plugins: [
      new EsLintPlugin({
        failOnWarning: isProd, // Production builds must have no warnings
        failOnError: isProd, // eslint "errors" often don't block testing
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        cache: true,
        cacheLocation: '.cache/.eslintcache',
      }),
      isClient &&
        (new LoadablePlugin({ outputAsset: false }) as WebpackPluginInstance),
      isClient && isDev && new HotModuleReplacementPlugin(),
      isClient && isDev && new ReactRefreshWebpackPlugin(),
      isClient &&
        isProd &&
        ((new StatsWriterPlugin({
          fields: ['namedChunkGroups', 'publicPath', 'outputPath'],
        }) as unknown) as WebpackPluginInstance),
    ].filter(isTruthy),
  };
};

// eslint-disable-next-line import/no-default-export
export default (env: { [key: string]: string }): Configuration => {
  const isServer = Boolean(JSON.parse(env.server));
  return makeConfig({ isServer });
};
