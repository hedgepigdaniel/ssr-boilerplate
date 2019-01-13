import { createSelector } from 'reselect';
import { LOG_IN, TRADE_STOCK } from '../actions';

export const selectLocation = (state) => state.location;

export const selectPostLoginRedirectUrl = createSelector(
  [selectLocation],
  (location) => {
    if (location.type === LOG_IN) {
      return location.query.redirectTo || null;
    }
    return null;
  },
);

export const selectCurrentSymbol = createSelector(
  [selectLocation],
  (location) => {
    if (location.type === TRADE_STOCK) {
      return location.params.symbol || null;
    }
    return null;
  },
);

export const selectCurrentTradeAction = createSelector(
  [selectLocation],
  (location) => {
    if (location.type === TRADE_STOCK) {
      return location.params.action || null;
    }
    return null;
  },
);
