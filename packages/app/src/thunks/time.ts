import { RouteThunk } from '@respond-framework/rudy';
import { Action } from '../actions';
import { selectTimeInterval } from '../selectors/time';
import { State } from '../state';

export const startClock: RouteThunk<State, Action> = ({
  dispatch,
  getState,
}): void => {
  if (selectTimeInterval(getState()) === null) {
    dispatch({
      type: 'TIME_START',
      time: new Date().getTime(),
      interval: setInterval(() => {
        dispatch({
          type: 'TIME_UPDATE',
          time: new Date().getTime(),
        });
      }, 1000),
    });
  }
};

export const stopClock: RouteThunk<State, Action> = ({
  dispatch,
  getState,
}): void => {
  const interval = selectTimeInterval(getState());
  if (interval !== null) {
    clearInterval(interval);
    dispatch({
      type: 'TIME_END',
    });
  }
};

export const updateClock: RouteThunk<State, Action> = ({ dispatch }): void => {
  dispatch({
    type: 'TIME_UPDATE',
    time: new Date().getTime(),
  });
};
