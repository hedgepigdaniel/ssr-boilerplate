import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import clientConfig from '../webpack/client.dev';
import serverConfig from '../webpack/server.dev';

const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;
const app = express();

if (process.env.NODE_ENV === 'development') {
  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  app.use(
    webpackDevMiddleware(multiCompiler, {
      publicPath,
      stats: { colors: true },
    }),
  );
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(
    // keeps serverRender updated with arg: { clientStats, outputPath }
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: { outputPath },
    }),
  );
} else {
  const clientStats = require('../buildClient/stats.json'); // eslint-disable-line import/no-unresolved
  const serverRender = require('../buildServer/main.js').default; // eslint-disable-line import/no-unresolved

  app.use(publicPath, express.static(outputPath));
  app.use(serverRender({ clientStats, outputPath }));
}

app.listen(3000, () => {
  console.log('Listening @ http://localhost:3000/');
});
