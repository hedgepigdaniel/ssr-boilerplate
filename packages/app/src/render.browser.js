/* eslint-env browser */

// Copied from https://github.com/respond-framework/rudy/blob/22d0a9d8d28e1e74aaf04bb48b5e0f65a609cf81/packages/boilerplate/src/render.browser.js

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HotApp } from "./components/App/hot";
import { configureStore } from "./configureStore";

const { store, firstRoute } = configureStore(window.REDUX_STATE);

const root = document.getElementById("root");

const render = () =>
  ReactDOM.hydrate(
    <Provider store={store}>
      <HotApp />
    </Provider>,
    root,
  );

store.dispatch(firstRoute()).then(() => {
  render();
});

if (module.hot) {
  module.hot.accept("./components/App/hot", render);
}
