import { createSelector } from 'reselect';
import { Time } from '../reducers/time';
import { State } from '../state';

export const selectTimeState = (state: State): Time => state.time;

export const selectTimeInterval = createSelector(
  [selectTimeState],
  (time) => time.interval,
);

export const selectCurrentTime = createSelector(
  [selectTimeState],
  (time) => time.time,
);
