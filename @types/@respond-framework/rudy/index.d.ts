import { Response } from 'express';
import {
  Middleware as ReduxMiddleware,
  Reducer,
  Action as ReduxAction,
} from 'redux';

type LocationAction = {
  type: string;
};

export type RouteThunk = () => void;

export type RouteConfig = {
  path?: string;
  onEnter?: RouteThunk;
  onLeave?: RouteThunk;
};

export type RoutesMap<Action extends ReduxAction> = Partial<
  { [key in Action['type']]: RouteConfig }
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
  options?: { prev?: boolean; cache?: boolean },
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
  routes,
  options: CreateRouterOptions<State>,
  middlewares: Middleware[],
) => {
  middleware: ReduxMiddleware<
    (action: Action) => Promise<void>,
    State & { location: LocationState },
    (action: Action) => Promise<void>
  >;
  reducer: Reducer<LocationState, Action>;
  firstRoute: () => Action;
};
