import { createSelector } from 'reselect';
import { selectPage } from './page';

export const selectTitle = createSelector([selectPage], (page) => {
  switch (page) {
    default: {
      return `SSR Boilerplate`;
    }
  }
});
