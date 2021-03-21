import { RoutesMap } from '@respond-framework/rudy';
import { Action } from './actions';
import { State } from './state';
import { startClock, stopClock, updateClock } from './thunks/time';

export const routes: RoutesMap<State, Action> = {
  HOME: {
    path: '/',
    beforeEnter: updateClock,
    onEnter: startClock,
    onLeave: stopClock,
  },
};
