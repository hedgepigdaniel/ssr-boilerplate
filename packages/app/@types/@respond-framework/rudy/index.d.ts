import { Response } from 'express';
import {
  Middleware as ReduxMiddleware,
  Reducer,
  Action as ReduxAction,
} from 'redux';
import { ThunkDispatch } from 'redux-thunk';

type LocationAction = {
  type: string;
};

export type RouteThunk<State, Action extends ReduxAction> = (api: {
  dispatch: ThunkDispatch<State, undefined, Action>;
  getState: () => State;
}) => Promise<void | boolean | void> | boolean | void;

export type RouteConfig<State, Action extends ReduxAction> = {
  path?: string;
  beforeEnter?: RouteThunk<State, Action>;
  onEnter?: RouteThunk<State, Action>;
  onLeave?: RouteThunk<State, Action>;
};

export type RoutesMap<State, Action extends ReduxAction> = Partial<
  { [key in Action['type']]: RouteConfig<State, Action> }
>;

export const doesRedirect: <A extends LocationAction>(
  action: A,
  redirectFunc: Response,
) => boolean;

export type Middleware = () => void;

export type LocationState = {
  status: number;
};

export const serverRedirect: Middleware;
export const anonymousThunk: Middleware;
export const pathlessRoute: (name: string) => Middleware;
export const transformAction: Middleware;
export const call: (
  name: string,
  options?: {
    prev?: boolean;
    cache?: boolean;
    runOnServer?: boolean;
    runOnHydrate?: boolean;
  },
) => Middleware;
export const enter: Middleware;
export const changePageTitle: <State>(options?: {
  title: (state: State) => string;
}) => Middleware;

export type CreateRouterOptions<State> = {
  initialEntries?: string;
  title?: (state: State) => string;
};

export const createRouter: <State, Action extends ReduxAction>(
  routes: RoutesMap<State, Action>,
  options: CreateRouterOptions<State>,
  middlewares: Middleware[],
) => {
  middleware: ReduxMiddleware<(action: Action) => Promise<void>, State>;
  reducer: Reducer<LocationState, Action>;
  firstRoute: () => Action;
};
