import { FETCH_STOCK_PRICE_SUCCESS } from '../actions';

export const stockPrice = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STOCK_PRICE_SUCCESS: {
      const {
        symbol,
        data: { 'Time Series (1min)': series },
      } = action;
      // The default sort order works for this date format
      const dates = Object.keys(series);
      const latestDate = dates.sort()[dates.length - 1];
      const price = series[latestDate]['4. close'];
      return {
        ...state,
        [symbol]: price,
      };
    }
    default: {
      return state;
    }
  }
};
