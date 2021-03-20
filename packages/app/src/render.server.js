// Copied from https://github.com/respond-framework/rudy/blob/22d0a9d8d28e1e74aaf04bb48b5e0f65a609cf81/packages/boilerplate/src/render.server.js

import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { ChunkExtractor } from '@loadable/server';
import { configureStore } from './configureStore.server';
import { App } from './components/App/component';
import { selectTitle } from './selectors/title';

// eslint-disable-next-line import/no-default-export
export default ({ clientStats }) => async (req, res, next) => {
  try {
    const html = await renderToString(clientStats, req, res);
    return res.send(html);
  } catch (error) {
    return next(error);
  }
};

const renderToString = async (clientStats, req, res) => {
  const store = await configureStore(req, res);
  if (!store) return ''; // no store means redirect was already served

  const extractor = new ChunkExtractor({ stats: clientStats });
  const app = extractor.collectChunks(createApp(App, store));

  const appString = ReactDOM.renderToString(app);
  const state = store.getState();
  const stateJson = JSON.stringify(state);

  return `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${selectTitle(state)}</title>
          ${extractor.getStyleTags()}
        </head>
        <body style="margin: 0;">
          <div id="root">${appString}</div>
          <script>window.REDUX_STATE = ${stateJson}</script>
          ${extractor.getScriptTags()}
        </body>
      </html>`;
};

const createApp = (Root, store) => (
  <Provider store={store}>
    <Root />
  </Provider>
);
