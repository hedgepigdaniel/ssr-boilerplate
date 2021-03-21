import 'source-map-support/register';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import nocache from 'nocache';

import favicon from 'serve-favicon';
import { makeConfig } from './webpack.config.babel';
import { resolveFromCwd } from './helpers';

const { path: outputPath, publicPath } = makeConfig({ isServer: false }).output;

const app = express();

app.use(favicon('./public/favicon.ico'));
app.use(nocache());

// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-dynamic-require
const serverRender = require(resolveFromCwd('./dist/server/main.js'));

// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-dynamic-require
const clientStats = require(resolveFromCwd('./dist/client/stats.json'));

app.use(publicPath, express.static(outputPath));
app.use(serverRender.default({ clientStats, outputPath }));

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening @ http://localhost:3000/');
});
