import { createSelector } from 'reselect';

export const selectStockPrices = (state) => state.stockPrice;

export const makeSelectStockPrice = (symbol) =>
  createSelector(
    [selectStockPrices],
    (prices) => prices[symbol] || null,
  );
