import { createSelector } from 'reselect';
import { selectPage } from './page';
import { DASHBOARD } from '../actions';

export const selectTitle = createSelector(
  [selectPage],
  (page) => {
    switch (page) {
      case DASHBOARD: {
        return `TRADL - Dashboard`;
      }
      default: {
        return `TRADL`;
      }
    }
  },
);
