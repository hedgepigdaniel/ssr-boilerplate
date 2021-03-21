// Copied from https://github.com/respond-framework/rudy/blob/22d0a9d8d28e1e74aaf04bb48b5e0f65a609cf81/packages/boilerplate/server/serveProd.js

import 'source-map-support/register';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import nocache from 'nocache';

import favicon from 'serve-favicon';
import makeConfig from './webpack.config.babel';
import { resolveFromCwd } from './helpers';

const { path: outputPath, publicPath } = makeConfig({ server: false }).output;

const app = express();

app.use(favicon('./public/favicon.ico'));
app.use(nocache());

const serverRender = require(resolveFromCwd('./dist/server/main.js'));
const clientStats = require(resolveFromCwd('./dist/client/stats.json'));

app.use(publicPath, express.static(outputPath));
app.use(serverRender.default({ clientStats, outputPath }));

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening @ http://localhost:3000/');
});
