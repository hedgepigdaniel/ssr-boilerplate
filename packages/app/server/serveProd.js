// Copied from https://github.com/respond-framework/rudy/blob/22d0a9d8d28e1e74aaf04bb48b5e0f65a609cf81/packages/boilerplate/server/serveProd.js

import 'source-map-support/register';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { resolve } from 'path';
import express from 'express';
import nocache from 'nocache';

import favicon from 'serve-favicon';
// eslint-disable-next-line import/no-unresolved
import clientStats from '../buildClient/stats.json';
// eslint-disable-next-line import/no-unresolved,import/extensions
import serverRender from '../buildServer/h';
import makeConfig from './webpack.config.babel';

// ASSUMPTION: the compiled version of this file is one directory under the boilerplate root
// (Otherwise importing '../buildXxxx' wouldn't work)

const res = (...args) => resolve(__dirname, ...args);

const { path: outputPath, publicPath } = makeConfig({ server: false }).output;

const app = express();

app.use(favicon(res('../public', 'favicon.ico')));
app.use(nocache());

// UNIVERSAL HMR + STATS HANDLING GOODNESS:

app.use(publicPath, express.static(outputPath));
app.use(serverRender({ clientStats, outputPath }));

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening @ http://localhost:3000/');
});
