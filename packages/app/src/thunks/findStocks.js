import { SEARCH_STOCKS_SUCCESS, SEARCH_STOCKS_FAILURE } from '../actions';
import { searchStocks } from './alphaVantage';

export const findStocks = ({ action, dispatch }) => {
  const query = action.query.search;
  return dispatch(searchStocks(query))
    .then((matches) => {
      dispatch({
        type: SEARCH_STOCKS_SUCCESS,
        query,
        matches,
      });
    })
    .catch((error) =>
      dispatch({
        type: SEARCH_STOCKS_FAILURE,
        error,
      }),
    );
};
