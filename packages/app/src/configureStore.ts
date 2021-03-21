/* eslint-env browser */

import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  ReducersMapObject,
} from 'redux';
import ReduxThunk from 'redux-thunk';
import {
  createRouter,
  serverRedirect,
  anonymousThunk,
  pathlessRoute,
  transformAction,
  call,
  enter,
  changePageTitle,
  Middleware,
  CreateRouterOptions,
} from '@respond-framework/rudy';

import { routes } from './routes';
import { reducers } from './reducers';
import { selectTitle } from './selectors/title';
import { State } from './state';
import { Store } from './store';
import { Action } from './actions';

export const configureStore = (
  composeEnhancers: typeof compose,
  preloadedState?: State,
  initialEntries?: string,
): {
  firstRoute: () => Action;
  store: Store;
} => {
  const options: CreateRouterOptions<State> = {
    initialEntries,
    title: selectTitle,
  };
  const rudyMiddlewares: Middleware[] = [
    serverRedirect, // short-circuiting middleware
    anonymousThunk,
    pathlessRoute('thunk'),
    transformAction, // pipeline starts here
    call('beforeLeave', { prev: true }),
    call('beforeEnter'),
    enter,
    changePageTitle({
      title: selectTitle,
    }),
    call('onLeave', { prev: true }),
    call('onEnter'),
    call('thunk', { cache: true }),
    call('onComplete'),
  ];
  const {
    reducer: rudyReducer,
    middleware: rudyReduxMiddleware,
    firstRoute,
  } = createRouter<State, Action>(routes, options, rudyMiddlewares);

  const allReducers: ReducersMapObject<State, Action> = {
    ...reducers,
    location: rudyReducer,
  };
  const rootReducer = combineReducers(allReducers);
  const middlewares = applyMiddleware(ReduxThunk, rudyReduxMiddleware);
  const enhancer = composeEnhancers(middlewares);
  const store = enhancer(createStore)(rootReducer, preloadedState);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducers: ReducersMapObject<State, Action> = {
        ...reducers,
        location: rudyReducer,
      };
      const newRootReducer = combineReducers(nextReducers);
      store.replaceReducer(newRootReducer);
    });
  }

  return { store, firstRoute };
};
