/* eslint-env browser */

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { compose } from 'redux';
import { App } from './components/App/component';
import { configureStore } from './configureStore';
import { State } from './state';

const getInitialState = (): State => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return window.REDUX_STATE as State;
};

const { store, firstRoute } = configureStore(
  composeWithDevTools as typeof compose,
  getInitialState(),
);

const render = () => {
  const root = document.getElementById('root');
  ReactDOM.hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    root,
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
store.dispatch(firstRoute()).then(loadableReady(render));
