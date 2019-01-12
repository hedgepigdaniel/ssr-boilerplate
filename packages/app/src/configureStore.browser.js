/* eslint-env browser */

// Copied from https://github.com/respond-framework/rudy/blob/22d0a9d8d28e1e74aaf04bb48b5e0f65a609cf81/packages/boilerplate/src/configureStore.browser.js

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import Cookies from "universal-cookie";
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
  serverRedirect,
  anonymousThunk,
  pathlessRoute,
  transformAction,
  call,
  enter,
  changePageTitle,
} from "@respond-framework/rudy";

import { routes } from "./routes";
import { reducers } from "./reducers";
import { selectTitle } from "./selectors/title";

export const configureStore = (preloadedState, initialEntries, cookie) => {
  const options = {
    initialEntries,
    extra: {
      cookies: new Cookies(cookie),
    },
    title: selectTitle,
  };
  const rudyMiddlewares = [
    serverRedirect, // short-circuiting middleware
    anonymousThunk,
    pathlessRoute("thunk"),
    transformAction, // pipeline starts here
    call("beforeLeave", { prev: true }),
    call("beforeEnter"),
    enter,
    changePageTitle({
      title: selectTitle,
    }),
    call("onLeave", { prev: true }),
    call("onEnter"),
    call("thunk", { cache: true }),
    call("onComplete"),
  ];
  const {
    reducer: rudyReducer,
    middleware: rudyReduxMiddleware,
    firstRoute,
  } = createRouter(routes, options, rudyMiddlewares);

  const rootReducer = combineReducers({ ...reducers, location: rudyReducer });
  const middlewares = applyMiddleware(ReduxThunk, rudyReduxMiddleware);
  const enhancers = composeEnhancers(middlewares);
  const store = createStore(rootReducer, preloadedState, enhancers);

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const newRootReducer = combineReducers({
        ...reducers,
        location: rudyReducer,
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
