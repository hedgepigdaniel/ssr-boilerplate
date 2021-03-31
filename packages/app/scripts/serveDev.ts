import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import nocache from 'nocache';
import favicon from 'serve-favicon';
import webpack, { Compiler } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import { makeConfig } from './webpack.config.babel';

const clientConfig = makeConfig({ isServer: false });
const serverConfig = makeConfig({ isServer: true });

const { publicPath, path: outputPath } = clientConfig.output;

const app = express();

app.use(favicon('./public/favicon.ico'));
app.use(nocache());

const multiCompiler = webpack([clientConfig, serverConfig]);
const clientCompiler = multiCompiler.compilers[0];

app.use(
  webpackDevMiddleware((multiCompiler as unknown) as Compiler, {
    publicPath,
    serverSideRender: true,
    stats: 'minimal',
  }),
);
app.use(webpackHotMiddleware(clientCompiler));

// keeps serverRender updated with arg: { clientStats, outputPath }
app.use(
  webpackHotServerMiddleware(multiCompiler, {
    serverRendererOptions: { outputPath },
  }),
);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening @ http://localhost:3000/');
});
