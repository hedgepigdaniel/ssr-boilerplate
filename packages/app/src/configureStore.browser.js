/* eslint-env browser */

// Copied from https://github.com/respond-framework/rudy/blob/22d0a9d8d28e1e74aaf04bb48b5e0f65a609cf81/packages/boilerplate/src/configureStore.browser.js

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import {
  push,
  replace,
  jump,
  back,
  next,
  reset,
  set,
  setParams,
  setQuery,
  setState,
  setHash,
  setBasename,
  createRouter,
} from "@respond-framework/rudy";

import routes from "./routes";
import * as reducers from "./reducers";

export default (preloadedState, initialEntries) => {
  const options = { initialEntries, basenames: ["/foo", "/bar"] };
  const { reducer, middleware, firstRoute, history, ctx } = createRouter(
    routes,
    options,
  );

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const middlewares = applyMiddleware(middleware);
  const enhancers = composeEnhancers(middlewares);
  const store = createStore(rootReducer, preloadedState, enhancers);

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const newRootReducer = combineReducers({
        ...reducers,
        location: reducer,
      });
      store.replaceReducer(newRootReducer);
    });
  }

  if (typeof window !== "undefined") {
    window.routes = routes;
    window.store = store;
    window.hist = history;
    window.actions = actionCreators;
    window.ctx = ctx;
  }

  return { store, firstRoute };
};

const composeEnhancers = (...args) =>
  typeof window !== "undefined"
    ? composeWithDevTools({ actionCreators })(...args)
    : compose(...args);

const actionCreators = {
  push,
  replace,
  jump,
  back,
  next,
  reset,
  set,
  setParams,
  setQuery,
  setState,
  setHash,
  setBasename,
};
