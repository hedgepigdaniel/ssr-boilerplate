import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { ChunkExtractor } from '@loadable/server';
import { doesRedirect } from '@respond-framework/rudy';
import type { Stats } from 'webpack';
import { Handler, Request, Response } from 'express';
import { ComponentType } from 'react';
import { compose } from 'redux';
import { configureStore } from './configureStore';
import { App } from './components/App/component';
import { selectTitle } from './selectors/title';
import { Store } from './store';

// eslint-disable-next-line import/no-default-export
export default ({ clientStats }: { clientStats: Stats }): Handler => async (
  req,
  res,
  next,
) => {
  try {
    const html = await renderToString(clientStats, req, res);
    return res.send(html);
  } catch (error) {
    return next(error);
  }
};

export const initStore = async (
  req: Request,
  res: Response,
): Promise<Store | false> => {
  const { store, firstRoute } = configureStore(compose, undefined, req.url);
  const result = await store.dispatch(firstRoute());
  if (doesRedirect(result, res)) return false;

  const { status } = store.getState().location;
  res.status(status);

  return store;
};

const renderToString = async (
  clientStats: Stats,
  req: Request,
  res: Response,
) => {
  const store = await initStore(req, res);
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

const createApp = (Root: ComponentType, store: Store) => (
  <Provider store={store}>
    <Root />
  </Provider>
);
