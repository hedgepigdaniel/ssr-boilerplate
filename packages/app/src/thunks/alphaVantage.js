import axios from 'axios';
import { selectAlphaVantageApiKey } from '../selectors/alphaVantage';
import {
  FETCH_STOCK_PRICE_FAILURE,
  FETCH_STOCK_PRICE_SUCCESS,
} from '../actions';

const ALPHA_VANTAGE_API_ENDPOINT = 'https://www.alphavantage.co/query';

export const searchStocks = (search) => async (dispatch, getState) => {
  if (!search) {
    return Promise.resolve();
  }
  const {
    data: { bestMatches: matches },
  } = await axios.get(ALPHA_VANTAGE_API_ENDPOINT, {
    params: {
      function: 'SYMBOL_SEARCH',
      keywords: search,
      apikey: selectAlphaVantageApiKey(getState()),
    },
  });
  return matches.map((match) => ({
    symbol: match['1. symbol'],
    name: match['2. name'],
    type: match['3. type'],
    region: match['4. region'],
    marketOpen: match['5. marketOpen'],
    marketClose: match['6. marketClose'],
    timezone: match['7. timezone'],
    currency: match['8. currency'],
    // matchScore: match["9. matchScore"],
  }));
};

export const retrievePrice = (symbol) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(ALPHA_VANTAGE_API_ENDPOINT, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol,
        interval: '1min',
        apikey: selectAlphaVantageApiKey(getState()),
      },
    });
    dispatch({
      type: FETCH_STOCK_PRICE_SUCCESS,
      symbol,
      data,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    dispatch({
      type: FETCH_STOCK_PRICE_FAILURE,
      error,
    });
  }
};
