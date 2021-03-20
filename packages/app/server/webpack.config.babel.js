/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import webpack from 'webpack';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin'; // here so you can see what chunks are built
import StatsPlugin from 'stats-webpack-plugin';
import EsLintPlugin from 'eslint-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const res = (p) => resolve(__dirname, p);

export default (env) => {
  const isServer = JSON.parse(env.server) || undefined;
  const isClient = !isServer || undefined;
  const isDev = process.env.NODE_ENV === 'development' || undefined;
  const isProd = !isDev || undefined;
  return {
    name: isServer ? 'server' : 'client',
    target: isServer ? 'node' : 'web',
    mode: process.env.NODE_ENV,
    devtool: 'eval-source-map',
    entry: {
      [isServer ? 'h' : 'main']: [
        isServer && 'source-map-support/register',
        isClient &&
          isDev &&
          'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
        isClient && 'core-js/stable',
        isClient && 'regenerator-runtime/runtime',
        res(isServer ? '../src/render.server.js' : '../src/render.browser.js'),
      ].filter(Boolean),
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: res(isServer ? '../buildServer' : '../buildClient'),
      publicPath: '/static/',
      libraryTarget: isServer && 'commonjs2',
    },
    module: {
      strictExportPresence: true, // If you import something that isn't exported
      rules: [
        {
          test: /\.jsx?$/,
          // Skip node_modules, with the exception of packages in the monorepo
          exclude: /[\\/]node_modules[\\/](?!@hedgepigdaniel)/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              rootMode: 'upward',
              envName: isClient ? 'webpack-client' : 'webpack-server',
            },
          },
        },
        {
          test: /node_modules\/@hedgepigdaniel\//,
          enforce: 'pre',
          use: 'source-map-loader',
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            isClient && ExtractCssChunks.loader,
            {
              loader: isServer ? 'css-loader/locals' : 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          ].filter(Boolean),
        },
      ],
    },
    resolve: {
      symlinks: false,
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
      }),
      isClient && new ExtractCssChunks(),
      isServer &&
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
      isClient && isDev && new webpack.HotModuleReplacementPlugin(),
      isClient && isDev && new ReactRefreshWebpackPlugin(),
      isClient && isProd && new StatsPlugin('stats.json'),
      isClient && isProd && new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
      new WriteFilePlugin(),
    ].filter(Boolean),
  };
};
