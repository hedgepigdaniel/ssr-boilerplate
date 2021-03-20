import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
// eslint-disable-next-line import/no-unresolved
import clientConfig from '../webpack/client.dev';
// eslint-disable-next-line import/no-unresolved
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
  // eslint-disable-next-line import/no-unresolved,global-require
  const clientStats = require('../buildClient/stats.json');
  // eslint-disable-next-line import/no-unresolved,global-require
  const serverRender = require('../buildServer/main.js').default;

  app.use(publicPath, express.static(outputPath));
  app.use(serverRender({ clientStats, outputPath }));
}

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening @ http://localhost:3000/');
});
