/* eslint-env browser */

// Copied from https://github.com/respond-framework/rudy/blob/22d0a9d8d28e1e74aaf04bb48b5e0f65a609cf81/packages/boilerplate/src/configureStore.browser.js

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
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

import { routes } from "./routes";
import { reducers } from "./reducers";

export const configureStore = (preloadedState, initialEntries) => {
  const options = { initialEntries };
  const { reducer, middleware, firstRoute } = createRouter(routes, options);

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const middlewares = applyMiddleware(ReduxThunk, middleware);
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
