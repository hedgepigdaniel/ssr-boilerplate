import { RoutesMap } from '@respond-framework/rudy';
import { Action } from './actions';
import { startClock, stopClock } from './thunks/home';

export const routes: RoutesMap<Action> = {
  HOME: {
    path: '/',
    onEnter: startClock,
    onLeave: stopClock,
  },
};
