import { resolve } from 'path';
import webpack, {
  Configuration,
  HotModuleReplacementPlugin,
  WebpackPluginInstance,
} from 'webpack';
import { StatsWriterPlugin } from 'webpack-stats-plugin';
import EsLintPlugin from 'eslint-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import { isTruthy } from './helpers';

const res = (p: string) => resolve(__dirname, p);

// eslint-disable-next-line import/no-default-export
export default (env: { server: string }): Configuration => {
  const isServer = Boolean(JSON.parse(env.server));
  const isClient = !isServer;
  const isDev = process.env.NODE_ENV === 'development';
  const isProd = !isDev;
  return {
    name: isServer ? 'server' : 'client',
    target: isServer ? 'node' : 'web',
    mode: isDev ? 'development' : 'production',
    devtool: 'eval-source-map',
    entry: [
      isServer && 'source-map-support/register',
      isClient &&
        isDev &&
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
      isClient && 'core-js/stable',
      isClient && 'regenerator-runtime/runtime',
      res(isServer ? '../src/render.server.js' : '../src/render.browser.js'),
    ].filter(isTruthy),
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: res(isServer ? '../buildServer' : '../buildClient'),
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
      splitChunks: isClient && {
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
      isServer &&
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
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
