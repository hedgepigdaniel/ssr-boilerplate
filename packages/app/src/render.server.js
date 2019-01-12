// Cpied from https://github.com/respond-framework/rudy/blob/22d0a9d8d28e1e74aaf04bb48b5e0f65a609cf81/packages/boilerplate/src/render.server.js

import React from "react";
import ReactDOM from "react-dom/server";
import { Provider } from "react-redux";
import { flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import { configureStore } from "./configureStore";
import { HotApp } from "./components/App/hot";

// eslint-disable-next-line import/no-default-export
export default ({ clientStats }) => async (req, res, next) => {
  console.log("REQUESTED PATH:", req.url); // eslint-disable-line no-console
  try {
    const html = await renderToString(clientStats, req, res);
    return res.send(html);
  } catch (error) {
    return next(error);
  }
};

const renderToString = async (clientStats, req, res) => {
  const store = await configureStore(req, res);
  if (!store) return ""; // no store means redirect was already served

  const app = createApp(HotApp, store);
  const appString = ReactDOM.renderToString(app);
  const state = store.getState();
  const stateJson = JSON.stringify(state);
  const chunkNames = flushChunkNames();
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

  console.log("CHUNK NAMES RENDERED", chunkNames); // eslint-disable-line no-console

  return `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${state.title}</title>
          ${styles}
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <div id="root">${appString}</div>
          ${cssHash}
          <script type='text/javascript' src='/static/vendor.js'></script>
          ${js}
        </body>
      </html>`;
};

const createApp = (Root, store) => (
  <Provider store={store}>
    <Root />
  </Provider>
);
