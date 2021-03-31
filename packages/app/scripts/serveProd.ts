import 'source-map-support/register';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import nocache from 'nocache';

import favicon from 'serve-favicon';
import { makeConfig } from './webpack.config.babel';
import { resolveFromCwd } from './helpers';

const YEAR_IN_MS = 1000 * 60 * 60 * 24 * 365;

const { path: outputPath, publicPath } = makeConfig({ isServer: false }).output;

const app = express();

app.use(favicon('./public/favicon.ico'));

// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-dynamic-require
const serverRender = require(resolveFromCwd('./dist/server/main.js'));

// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-dynamic-require
const clientStats = require(resolveFromCwd('./dist/client/stats.json'));

app.use(
  publicPath,
  express.static(outputPath, { immutable: true, maxAge: YEAR_IN_MS }),
);

// Don't cache rendered pages
app.use(nocache());
app.use(serverRender.default({ clientStats, outputPath }));

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening @ http://localhost:3000/');
});
