import { createSelector } from 'reselect';

const selectStockHoldings = () => ({
  MSFT: 5,
  GOOG: 2,
});

export const makeSelectHolding = (symbol) =>
  createSelector(
    [selectStockHoldings],
    (stockHoldings) => stockHoldings[symbol],
  );
