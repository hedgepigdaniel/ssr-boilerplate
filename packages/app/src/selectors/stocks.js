import { createSelector } from 'reselect';

export const selectStocks = (state) => state.stocks;

export const makeSelectStock = (symbol) =>
  createSelector([selectStocks], (stocks) => stocks[symbol] || null);
